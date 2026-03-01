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

console.log("[WebampRadio] JS module loading... (Butterchurn + LRC Sync)");

function trackLabel(filename) {
    return filename.replace(/\.[^.]+$/, "");
}

function buildWebampWidget(node) {
    const container = document.createElement("div");
    container.className = "webamp-node-container";
    container.id = `webamp-node-ui-${node.id}`;

    // Lyrics Area (Stays inside the node)
    const lyricsDiv = document.createElement("div");
    lyricsDiv.id = `webamp-lyrics-${node.id}`;
    lyricsDiv.className = "webamp-lyrics-display";
    lyricsDiv.innerHTML = `<div class="webamp-loading-state">
        <div class="rp-spinner">⌛</div>
        <b>Preparing Webamp...</b>
    </div>`;
    container.appendChild(lyricsDiv);

    // Hidden container for WebAmp's windows (so they float but are tracked by the node)
    const webampHost = document.createElement("div");
    webampHost.id = `webamp-host-${node.id}`;
    webampHost.style.position = "absolute";
    webampHost.style.top = "0";
    webampHost.style.left = "0";
    webampHost.style.width = "0";
    webampHost.style.height = "0";
    // NOTE: We don't want to hide it (display:none) because WebAmp needs to measure things
    container.appendChild(webampHost);

    let webamp = null;
    let knownPaths = new Set();
    let trackMap = new Map();
    let polling = null;
    let isInitializing = false;
    let lastTrackUrl = null;
    let lastTime = -1;

    // Initialize Lyricer
    const lrc = new Lyricer({ "divID": lyricsDiv.id, "showLines": 3 });

    async function loadWebampLibrary() {
        console.log("[WebampRadio] Loading local Butterchurn bundle...");
        try {
            const m = await import("./webamp.butterchurn.mjs");
            const WebampClass = m.default || m.Webamp;
            if (WebampClass) return WebampClass;
        } catch (e) {
            console.warn("[WebampRadio] Local mjs import failed, trying CDN fallback...");
        }

        try {
            const m = await import("https://cdn.jsdelivr.net/npm/webamp@2.2.0/built/webamp.butterchurn-bundle.min.mjs");
            return m.default || m.Webamp;
        } catch (e) {
            console.error("[WebampRadio] CDN fallback failed:", e);
        }

        throw new Error("Could not load Webamp library bundle.");
    }

    async function fetchLrc(url) {
        if (!url) {
            lyricsDiv.innerHTML = "<div class='webamp-no-lyrics'>No lyrics for this track</div>";
            return;
        }
        try {
            const res = await fetch(url);
            if (res.ok) {
                const text = await res.text();
                lrc.setLrc(text);
                console.log("[WebampRadio] Lyrics loaded for", url);
            } else {
                lyricsDiv.innerHTML = "<div class='webamp-no-lyrics'>Lyrics not found</div>";
            }
        } catch (e) {
            console.error("[WebampRadio] LRC fetch error:", e);
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
                    { url: "https://archive.org/cors/winampskin_mac_os_x_1_5-aqua/mac_os_x_1_5-aqua.wsz", name: "Mac OS X Aqua" },
                    { url: "https://cdn.webamp.org/skins/base-2.91.wsz", name: "Classic Winamp" },
                    { url: "https://cdn.webamp.org/skins/Bento.wsz", name: "Bento" }
                ],
                // Reduced zIndex to prevent complete takeover
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

            // Version 2.2.0 store subscription
            webamp.store.subscribe(() => {
                const state = webamp.store.getState();

                // 1. Sync Time
                const currentTime = state.media?.timeElapsed;
                if (currentTime !== undefined && Math.abs(currentTime - lastTime) > 0.1) {
                    lastTime = currentTime;
                    lrc.move(currentTime);
                }

                // 2. Sync Track
                const tracks = state.playlist?.tracks;
                const currentIdx = state.playlist?.currentTrack;
                if (tracks && currentIdx !== null && currentIdx !== undefined) {
                    const track = tracks[currentIdx];
                    if (track && track.url !== lastTrackUrl) {
                        lastTrackUrl = track.url;
                        console.log("[WebampRadio] Track sync:", track.url);
                        const t = trackMap.get(track.url);
                        if (t) fetchLrc(t.lrc_url);
                        else lyricsDiv.innerHTML = `<div class='webamp-idle-msg'>Playing: ${trackLabel(track.metaData.title || t?.filename || "Unknown")}</div>`;
                    }
                }
            });

            // Handle click-to-seek
            window.addEventListener('lyricerclick', function (e) {
                const target = e.target.closest(`#${lyricsDiv.id}`);
                if (target && e.detail.time >= 0 && webamp) {
                    try {
                        webamp.seekToTime(e.detail.time);
                    } catch (err) {
                        webamp.store.dispatch({ type: "SEEK_TO_TIME", time: e.detail.time });
                    }
                }
            });

            // Render into our hidden host div
            console.log("[WebampRadio] Rendering Webamp to host div...");
            await webamp.renderWhenReady(webampHost);

            lyricsDiv.innerHTML = "<div class='webamp-idle-msg'>Ready. Metadata and lyrics will sync here.</div>";
            console.log("[WebampRadio] Webamp initialized successfully.");

        } catch (e) {
            console.error("[WebampRadio] Init failed:", e);
            lyricsDiv.innerHTML = `<div class='webamp-error'>${e.message}<br><small>See console for more.</small></div>`;
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
                    trackMap.set(t.url, t);
                    newTracks.push({
                        url: t.url,
                        metaData: { title: trackLabel(t.filename), artist: "Ace-Step AI" }
                    });
                } else {
                    const existing = trackMap.get(t.url);
                    if (existing) existing.lrc_url = t.lrc_url;
                }
            }

            if (newTracks.length > 0) {
                console.log(`[WebampRadio] Adding ${newTracks.length} tracks`);
                webamp.appendTracks(newTracks);
            }
        } catch (e) { }
    }

    container._startPolling = function (folder, skinUrl, intervalMs) {
        if (!webamp && !isInitializing) {
            initWebamp(skinUrl).then(() => {
                scanFolder(folder);
                if (polling) clearInterval(polling);
                polling = setInterval(() => scanFolder(folder), intervalMs || 5000);
            });
        } else if (webamp) {
            scanFolder(folder);
            if (polling) clearInterval(polling);
            polling = setInterval(() => scanFolder(folder), intervalMs || 5000);
        }
    };

    container._stop = function () {
        if (polling) clearInterval(polling);
        polling = null;
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
