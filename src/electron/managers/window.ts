import { app, BrowserWindow } from "electron";
import path from "path";
import { getConfig } from "./config";
import { getIconPath } from "../utils";

export const GFN_WEBSITE = "https://play.geforcenow.com/";

/**
 * Build the GeForce NOW URL with optional game ID
 */
export function buildGfnUrl(gameId?: string): string {
    if (gameId) {
        return `${GFN_WEBSITE}games?game-id=${gameId}`;
    }
    return GFN_WEBSITE;
}

/**
 * Parse command line arguments to extract game ID
 */
export function parseGameIdFromArgs(args: string[]): string | undefined {
    for (const arg of args) {
        if (arg.startsWith("--game-id=")) {
            return arg.replace("--game-id=", "");
        }
    }
    return undefined;
}

const preloadPath = path.resolve(__dirname, "..", "preload.js");

export function createMainWindow(gameId?: string): BrowserWindow {
    const iconPath = getIconPath();

    const mainWindow = new BrowserWindow({
        width: 1400,
        height: 1000,
        title: "Project NOW",
        icon: iconPath || undefined,
        webPreferences: {
            preload: preloadPath,
            contextIsolation: true,
            nodeIntegration: false,
            sandbox: false,
            devTools: !app.isPackaged,
            webSecurity: true,
        },
        autoHideMenuBar: true,
    });

    const config = getConfig();
    if (
        typeof config.userAgent === "string" &&
        config.userAgent.trim() !== ""
    ) {
        mainWindow.webContents.setUserAgent(config.userAgent);
        console.log("[UserAgent] Overridden:", config.userAgent);
    } else {
        console.log("[UserAgent] Using default");
    }

    const targetUrl = buildGfnUrl(gameId);
    console.log("[Window] Loading URL:", targetUrl);
    
    //mainWindow.webContents.openDevTools();
    mainWindow.loadURL(targetUrl);
    return mainWindow;
}
