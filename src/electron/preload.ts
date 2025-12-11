import { contextBridge, ipcRenderer, clipboard, shell } from "electron";
import { Config } from "../shared/types";
import path from "path";
import fs from "fs";

declare global {
    interface Window {
        toggleSidebar: () => void;
    }
}

// Get browser language for loading screen translations
function getBrowserLanguage(): string {
    const lang = navigator.language?.substring(0, 2) || "en";
    return ["en", "fr", "pt", "es", "it"].includes(lang) ? lang : "en";
}

// Loading screen translations
const loadingTranslations: Record<string, Record<string, string>> = {
    en: {
        launching: "Launching game...",
        connecting: "Connecting to GeForce NOW...",
        loadingPage: "Loading game page...",
        waitingButton: "Waiting for Play button...",
        almostThere: "Almost there...",
        starting: "Starting game...",
        notFound: "Could not find Play button. Click manually.",
    },
    fr: {
        launching: "Lancement du jeu...",
        connecting: "Connexion à GeForce NOW...",
        loadingPage: "Chargement de la page...",
        waitingButton: "Recherche du bouton Jouer...",
        almostThere: "Presque prêt...",
        starting: "Démarrage du jeu...",
        notFound: "Bouton Jouer introuvable. Cliquez manuellement.",
    },
    pt: {
        launching: "Iniciando jogo...",
        connecting: "Conectando ao GeForce NOW...",
        loadingPage: "Carregando página do jogo...",
        waitingButton: "Aguardando botão Jogar...",
        almostThere: "Quase lá...",
        starting: "Iniciando jogo...",
        notFound: "Botão Jogar não encontrado. Clique manualmente.",
    },
    es: {
        launching: "Iniciando juego...",
        connecting: "Conectando a GeForce NOW...",
        loadingPage: "Cargando página del juego...",
        waitingButton: "Esperando botón Jugar...",
        almostThere: "Casi listo...",
        starting: "Iniciando juego...",
        notFound: "No se encontró el botón Jugar. Haz clic manualmente.",
    },
    it: {
        launching: "Avvio del gioco...",
        connecting: "Connessione a GeForce NOW...",
        loadingPage: "Caricamento pagina...",
        waitingButton: "In attesa del pulsante Gioca...",
        almostThere: "Quasi pronto...",
        starting: "Avvio del gioco...",
        notFound: "Pulsante Gioca non trovato. Clicca manualmente.",
    },
};

// Get translation for loading screen
function getLoadingText(key: string): string {
    const lang = getBrowserLanguage();
    return loadingTranslations[lang]?.[key] || loadingTranslations.en[key];
}

// Extract game name from URL or use default
function getGameNameFromUrl(): string {
    try {
        const url = new URL(window.location.href);
        return url.searchParams.get("game-name") || "your game";
    } catch {
        return "your game";
    }
}

// Create loading screen overlay
function createLoadingScreen(): HTMLDivElement {
    const overlay = document.createElement("div");
    overlay.id = "project-now-loading";
    overlay.innerHTML = `
        <style>
            #project-now-loading {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, #1a1d21 0%, #23272b 50%, #1a1d21 100%);
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                z-index: 999999;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            }
            #project-now-loading .logo {
                width: 120px;
                height: 120px;
                margin-bottom: 30px;
                animation: pulse 2s ease-in-out infinite;
            }
            #project-now-loading .title {
                color: #76b900;
                font-size: 28px;
                font-weight: bold;
                margin-bottom: 10px;
            }
            #project-now-loading .subtitle {
                color: #babec4;
                font-size: 18px;
                margin-bottom: 40px;
            }
            #project-now-loading .spinner {
                width: 50px;
                height: 50px;
                border: 4px solid #333;
                border-top-color: #76b900;
                border-radius: 50%;
                animation: spin 1s linear infinite;
            }
            #project-now-loading .status {
                color: #888;
                font-size: 14px;
                margin-top: 20px;
            }
            @keyframes spin {
                to { transform: rotate(360deg); }
            }
            @keyframes pulse {
                0%, 100% { transform: scale(1); opacity: 1; }
                50% { transform: scale(1.05); opacity: 0.8; }
            }
            #project-now-loading.fade-out {
                animation: fadeOut 0.5s ease-out forwards;
            }
            @keyframes fadeOut {
                to { opacity: 0; pointer-events: none; }
            }
        </style>
        <svg class="logo" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="45" stroke="#76b900" stroke-width="3" fill="none"/>
            <path d="M35 50 L45 60 L65 40" stroke="#76b900" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
        </svg>
        <div class="title">Project NOW</div>
        <div class="subtitle">${getLoadingText("launching")}</div>
        <div class="spinner"></div>
        <div class="status">${getLoadingText("connecting")}</div>
    `;
    return overlay;
}

// Update loading screen status
function updateLoadingStatus(overlay: HTMLDivElement, status: string) {
    const statusEl = overlay.querySelector(".status");
    if (statusEl) statusEl.textContent = status;
}

