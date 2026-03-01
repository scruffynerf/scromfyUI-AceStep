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

    const inner = document.createElement("div");
    inner.id = `webamp-lyrics-${node.id}`;
    inner.className = "webamp-lyrics-display";
    inner.innerHTML = `<div class="webamp-loading-state">
        <div class="rp-spinner">⌛</div>
        <b>Preparing Webamp...</b>
    </div>`;
    container.appendChild(inner);

    let webamp = null;
    let knownPaths = new Set();
    let trackMap = new Map();
    let polling = null;
    let isInitializing = false;
    let lastTrackUrl = null;
    let lastTime = -1;

    // Initialize Lyricer
    const lyricerElId = `webamp-lyrics-${node.id}`;
    const lrc = new Lyricer({ "divID": lyricerElId, "showLines": 3 });

    async function loadWebampLibrary() {
        console.log("[WebampRadio] Loading local Butterchurn bundle...");
        try {
            // Import the local .mjs file
            const m = await import("./webamp.butterchurn.mjs");
            // In ESM bundles, it's usually the default export
            const WebampClass = m.default || m.Webamp;
            if (WebampClass) return WebampClass;
        } catch (e) {
            console.warn("[WebampRadio] Local mjs import failed:", e);
        }

        // Try jsdelivr as fallback
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
            inner.innerHTML = "<div class='webamp-no-lyrics'>No lyrics available</div>";
            return;
        }
        try {
            const res = await fetch(url);
            if (res.ok) {
                const text = await res.text();
                lrc.setLrc(text);
                console.log("[WebampRadio] lyrics loaded for", url);
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
                zIndex: 1000,
                // version 2.2.0 butterchurn bundle includes presets internally or expects them
                __butterchurnOptions: {
                    importButterchurn: () => import("https://unpkg.com/butterchurn@^2?module"),
                    importPresets: () => import("https://unpkg.com/butterchurn-presets@^2?module")
                }
            };

            if (skinUrl && skinUrl.trim()) {
                options.initialSkin = { url: skinUrl.trim() };
            }

            webamp = new WebampClass(options);

            // Version 2.2.0 compatibility: use store subscription for everything
            webamp.store.subscribe(() => {
                const state = webamp.store.getState();

                // 1. Time Update
                const mediaStatus = state.media?.status;
                const currentTime = state.media?.timeElapsed; // or timeRemaining
                if (currentTime !== undefined && currentTime !== lastTime) {
                    lastTime = currentTime;
                    lrc.move(currentTime);
                }

                // 2. Track Change
                const tracks = state.playlist?.tracks;
                const currentIdx = state.playlist?.currentTrack;
                if (tracks && currentIdx !== null && currentIdx !== undefined) {
                    const track = tracks[currentIdx];
                    if (track && track.url !== lastTrackUrl) {
                        lastTrackUrl = track.url;
                        console.log("[WebampRadio] Track changed:", track.url);
                        const t = trackMap.get(track.url);
                        if (t) fetchLrc(t.lrc_url);
                        else inner.innerHTML = `<div class='webamp-idle-msg'>Playing: ${trackLabel(track.metaData.title || "Unknown")}</div>`;
                    }
                }
            });

            // Handle click-to-seek from lyrics
            window.addEventListener('lyricerclick', function (e) {
                const target = e.target.closest(`#${lyricerElId}`);
                if (target && e.detail.time >= 0 && webamp) {
                    // In 2.2.0, seek might be through a method or action
                    // Most versions support seekToTime(seconds)
                    try {
                        webamp.seekToTime(e.detail.time);
                    } catch (err) {
                        console.warn("[WebampRadio] seekToTime not available, trying dispatch...");
                        webamp.store.dispatch({ type: "SEEK_TO_TIME", time: e.detail.time });
                    }
                }
            });

            await webamp.renderWhenReady(document.body);
            inner.innerHTML = "<div class='webamp-idle-msg'>Ready. Metadata and lyrics will sync here.</div>";

        } catch (e) {
            console.error("[WebampRadio] Init failed:", e);
            inner.innerHTML = `<div class='webamp-error'>${e.message}<br><small>See console for more.</small></div>`;
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
