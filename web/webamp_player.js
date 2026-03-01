/**
 * WebAmp Radio Player – frontend extension for ComfyUI
 */

import { app } from "../../scripts/app.js";
import Lyricer from "./lyricer.js";

// Load CSS
const link = document.createElement("link");
link.rel = "stylesheet";
link.href = new URL("./webamp_player.css", import.meta.url).href;
document.head.appendChild(link);

console.log("[WebampRadio] JS module loading...");

function trackLabel(filename) {
    return filename.replace(/\.[^.]+$/, "");
}

function getPathParam(url) {
    try {
        const u = new URL(url, window.location.href);
        return u.searchParams.get("path") || url;
    } catch {
        return url;
    }
}

function applyFontSize(lyricsDiv, fontSize) {
    const px = `${fontSize}px`;
    const activePx = `${Math.round(fontSize * 1.25)}px`;
    lyricsDiv.style.setProperty("--lyric-font-size", px);
    lyricsDiv.style.setProperty("--lyric-active-font-size", activePx);
}

function buildWebampWidget(node) {
    const container = document.createElement("div");
    container.className = "webamp-node-container";
    container.id = `webamp-node-ui-${node.id}`;

    const lyricsDiv = document.createElement("div");
    lyricsDiv.id = `webamp-lyrics-${node.id}`;
    lyricsDiv.className = "webamp-lyrics-display";
    lyricsDiv.style.minHeight = "120px";
    lyricsDiv.innerHTML = `<div class="webamp-loading-state">
        <div class="rp-spinner">&#8987;</div>
        <b>Preparing Webamp...</b>
    </div>`;
    container.appendChild(lyricsDiv);

    // Zero-size anchor div placed INSIDE the node container.
    // WebAmp renders its floating windows relative to the viewport regardless,
    // but this anchors its DOM element so it doesn't pollute the body.
    const webampHost = document.createElement("div");
    webampHost.id = `webamp-host-${node.id}`;
    webampHost.style.cssText = "position:absolute;top:0;left:0;width:0;height:0;overflow:visible;pointer-events:none;";
    container.appendChild(webampHost);

    let webamp = null;
    let knownPaths = new Set();
    let trackByPath = new Map();
    let polling = null;
    let syncInterval = null;
    let diagInterval = null;
    let isInitializing = false;
    let lastPathKey = null;
    let lastTime = -1;
    let currentArtistName = "Ace-Step AI";

    const lrc = new Lyricer({ "divID": lyricsDiv.id, "showLines": 3 });

    async function loadWebampLibrary() {
        try {
            const m = await import("./webamp.butterchurn.mjs");
            const W = m.default || m.Webamp;
            if (W) return W;
        } catch (e) {
            console.warn("[WebampRadio] Local bundle failed, trying CDN...");
        }
        const m = await import("https://cdn.jsdelivr.net/npm/webamp@2.2.0/built/webamp.butterchurn-bundle.min.mjs");
        return m.default || m.Webamp;
    }

    async function fetchLrc(lrcUrl) {
        if (!lrcUrl) {
            lyricsDiv.innerHTML = "<div class='webamp-no-lyrics'>No lyrics available</div>";
            return;
        }
        try {
            const res = await fetch(lrcUrl);
            if (res.ok) {
                lrc.setLrc(await res.text());
            } else {
                lyricsDiv.innerHTML = "<div class='webamp-no-lyrics'>No lyrics file found</div>";
            }
        } catch (e) {
            lyricsDiv.innerHTML = "<div class='webamp-no-lyrics'>Error loading lyrics</div>";
        }
    }

    function syncState() {
        if (!webamp) return;
        try {
            const state = webamp.store.getState();
            const currentTime = state.media?.timeElapsed;
            if (currentTime !== undefined && Math.abs(currentTime - lastTime) > 0.05) {
                lastTime = currentTime;
                lrc.move(currentTime);
            }
            const currentTrackId = state.playlist?.currentTrack;
            if (currentTrackId === null || currentTrackId === undefined) return;
            const track = state.tracks?.[currentTrackId];
            if (!track || !track.url) return;
            const pathKey = getPathParam(track.url);
            if (pathKey === lastPathKey) return;
            lastPathKey = pathKey;
            const t = trackByPath.get(pathKey);
            if (t) {
                fetchLrc(t.lrc_url);
            } else {
                lyricsDiv.innerHTML = `<div class='webamp-idle-msg'>&#9834; ${trackLabel(track.defaultName || String(currentTrackId))}</div>`;
            }
        } catch (e) { }
    }

    function diagnosticDump() {
        if (!webamp) return;
        try {
            const state = webamp.store.getState();
            const { currentTrack, trackOrder } = state.playlist || {};
            console.log(`[WebampRadio] Diag — currentTrack: ${currentTrack}, tracks: ${Object.keys(state.tracks || {}).length}`);
            if (currentTrack !== null && currentTrack !== undefined) {
                console.log("[WebampRadio] Diag — playing URL:", state.tracks?.[currentTrack]?.url);
            }
        } catch (e) { }
    }

    async function initWebamp(skinUrl, artistName, fontSize) {
        if (webamp || isInitializing) return;
        isInitializing = true;
        currentArtistName = artistName || "Ace-Step AI";

        try {
            const WebampClass = await loadWebampLibrary();

            const options = {
                initialTracks: [],
                availableSkins: [
                    {
                        url: "https://archive.org/cors/winampskin_Windows_Classic/Windows_Classic.wsz",
                        name: "Windows Classic"
                    },
                    { url: "https://cdn.webamp.org/skins/base-2.91.wsz", name: "Classic Winamp 2.91" },
                    { url: "https://cdn.webamp.org/skins/Bento.wsz", name: "Bento" }
                ],
                zIndex: 100,
                // Open windows with 150px top buffer so they can't hide behind browser tabs
                __initialWindowLayout: {
                    main: { position: { x: 20, y: 150 } },
                    equalizer: { position: { x: 20, y: 266 } },
                    playlist: { position: { x: 20, y: 382 } },
                    milkdrop: { position: { x: 295, y: 150 } }
                },
                __butterchurnOptions: {
                    importButterchurn: () => import("https://unpkg.com/butterchurn@^2?module"),
                    importPresets: () => import("https://unpkg.com/butterchurn-presets@^2?module")
                }
            };

            if (skinUrl && skinUrl.trim()) {
                options.initialSkin = { url: skinUrl.trim() };
            }

            webamp = new WebampClass(options);

            window.addEventListener('lyricerclick', function (e) {
                const target = e.target.closest(`#${lyricsDiv.id}`);
                if (target && e.detail.time >= 0 && webamp) {
                    try { webamp.seekToTime(e.detail.time); } catch (err) { }
                }
            });

            // Render into the in-node host div — NOT document.body
            await webamp.renderWhenReady(webampHost);

            if (syncInterval) clearInterval(syncInterval);
            if (diagInterval) clearInterval(diagInterval);
            syncInterval = setInterval(syncState, 333);
            diagInterval = setInterval(diagnosticDump, 15000);

            applyFontSize(lyricsDiv, fontSize || 13);
            lyricsDiv.innerHTML = "<div class='webamp-idle-msg'>Ready – play a track to see lyrics</div>";

        } catch (e) {
            lyricsDiv.innerHTML = `<div class='webamp-error'>${e.message}</div>`;
        } finally {
            isInitializing = false;
        }
    }

    async function scanFolder(folder) {
        if (!folder || !folder.trim() || !webamp) return;
        try {
            const res = await fetch(`/radio_player/scan?folder=${encodeURIComponent(folder.trim())}`);
            const data = await res.json();
            if (data.error) return;
            const newTracks = [];
            for (const t of data.tracks) {
                if (!knownPaths.has(t.path)) {
                    knownPaths.add(t.path);
                    const pathKey = getPathParam(t.url);
                    trackByPath.set(pathKey, t);
                    newTracks.push({
                        url: t.url,
                        metaData: { title: trackLabel(t.filename), artist: currentArtistName }
                    });
                } else {
                    const pathKey = getPathParam(t.url);
                    const ex = trackByPath.get(pathKey);
                    if (ex) ex.lrc_url = t.lrc_url;
                }
            }
            if (newTracks.length > 0) webamp.appendTracks(newTracks);
        } catch (e) { }
    }

    container._startPolling = function (folder, skinUrl, artistName, fontSize, intervalMs) {
        currentArtistName = artistName || "Ace-Step AI";
        applyFontSize(lyricsDiv, fontSize || 13);
        if (!webamp && !isInitializing) {
            initWebamp(skinUrl, artistName, fontSize).then(() => {
                scanFolder(folder);
                if (polling) clearInterval(polling);
                polling = setInterval(() => scanFolder(folder), intervalMs || 5000);
            });
        } else {
            scanFolder(folder);
            if (polling) clearInterval(polling);
            polling = setInterval(() => scanFolder(folder), intervalMs || 5000);
        }
    };

    container._stop = function () {
        if (polling) clearInterval(polling);
        if (syncInterval) clearInterval(syncInterval);
        if (diagInterval) clearInterval(diagInterval);
        polling = syncInterval = diagInterval = null;
        if (webamp) {
            try { webamp.dispose(); } catch (e) { }
            webamp = null;
        }
    };

    return container;
}

