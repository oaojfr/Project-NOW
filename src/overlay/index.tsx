import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import Sidebar from "./components/sidebar";
import type { Config } from "../shared/types";
import { defaultConfig } from "../shared/types";

const css = window.electronAPI.getTailwindCss();

// Create host element and attach a Shadow DOM to fully isolate overlay styles
const host = document.createElement("div");
host.id = "project-now-overlay-host";
const shadow = host.attachShadow({ mode: "open" });

// Inject Tailwind CSS inside the shadow root so it doesn't leak to the host page
const style = document.createElement("style");
style.textContent = css;
shadow.appendChild(style);

// Mount point inside the shadow root
const mount = document.createElement("div");
mount.id = "project-now-sidebar-root";
shadow.appendChild(mount);

// Attach host to the document body
document.body.appendChild(host);

const App = () => {
    const [visible, setVisible] = React.useState(false);
    const [config, setConfig] = useState<Config>(defaultConfig);

    useEffect(() => {
        window.electronAPI.getCurrentConfig().then((config) => {
            setConfig(config);
        });
        window.electronAPI.onConfigLoaded((config: Config) => {
            console.log("Config loaded in overlay:", config);
            setConfig(config);
        });

        // Listen for global shortcut from main process (works during streaming)
        window.electronAPI.onSidebarToggle(() => {
            setVisible((v) => !v);
        });

        // Also listen for keyboard events (works when page has focus)
        const handler = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.key === "i") {
                e.preventDefault();
                setVisible((v) => !v);
            }
        };

        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, []);

    useEffect(() => {
        window.electronAPI.saveConfig(config);
    }, [config]);

    return (
        <Sidebar config={config} setConfig={setConfig} visible={visible} />
    );
};

createRoot(mount).render(<App />);
