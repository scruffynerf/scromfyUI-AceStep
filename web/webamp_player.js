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

// Extract the `path` query param from audio URL – stable across relative/absolute forms
function getPathParam(url) {
    try {
        const u = new URL(url, window.location.href);
        return u.searchParams.get("path") || url;
    } catch {
        return url;
    }
}

function buildWebampWidget(node) {
    const container = document.createElement("div");
    container.className = "webamp-node-container";
    container.id = `webamp-node-ui-${node.id}`;

    // Lyrics Area (stays inside the node)
    const lyricsDiv = document.createElement("div");
    lyricsDiv.id = `webamp-lyrics-${node.id}`;
    lyricsDiv.className = "webamp-lyrics-display";
    lyricsDiv.style.minHeight = "120px";
    lyricsDiv.innerHTML = `<div class="webamp-loading-state">
        <div class="rp-spinner">⌛</div>
        <b>Preparing Webamp...</b>
    </div>`;
    container.appendChild(lyricsDiv);

    // Zero-size anchor for WebAmp floating windows
    const webampHost = document.createElement("div");
    webampHost.id = `webamp-host-${node.id}`;
    webampHost.style.cssText = "position:absolute;top:0;left:0;width:0;height:0;";
    container.appendChild(webampHost);

    let webamp = null;
    let knownPaths = new Set();
    let trackByPath = new Map();
    let polling = null;
    let syncInterval = null;
    let isInitializing = false;
    let lastPathKey = null;
    let lastTime = -1;

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
                console.log("[WebampRadio] Lyrics loaded for", lrcUrl);
            } else {
                lyricsDiv.innerHTML = "<div class='webamp-no-lyrics'>No lyrics file found</div>";
            }
        } catch (e) {
            lyricsDiv.innerHTML = "<div class='webamp-no-lyrics'>Error loading lyrics</div>";
        }
    }

    // Called periodically to sync state from the webamp store
    function syncState() {
        if (!webamp) return;
        try {
            const state = webamp.store.getState();

            // --- Time sync ---
            const currentTime = state.media?.timeElapsed;
            if (currentTime !== undefined && Math.abs(currentTime - lastTime) > 0.05) {
                lastTime = currentTime;
                lrc.move(currentTime);
            }

            // --- Track sync ---
            const playlistState = state.playlist;
            if (!playlistState) return;

            // In WebAmp 2.x, tracks may be an array OR an object keyed by id
            // currentTrack may be an index or an id string
            const { tracks, currentTrack } = playlistState;
            if (tracks === undefined || currentTrack === undefined || currentTrack === null) return;

            let track = null;
            if (Array.isArray(tracks)) {
                track = tracks[currentTrack];
            } else {
                // Object map – try direct key lookup first, then iterate
                track = tracks[currentTrack];
                if (!track) {
                    // currentTrack might be an order index – grab from `order` array
                    const order = playlistState.trackOrder || playlistState.order;
                    if (order && order[currentTrack] !== undefined) {
                        track = tracks[order[currentTrack]];
                    }
                }
            }

            if (!track || !track.url) return;

            const pathKey = getPathParam(track.url);
            if (pathKey === lastPathKey) return;

            lastPathKey = pathKey;
            console.log("[WebampRadio] Track switched, path key:", pathKey);

            const t = trackByPath.get(pathKey);
            if (t) {
                fetchLrc(t.lrc_url);
            } else {
                console.warn("[WebampRadio] No trackMap entry for path key:", pathKey);
                console.log("[WebampRadio] trackByPath keys:", [...trackByPath.keys()]);
                lyricsDiv.innerHTML = `<div class='webamp-idle-msg'>♪ ${trackLabel(track.metaData?.title || track.url)}</div>`;
            }
        } catch (e) {
            // ignore transient errors
        }
    }

    async function initWebamp(skinUrl) {
        if (webamp || isInitializing) return;
        isInitializing = true;

        try {
            const WebampClass = await loadWebampLibrary();

            const options = {
                initialTracks: [],
                availableSkins: [
                    { url: "https://cdn.webamp.org/skins/base-2.91.wsz", name: "Classic Winamp" },
                    { url: "https://cdn.webamp.org/skins/Bento.wsz", name: "Bento" }
                ],
                zIndex: 10,
                __butterchurnOptions: {
                    importButterchurn: () => import("https://unpkg.com/butterchurn@^2?module"),
                    importPresets: () => import("https://unpkg.com/butterchurn-presets@^2?module")
                }
            };

            if (skinUrl && skinUrl.trim()) {
                options.initialSkin = { url: skinUrl.trim() };
            }

            webamp = new WebampClass(options);

            // Dump state shape once after init for diagnostics
            setTimeout(() => {
                if (!webamp) return;
                const state = webamp.store.getState();
                console.log("[WebampRadio] Redux state keys:", Object.keys(state));
                console.log("[WebampRadio] playlist state:", JSON.stringify(state.playlist, null, 2));
            }, 2000);

            window.addEventListener('lyricerclick', function (e) {
                const target = e.target.closest(`#${lyricsDiv.id}`);
                if (target && e.detail.time >= 0 && webamp) {
                    try { webamp.seekToTime(e.detail.time); } catch (err) { }
                }
            });

            await webamp.renderWhenReady(webampHost);

            // Start polling the store – more reliable than subscribe for state diffs
            if (syncInterval) clearInterval(syncInterval);
            syncInterval = setInterval(syncState, 333);

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
                    console.log("[WebampRadio] Registered track key:", pathKey, "lrc:", t.lrc_url);
                    newTracks.push({
                        url: t.url,
                        metaData: { title: trackLabel(t.filename), artist: "Ace-Step AI" }
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

    container._startPolling = function (folder, skinUrl, intervalMs) {
        if (!webamp && !isInitializing) {
            initWebamp(skinUrl).then(() => {
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
        polling = syncInterval = null;
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
            function restartPolling() {
                root._startPolling(folderW?.value || "audio", skinW?.value || "", (intervalW?.value || 30) * 1000);
            }
            if (folderW) {
                const o = folderW.callback;
                folderW.callback = function () { o?.apply(this, arguments); restartPolling(); };
            }
            if (skinW) {
                const o = skinW.callback;
                skinW.callback = function () { o?.apply(this, arguments); root._stop(); restartPolling(); };
            }
            restartPolling();
        }, 300);

        const oRem = node.onRemoved;
        node.onRemoved = function () { oRem?.apply(this, arguments); root._stop(); };
    }
});
