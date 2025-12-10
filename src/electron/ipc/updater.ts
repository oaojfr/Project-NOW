import { BrowserWindow, ipcMain, app, Notification, shell } from "electron";
import path from "path";

// Try to load autoUpdater, but it may fail with non-semver versions
let autoUpdater: typeof import("electron-updater").autoUpdater | null = null;
try {
    autoUpdater = require("electron-updater").autoUpdater;
} catch (error) {
    console.warn("[Updater] electron-updater not available:", error);
}

const GITHUB_REPO = "oaojfr/Project-NOW";
const GITHUB_RELEASES_URL = `https://api.github.com/repos/${GITHUB_REPO}/releases/latest`;
const RELEASES_PAGE_URL = `https://github.com/${GITHUB_REPO}/releases`;

interface GitHubRelease {
    tag_name: string;
    name: string;
    html_url: string;
    published_at: string;
    body: string;
}

interface UpdateCheckResult {
    updateAvailable: boolean;
    currentVersion: string;
    latestVersion: string;
    releaseUrl: string;
    releaseName: string;
    releaseNotes: string;
    error?: string;
}

// Compare two semantic version strings (returns 1 if v1 > v2, -1 if v1 < v2, 0 if equal)
function compareVersions(v1: string, v2: string): number {
    // Remove 'v' prefix and any suffix like 'hotfix', 'beta', etc.
    const clean1 = v1.replace(/^v/, "").replace(/[^0-9.].*/g, "");
    const clean2 = v2.replace(/^v/, "").replace(/[^0-9.].*/g, "");
    
    const parts1 = clean1.split(".").map(s => parseInt(s, 10) || 0);
    const parts2 = clean2.split(".").map(s => parseInt(s, 10) || 0);
    
    const maxLength = Math.max(parts1.length, parts2.length);
    
    for (let i = 0; i < maxLength; i++) {
        const p1 = parts1[i] || 0;
        const p2 = parts2[i] || 0;
        
        if (p1 > p2) return 1;
        if (p1 < p2) return -1;
    }
    
    return 0;
}

// Check for updates by fetching the latest release from GitHub
async function checkForGitHubUpdates(): Promise<UpdateCheckResult> {
    const currentVersion = app.getVersion();
    
    try {
        const response = await fetch(GITHUB_RELEASES_URL, {
            headers: {
                "Accept": "application/vnd.github.v3+json",
                "User-Agent": "Project-NOW-Updater"
            }
        });
        
        if (!response.ok) {
            throw new Error(`GitHub API returned ${response.status}`);
        }
        
        const release: GitHubRelease = await response.json();
        const latestVersion = release.tag_name.replace(/^v/, "");
        
        const updateAvailable = compareVersions(latestVersion, currentVersion) > 0;
        
        console.log(`[Updater] Current: ${currentVersion}, Latest: ${latestVersion}, Update available: ${updateAvailable}`);
        
        return {
            updateAvailable,
            currentVersion,
            latestVersion,
            releaseUrl: release.html_url,
            releaseName: release.name || `Version ${latestVersion}`,
            releaseNotes: release.body || ""
        };
    } catch (error) {
        console.error("[Updater] Failed to check for updates:", error);
        return {
            updateAvailable: false,
            currentVersion,
            latestVersion: currentVersion,
            releaseUrl: RELEASES_PAGE_URL,
            releaseName: "",
            releaseNotes: "",
            error: String(error)
        };
    }
}

function showUpdateNotification(result: UpdateCheckResult, mainWindow: BrowserWindow) {
    if (!result.updateAvailable) return;
    
    const notification = new Notification({
        title: "Project NOW - Update Available!",
        body: `Version ${result.latestVersion} is available (current: ${result.currentVersion}). Click to download.`,
        icon: path.join(__dirname, "..", "assets", "resources", "infinitylogo.png"),
    });
    
    notification.on("click", () => {
        shell.openExternal(result.releaseUrl);
    });
    
    notification.show();
}

export function registerUpdaterHandlers({
    mainWindow,
}: {
    mainWindow: BrowserWindow;
}) {
    // Legacy electron-updater handlers (only if autoUpdater is available)
    if (autoUpdater) {
        ipcMain.handle("check-for-updates-legacy", () => autoUpdater!.checkForUpdates());
        ipcMain.on("quit-and-install", () => autoUpdater!.quitAndInstall());
        ipcMain.handle("download-update", async () => {
            try {
                await autoUpdater!.downloadUpdate();
            } catch (e) {
                console.error("Failed download update:", e);
            }
        });

        autoUpdater.on("update-available", () => {
            mainWindow.webContents.send("update-available");
        });
        autoUpdater.on("update-downloaded", () => {
            mainWindow.webContents.send("update-downloaded");
        });
    } else {
        // Register dummy handlers to avoid "no handler" errors
        ipcMain.handle("check-for-updates-legacy", () => null);
        ipcMain.on("quit-and-install", () => {});
        ipcMain.handle("download-update", async () => {});
    }

    // GitHub-based update checker (always works)
    ipcMain.handle("check-for-updates", async () => {
        const result = await checkForGitHubUpdates();
        return result;
    });

    ipcMain.handle("get-app-version", () => {
        return app.getVersion();
    });

    ipcMain.handle("open-releases-page", () => {
        shell.openExternal(RELEASES_PAGE_URL);
    });
}

// Check for updates on startup
export async function checkUpdatesOnStartup(mainWindow: BrowserWindow) {
    setTimeout(async () => {
        try {
            const result = await checkForGitHubUpdates();
            if (result.updateAvailable) {
                showUpdateNotification(result, mainWindow);
                mainWindow.webContents.send("github-update-available", result);
            }
        } catch (error) {
            console.error("[Updater] Startup check failed:", error);
        }
    }, 5000);
}

