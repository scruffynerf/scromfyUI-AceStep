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

// Extract the `path` query param from a URL like:
//   http://localhost:8188/radio_player/audio?path=./output/audio/foo.flac
// Returns just the `path` value which is stable across relative vs absolute URL forms
function getPathParam(url) {
    try {
        // Both relative and absolute URLs work here
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

    // Zero-size container for WebAmp floating windows
    const webampHost = document.createElement("div");
    webampHost.id = `webamp-host-${node.id}`;
    webampHost.style.position = "absolute";
    webampHost.style.top = "0";
    webampHost.style.left = "0";
    webampHost.style.width = "0";
    webampHost.style.height = "0";
    container.appendChild(webampHost);

    let webamp = null;
    let knownPaths = new Set();
    // Key: `path` param from the audio URL (stable reference)
    let trackByPath = new Map();
    let polling = null;
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
        try {
            const m = await import("https://cdn.jsdelivr.net/npm/webamp@2.2.0/built/webamp.butterchurn-bundle.min.mjs");
            return m.default || m.Webamp;
        } catch (e) {
            throw new Error("Could not load Webamp: " + e.message);
        }
    }

    async function fetchLrc(lrcUrl) {
        if (!lrcUrl) {
            lyricsDiv.innerHTML = "<div class='webamp-no-lyrics'>No lyrics available</div>";
            return;
        }
        try {
            const res = await fetch(lrcUrl);
            if (res.ok) {
                const text = await res.text();
                lrc.setLrc(text);
                console.log("[WebampRadio] Lyrics loaded OK");
            } else {
                lyricsDiv.innerHTML = "<div class='webamp-no-lyrics'>No lyrics found</div>";
            }
        } catch (e) {
            lyricsDiv.innerHTML = "<div class='webamp-no-lyrics'>Error loading lyrics</div>";
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

            webamp.store.subscribe(() => {
                const state = webamp.store.getState();

                // --- Time sync ---
                const currentTime = state.media?.timeElapsed;
                if (currentTime !== undefined && Math.abs(currentTime - lastTime) > 0.05) {
                    lastTime = currentTime;
                    lrc.move(currentTime);
                }

                // --- Track sync (using stable path key) ---
                const tracks = state.playlist?.tracks;
                const currentIdx = state.playlist?.currentTrack;

                if (tracks && currentIdx !== null && currentIdx !== undefined) {
                    const track = tracks[currentIdx];
                    if (track) {
                        // Normalize: extract path param, which is stable
                        const pathKey = getPathParam(track.url);
                        if (pathKey !== lastPathKey) {
                            lastPathKey = pathKey;
                            console.log("[WebampRadio] Track changed, path key:", pathKey);

                            const t = trackByPath.get(pathKey);
                            if (t) {
                                fetchLrc(t.lrc_url);
                            } else {
                                console.warn("[WebampRadio] Track not in map. Path key:", pathKey, "| Map keys:", [...trackByPath.keys()].slice(0, 3));
                                lyricsDiv.innerHTML = `<div class='webamp-idle-msg'>♪ ${trackLabel(track.metaData.title || "Unknown")}</div>`;
                            }
                        }
                    }
                }
            });

            window.addEventListener('lyricerclick', function (e) {
                const target = e.target.closest(`#${lyricsDiv.id}`);
                if (target && e.detail.time >= 0 && webamp) {
                    try { webamp.seekToTime(e.detail.time); } catch (err) { }
                }
            });

            await webamp.renderWhenReady(webampHost);
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
                    // Key by the same `path` param we'll extract from WebAmp's store URL
                    const pathKey = getPathParam(t.url);
                    trackByPath.set(pathKey, t);

                    newTracks.push({
                        url: t.url,
                        metaData: { title: trackLabel(t.filename), artist: "Ace-Step AI" }
                    });
                } else {
                    const pathKey = getPathParam(t.url);
                    const existing = trackByPath.get(pathKey);
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
        } else {
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