app.registerExtension({
    name: "AceStep.WebampRadio",
    nodeCreated(node) {
        if (node.comfyClass !== "AceStepWebAmpRadio") return;
        const root = buildWebampWidget(node);
        node.addDOMWidget("webamp_ui", "WEBAMP_PLAYER_UI", root, { getValue() { return ""; }, setValue() { } }).serialize = false;

        setTimeout(() => {
            const folderW = node.widgets?.find(w => w.name === "folder");
            const skinW = node.widgets?.find(w => w.name === "skin_url");
            const intervalW = node.widgets?.find(w => w.name === "poll_interval_seconds");
            const artistW = node.widgets?.find(w => w.name === "artist_name");
            const fontW = node.widgets?.find(w => w.name === "lyrics_font_size");

            function restartPolling() {
                root._startPolling(
                    folderW?.value || "audio",
                    skinW?.value || "",
                    artistW?.value || "Ace-Step AI",
                    fontW?.value || 13,
                    (intervalW?.value || 30) * 1000
                );
            }

            if (fontW) {
                const o = fontW.callback;
                fontW.callback = function () {
                    o?.apply(this, arguments);
                    const ld = root.querySelector(".webamp-lyrics-display");
                    if (ld) applyFontSize(ld, fontW.value || 13);
                };
            }
            if (folderW) { const o = folderW.callback; folderW.callback = function () { o?.apply(this, arguments); restartPolling(); }; }
            if (skinW) { const o = skinW.callback; skinW.callback = function () { o?.apply(this, arguments); root._stop(); restartPolling(); }; }
            if (artistW) { const o = artistW.callback; artistW.callback = function () { o?.apply(this, arguments); restartPolling(); }; }

            restartPolling();
        }, 300);

        const oRem = node.onRemoved;
        node.onRemoved = function () { oRem?.apply(this, arguments); root._stop(); };
    }
});