// Remove loading screen with fade animation
function removeLoadingScreen(overlay: HTMLDivElement) {
    overlay.classList.add("fade-out");
    setTimeout(() => overlay.remove(), 500);
}

// Auto-click "Play" button when launched with game-id
function autoClickPlayButton() {
    const url = window.location.href;
    if (!url.includes("game-id=")) return;
    
    console.log("[AutoPlay] Game page detected, showing loading screen...");
    
    // Create and show loading screen immediately
    const loadingScreen = createLoadingScreen();
    document.body.appendChild(loadingScreen);
    
    let attempts = 0;
    const maxAttempts = 30; // 30 attempts * 500ms = 15 seconds max
    
    const interval = setInterval(() => {
        attempts++;
        
        // Update status based on progress
        if (attempts === 5) updateLoadingStatus(loadingScreen, getLoadingText("loadingPage"));
        if (attempts === 10) updateLoadingStatus(loadingScreen, getLoadingText("waitingButton"));
        if (attempts === 20) updateLoadingStatus(loadingScreen, getLoadingText("almostThere"));
        
        // Liste des textes possibles pour le bouton Play/Reprendre dans toutes les langues
        const playButtonLabels = [
            "JOUER", "Jouer", "Reprendre",
            "PLAY", "Play", "Resume",
            "JOGAR", "Jogar", "Retomar",
            "JUGAR", "Jugar", "Reanudar",
            "GIOCA", "Gioca", "Riprendi"
        ];
        const playBtn = Array.from(document.querySelectorAll("button.mdc-button--raised")).find((b) =>
            playButtonLabels.some(label => b.textContent?.trim().toLowerCase().includes(label.toLowerCase()))
        ) as HTMLButtonElement | undefined;
        
        if (playBtn) {
            clearInterval(interval);
            console.log("[AutoPlay] Play button found, clicking...");
            updateLoadingStatus(loadingScreen, getLoadingText("starting"));
            
            // Click the button, then wait 2 seconds before removing loading screen
            setTimeout(() => {
                playBtn.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
                console.log("[AutoPlay] Play button clicked!");
                // Wait 2 seconds after clicking before removing loading screen
                setTimeout(() => removeLoadingScreen(loadingScreen), 2000);
            }, 800);
        } else if (attempts >= maxAttempts) {
            clearInterval(interval);
            console.log("[AutoPlay] Play button not found after 15 seconds, giving up.");
            updateLoadingStatus(loadingScreen, getLoadingText("notFound"));
            setTimeout(() => removeLoadingScreen(loadingScreen), 2000);
        }
    }, 500);
}

window.addEventListener("DOMContentLoaded", () => {
    const script = document.createElement("script");
    script.type = "module";
    script.src = "app://overlay/index.js";
    document.body.appendChild(script);
    
    // Start auto-click detection
    autoClickPlayButton();
});

const cssPath = path.join(__dirname, "../assets/tailwind.bundle.css");
let tailwindCss = "";
try {
    tailwindCss = fs.readFileSync(cssPath, "utf-8");
} catch (err) {
    console.error("❌ Failed to read Tailwind CSS:", err);
}

contextBridge.exposeInMainWorld("electronAPI", {
    getTailwindCss: () => tailwindCss,
    onSidebarToggle: (callback: () => void) => {
        ipcRenderer.on("sidebar-toggle", (_event, ...args) => {
            callback();
        });
    },
    saveConfig: (config: Partial<Config>) =>
        ipcRenderer.send("save-config", config),
    getCurrentConfig: () => ipcRenderer.invoke("get-config"),
    onConfigLoaded: (callback: (config: Config) => void) => {
        ipcRenderer.on("config-loaded", (event, config) => callback(config));
    },
    reloadGFN: () => {
        ipcRenderer.send("reload-gfn");
    },
    copyToClipboard: (text: string) => clipboard.writeText(text),
    openExternal: (url: string) => shell.openExternal(url),
    checkForUpdates: () => ipcRenderer.invoke("check-for-updates"),
    quitAndInstall: () => ipcRenderer.send("quit-and-install"),
    updateAvailable: (
        callback: (event: Electron.IpcRendererEvent, ...args: unknown[]) => void
    ) => ipcRenderer.on("update-available", callback),
    updateDownloaded: (
        callback: (event: Electron.IpcRendererEvent, ...args: unknown[]) => void
    ) => ipcRenderer.on("update-downloaded", callback),
    downloadUpdate: () => ipcRenderer.invoke("download-update"),
    createGameShortcut: (info: { gameName: string; gameId: string; location?: string }) => 
        ipcRenderer.invoke("create-game-shortcut", info),
    getPlatform: () => ipcRenderer.invoke("get-platform"),
    extractGameId: (url: string) => ipcRenderer.invoke("extract-game-id", url),
    getAppVersion: () => ipcRenderer.invoke("get-app-version"),
    openReleasesPage: () => ipcRenderer.invoke("open-releases-page"),
    onGitHubUpdateAvailable: (callback: (event: Electron.IpcRendererEvent, result: unknown) => void) =>
        ipcRenderer.on("github-update-available", callback),
});
