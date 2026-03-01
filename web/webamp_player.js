/**
 * WebAmp Radio Player – frontend extension for ComfyUI
 */

import { app } from "../../scripts/app.js";

// Load CSS
const link = document.createElement("link");
link.rel = "stylesheet";
link.href = new URL("./webamp_player.css", import.meta.url).href;
document.head.appendChild(link);

console.log("[WebampRadio] JS module loading...");

// Lazy load WebAmp from CDN
let WebampPromise = null;
function getWebamp() {
    if (!WebampPromise) {
        WebampPromise = import("https://unpkg.com/webamp@2.9.3/built-bundle/main.js").then((m) => {
            // Some versions export default, others attach to window
            return m.default || window.Webamp;
        });
    }
    return WebampPromise;
}

function trackLabel(filename) {
    return filename.replace(/\.[^.]+$/, "");
}

async function buildWebampWidget(node) {
    const container = document.createElement("div");
    container.className = "webamp-container";
    container.id = `webamp-container-${node.id}`;

    const inner = document.createElement("div");
    inner.id = `webamp-app-${node.id}`;
    container.appendChild(inner);

    let webamp = null;
    let allTracks = [];
    let knownPaths = new Set();
    let polling = null;

    async function initWebamp(skinUrl) {
        const WebampClass = await getWebamp();

        const options = {
            initialTracks: [],
            availableSkins: [
                { url: "https://cdn.webamp.org/skins/base-2.91.wsz", name: "Winamp Classic" },
                { url: "https://cdn.webamp.org/skins/Aqua_X.wsz", name: "Aqua X" },
                { url: "https://cdn.webamp.org/skins/Bento.wsz", name: "Bento" }
            ]
        };

        if (skinUrl && skinUrl.trim()) {
            options.initialSkin = { url: skinUrl.trim() };
        }

        webamp = new WebampClass(options);

        // Render into our container
        await webamp.renderWhenReady(inner);

        // We can also subscribe to events if needed
    }

    async function scanFolder(folder) {
        if (!folder || !folder.trim()) return;
        try {
            const res = await fetch(`/radio_player/scan?folder=${encodeURIComponent(folder.trim())}`);
            const data = await res.json();
            if (data.error) {
                console.error("[WebampRadio] Scan error:", data.error);
                return;
            }

            const newWebampTracks = [];
            for (const t of data.tracks) {
                if (!knownPaths.has(t.path)) {
                    knownPaths.add(t.path);
                    allTracks.push(t);

                    newWebampTracks.push({
                        url: t.url,
                        metaData: {
                            title: trackLabel(t.filename),
                            artist: "Ace-Step AI"
                        }
                    });
                }
            }

            if (newWebampTracks.length > 0 && webamp) {
                webamp.appendTracks(newWebampTracks);
                // If it was empty/idle, maybe trigger play?
                // WebAmp usually handles this well.
            }
        } catch (e) {
            console.error("[WebampRadio] Fetch error:", e);
        }
    }

    container._startPolling = function (folder, skinUrl, intervalMs) {
        if (!webamp) {
            initWebamp(skinUrl).then(() => {
                scanFolder(folder);
                if (polling) clearInterval(polling);
                polling = setInterval(() => scanFolder(folder), intervalMs || 5000);
            });
        } else {
            // If folder changed, we might want to clear state? 
            // For now, let's just keep adding.
            scanFolder(folder);
            if (polling) clearInterval(polling);
            polling = setInterval(() => scanFolder(folder), intervalMs || 5000);
        }
    };

    container._stop = function () {
        if (polling) clearInterval(polling);
        polling = null;
        if (webamp) {
            webamp.dispose();
            webamp = null;
        }
    };

    return container;
}

app.registerExtension({
    name: "AceStep.WebampRadio",
    async nodeCreated(node) {
        if (node.comfyClass !== "AceStepWebAmpRadio") return;

        const root = await buildWebampWidget(node);

        // Add custom widget
        const domWidget = node.addDOMWidget("webamp_ui", "WEBAMP_PLAYER_UI", root, {
            getValue() { return ""; },
            setValue() { },
        });
        domWidget.serialize = false;

        // Wait a bit for other widgets to init
        setTimeout(() => {
            const folderW = node.widgets.find(w => w.name === "folder");
            const skinW = node.widgets.find(w => w.name === "skin_url");
            const intervalW = node.widgets.find(w => w.name === "poll_interval_seconds");

            function restartPolling() {
                root._startPolling(
                    folderW?.value || "audio",
                    skinW?.value || "",
                    (intervalW?.value || 30) * 1000
                );
            }

            if (folderW) {
                const orig = folderW.callback;
                folderW.callback = function (v) {
                    if (orig) orig.apply(this, arguments);
                    restartPolling();
                };
            }

            if (skinW) {
                const orig = skinW.callback;
                skinW.callback = function (v) {
                    if (orig) orig.apply(this, arguments);
                    // If skin changes, we might need to recreate webamp or use webamp.setSkinFromUrl
                    // For now, let's just restart
                    root._stop();
                    restartPolling();
                };
            }

            restartPolling();
        }, 200);

        const origOnRemoved = node.onRemoved;
        node.onRemoved = function () {
            if (origOnRemoved) origOnRemoved.apply(this, arguments);
            root._stop();
        };
    }
});
