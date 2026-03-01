/**
 * WebAmp Radio Player – frontend extension for ComfyUI
 */

import { app } from "../../scripts/app.js";

// Load CSS
const link = document.createElement("link");
link.rel = "stylesheet";
link.href = new URL("./webamp_player.css", import.meta.url).href;
document.head.appendChild(link);

console.log("[WebampRadio] JS module loading... (Local Bundle Mode)");

function trackLabel(filename) {
    return filename.replace(/\.[^.]+$/, "");
}

function buildWebampWidget(node) {
    const container = document.createElement("div");
    container.className = "webamp-container";
    container.style.height = "400px";
    container.style.width = "100%";
    container.id = `webamp-container-${node.id || 'new'}`;

    const inner = document.createElement("div");
    inner.id = `webamp-app-${node.id || 'new'}`;
    inner.style.width = "100%";
    inner.style.height = "100%";
    inner.innerHTML = `<div style="color:#6b7280;padding:20px;font-family:sans-serif;font-size:12px;display:flex;flex-direction:column;justify-content:center;height:100%;text-align:center;">
        <div class="rp-spinner" style="margin-bottom:10px;">⌛</div>
        <b>Initializing Webamp...</b>
    </div>`;
    container.appendChild(inner);

    let webamp = null;
    let knownPaths = new Set();
    let polling = null;
    let isInitializing = false;

    async function loadWebampLibrary() {
        if (window.Webamp) return window.Webamp;

        return new Promise((resolve, reject) => {
            console.log("[WebampRadio] Loading local Webamp bundle...");
            const script = document.createElement("script");
            script.src = new URL("./webamp.bundle.js", import.meta.url).href;
            script.onload = () => {
                if (window.Webamp) {
                    console.log("[WebampRadio] Local bundle loaded OK");
                    resolve(window.Webamp);
                } else {
                    reject(new Error("Webamp bundle loaded but window.Webamp is missing"));
                }
            };
            script.onerror = () => reject(new Error("Failed to load local webamp.bundle.js"));
            document.head.appendChild(script);
        });
    }

    async function initWebamp(skinUrl) {
        if (webamp || isInitializing) return;
        isInitializing = true;

        try {
            const WebampClass = await loadWebampLibrary();

            console.log("[WebampRadio] Initializing Webamp instance...");
            const options = {
                initialTracks: [],
                availableSkins: [
                    { url: "https://cdn.webamp.org/skins/base-2.91.wsz", name: "Winamp Classic" },
                    { url: "https://cdn.webamp.org/skins/Aqua_X.wsz", name: "Aqua X" },
                    { url: "https://cdn.webamp.org/skins/Bento.wsz", name: "Bento" }
                ],
                zIndex: 1000
            };

            if (skinUrl && skinUrl.trim()) {
                options.initialSkin = { url: skinUrl.trim() };
            }

            webamp = new WebampClass(options);

            // Render into our container
            console.log("[WebampRadio] Rendering Webamp to DOM...");
            await webamp.renderWhenReady(inner);
            console.log("[WebampRadio] Webamp rendered successfully");

        } catch (e) {
            console.error("[WebampRadio] Initialization failed:", e);
            inner.innerHTML = `<div style="color:#ef4444;padding:20px;font-family:sans-serif;font-size:12px;display:flex;flex-direction:column;justify-content:center;height:100%;text-align:center;">
                <b style="font-size:14px;margin-bottom:8px;">Webamp Error</b>
                <div style="word-break:break-all;margin-bottom:8px;">${e.message}</div>
                <div style="color:#999;">The local bundle might have failed to load or initialize.</div>
            </div>`;
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

            const newWebampTracks = [];
            for (const t of data.tracks) {
                if (!knownPaths.has(t.path)) {
                    knownPaths.add(t.path);
                    newWebampTracks.push({
                        url: t.url,
                        metaData: {
                            title: trackLabel(t.filename),
                            artist: "Ace-Step AI"
                        }
                    });
                }
            }

            if (newWebampTracks.length > 0) {
                console.log(`[WebampRadio] Appending ${newWebampTracks.length} tracks`);
                webamp.appendTracks(newWebampTracks);
            }
        } catch (e) {
            console.error("[WebampRadio] Fetch error:", e);
        }
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
            inner.innerHTML = `<div style="color:#999;text-align:center;padding:20px;">Ready (Stopped)</div>`;
        }
    };

    return container;
}

app.registerExtension({
    name: "AceStep.WebampRadio",
    nodeCreated(node) {
        if (node.comfyClass !== "AceStepWebAmpRadio") return;

        const root = buildWebampWidget(node);

        const domWidget = node.addDOMWidget("webamp_ui", "WEBAMP_PLAYER_UI", root, {
            getValue() { return ""; },
            setValue() { },
        });
        domWidget.serialize = false;

        setTimeout(() => {
            const folderW = node.widgets?.find(w => w.name === "folder");
            const skinW = node.widgets?.find(w => w.name === "skin_url");
            const intervalW = node.widgets?.find(w => w.name === "poll_interval_seconds");

            function restartPolling() {
                root._startPolling(
                    folderW?.value || "audio",
                    skinW?.value || "",
                    (intervalW?.value || 30) * 1000
                );
            }

            if (folderW) {
                const orig = folderW.callback;
                folderW.callback = function () {
                    if (orig) orig.apply(this, arguments);
                    restartPolling();
                };
            }

            if (skinW) {
                const orig = skinW.callback;
                skinW.callback = function () {
                    if (orig) orig.apply(this, arguments);
                    root._stop();
                    restartPolling();
                };
            }

            restartPolling();
        }, 300);

        const origOnRemoved = node.onRemoved;
        node.onRemoved = function () {
            if (origOnRemoved) origOnRemoved.apply(this, arguments);
            root._stop();
        };
    }
});
