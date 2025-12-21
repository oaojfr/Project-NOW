import { ipcMain, app } from "electron";
import path from "path";
import fs from "fs";
import os from "os";
import https from "https";

// SteamGridDB API configuration
const STEAMGRIDDB_API_KEY = "fe038819ce05b928fa9a1b186c6689a4";
const STEAMGRIDDB_API_URL = "https://www.steamgriddb.com/api/v2";

export type ShortcutLocation = "desktop" | "startmenu" | "both";

interface ShortcutInfo {
    gameName: string;
    gameId: string;
    location?: ShortcutLocation;
}

interface SGDBGame {
    id: number;
    name: string;
}

interface SGDBIcon {
    id: number;
    url: string;
    thumb: string;
    width: number;
    height: number;
}

// Get icons cache directory
function getIconsCacheDir(): string {
    const userDataPath = app.getPath("userData");
    const cacheDir = path.join(userDataPath, "icons-cache");
    if (!fs.existsSync(cacheDir)) {
        fs.mkdirSync(cacheDir, { recursive: true });
    }
    return cacheDir;
}

// Make API request to SteamGridDB
async function sgdbRequest<T>(endpoint: string): Promise<T | null> {
    return new Promise((resolve) => {
        const url = `${STEAMGRIDDB_API_URL}${endpoint}`;
        console.log("[SteamGridDB] Request:", url);
        
        const req = https.request(url, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${STEAMGRIDDB_API_KEY}`,
                "Accept": "application/json"
            }
        }, (res) => {
            let data = "";
            res.on("data", chunk => data += chunk);
            res.on("end", () => {
                try {
                    const json = JSON.parse(data);
                    if (json.success) {
                        resolve(json.data as T);
                    } else {
                        console.log("[SteamGridDB] API error:", json);
                        resolve(null);
                    }
                } catch (e) {
                    console.error("[SteamGridDB] Parse error:", e);
                    resolve(null);
                }
            });
        });
        
        req.on("error", (e) => {
            console.error("[SteamGridDB] Request error:", e);
            resolve(null);
        });
        
        req.end();
    });
}

// Search for a game on SteamGridDB
async function searchGame(gameName: string): Promise<SGDBGame | null> {
    const games = await sgdbRequest<SGDBGame[]>(`/search/autocomplete/${encodeURIComponent(gameName)}`);
    if (games && games.length > 0) {
        console.log("[SteamGridDB] Found game:", games[0].name, "ID:", games[0].id);
        return games[0];
    }
    return null;
}

// Get icons for a game
async function getGameIcons(gameId: number): Promise<SGDBIcon[]> {
    const icons = await sgdbRequest<SGDBIcon[]>(`/icons/game/${gameId}`);
    return icons || [];
}

// Download an icon file
async function downloadIcon(url: string, destPath: string): Promise<boolean> {
    return new Promise((resolve) => {
        const file = fs.createWriteStream(destPath);
        
        https.get(url, (response) => {
            // Handle redirects
            if (response.statusCode === 301 || response.statusCode === 302) {
                const redirectUrl = response.headers.location;
                if (redirectUrl) {
                    file.close();
                    fs.unlinkSync(destPath);
                    downloadIcon(redirectUrl, destPath).then(resolve);
                    return;
                }
            }
            
            response.pipe(file);
            file.on("finish", () => {
                file.close();
                console.log("[SteamGridDB] Icon downloaded:", destPath);
                resolve(true);
            });
        }).on("error", (err) => {
            file.close();
            fs.unlinkSync(destPath);
            console.error("[SteamGridDB] Download error:", err);
            resolve(false);
        });
    });
}

// Get or download icon for a game
async function getGameIcon(gameName: string): Promise<string | null> {
    try {
        const cacheDir = getIconsCacheDir();
        const sanitizedName = sanitizeFilename(gameName);
        
        // Check if we already have a cached icon
        const cachedIco = path.join(cacheDir, `${sanitizedName}.ico`);
        const cachedPng = path.join(cacheDir, `${sanitizedName}.png`);
        
        if (fs.existsSync(cachedIco)) {
            console.log("[SteamGridDB] Using cached icon:", cachedIco);
            return cachedIco;
        }
        if (fs.existsSync(cachedPng)) {
            console.log("[SteamGridDB] Using cached icon:", cachedPng);
            return cachedPng;
        }
        
        // Search for the game
        const game = await searchGame(gameName);
        if (!game) {
            console.log("[SteamGridDB] Game not found:", gameName);
            return null;
        }
        
        // Get icons
        const icons = await getGameIcons(game.id);
        if (icons.length === 0) {
            console.log("[SteamGridDB] No icons found for:", gameName);
            return null;
        }
        
        // Pick the best icon (prefer ICO for Windows compatibility)
        let selectedIcon = icons[0];
        const icoIcon = icons.find(i => i.url.endsWith(".ico"));
        if (icoIcon) {
            selectedIcon = icoIcon;
        }
        
        // Determine file extension
        const ext = selectedIcon.url.match(/\.(ico|png)$/i)?.[1] || "png";
        const iconPath = path.join(cacheDir, `${sanitizedName}.${ext}`);
        
        // Download the icon
        const success = await downloadIcon(selectedIcon.url, iconPath);
        if (success) {
            return iconPath;
        }
        
        return null;
    } catch (error) {
        console.error("[SteamGridDB] Error getting icon:", error);
        return null;
    }
}

// Get the application executable path based on the platform
function getAppExecutablePath(): string {
    // Prefer explicit AppImage path when available to avoid pointing to temporary mount
    // AppImage sets the APPIMAGE environment variable to the original AppImage file path
    if (process.platform === "linux" && process.env.APPIMAGE) {
        // Return the AppImage file itself so created shortcuts point to it
        return process.env.APPIMAGE;
    }

    if (app.isPackaged) {
        // For packaged app
        if (process.platform === "win32") {
            return process.execPath;
        } else if (process.platform === "darwin") {
            // macOS: get the .app bundle path
            return process.execPath.replace(/\/Contents\/MacOS\/.*$/, "");
        } else {
            // Linux fallback: use execPath if APPIMAGE not available
            return process.execPath;
        }
    }

    // Development mode
    return process.execPath;
}

// Get the applications directory path for Linux
function getApplicationsPath(): string {
    const homeDir = os.homedir();
    const xdgDataHome = process.env.XDG_DATA_HOME || path.join(homeDir, ".local", "share");
    const applicationsPath = path.join(xdgDataHome, "applications");
    
    // Ensure the directory exists
    if (!fs.existsSync(applicationsPath)) {
        fs.mkdirSync(applicationsPath, { recursive: true });
    }
    
    return applicationsPath;
}

// Get the desktop path for the current user
function getDesktopPath(): string {
    const homeDir = os.homedir();
    
    if (process.platform === "win32") {
        // Windows: try to get from registry or use default
        return path.join(homeDir, "Desktop");
    } else if (process.platform === "darwin") {
        return path.join(homeDir, "Desktop");
    } else {
        // Linux: check for XDG user dirs first
        const xdgConfigHome = process.env.XDG_CONFIG_HOME || path.join(homeDir, ".config");
        const userDirsPath = path.join(xdgConfigHome, "user-dirs.dirs");
        
        try {
            if (fs.existsSync(userDirsPath)) {
                const content = fs.readFileSync(userDirsPath, "utf-8");
                const match = content.match(/XDG_DESKTOP_DIR="(.+?)"/);
                if (match) {
                    return match[1].replace("$HOME", homeDir);
                }
            }
        } catch {
            // Ignore errors and use default
        }
        
        return path.join(homeDir, "Desktop");
    }
}

// Get Windows Start Menu Programs path
function getWindowsStartMenuPath(): string {
    const appData = process.env.APPDATA || path.join(os.homedir(), "AppData", "Roaming");
    return path.join(appData, "Microsoft", "Windows", "Start Menu", "Programs");
}

function sanitizeFilename(name: string): string {
    // Remove characters that are invalid in filenames
    return name.replace(/[<>:"/\\|?*]/g, "").replace(/\s+/g, " ").trim();
}

// Path for storing index of created shortcuts
const SHORTCUT_INDEX_FILENAME = "shortcuts.json";

function getShortcutsIndexPath(): string {
    // Returns a path under userData to keep track of created shortcuts
    return path.join(app.getPath("userData"), SHORTCUT_INDEX_FILENAME);
}

function readShortcutsIndex(): any[] {
    try {
        const idxPath = getShortcutsIndexPath();
        if (fs.existsSync(idxPath)) {
            const raw = fs.readFileSync(idxPath, "utf-8");
            return JSON.parse(raw) || [];
        }
    } catch (e) {
        console.error("[Shortcuts] Failed to read shortcuts index:", e);
    }
    return [];
}

function writeShortcutsIndex(entries: any[]) {
    try {
        const idxPath = getShortcutsIndexPath();
        fs.writeFileSync(idxPath, JSON.stringify(entries, null, 2), "utf-8");
    } catch (e) {
        console.error("[Shortcuts] Failed to write shortcuts index:", e);
    }
}

// Create a single Windows .lnk shortcut at specified path
async function createSingleWindowsShortcut(
    shortcutPath: string, 
    execPath: string, 
    iconPath: string, 
    info: ShortcutInfo
): Promise<{ success: boolean; error?: string }> {
    const tempDir = os.tmpdir();
    const tempScriptPath = path.join(tempDir, `create-shortcut-${Date.now()}.ps1`);
    
    const psScript = `
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$WshShell = New-Object -ComObject WScript.Shell
$Shortcut = $WshShell.CreateShortcut("${shortcutPath.replace(/\\/g, "\\\\").replace(/"/g, '`"')}")
$Shortcut.TargetPath = "${execPath.replace(/\\/g, "\\\\").replace(/"/g, '`"')}"
$Shortcut.Arguments = "--game-id=${info.gameId}"
$Shortcut.WorkingDirectory = "${path.dirname(execPath).replace(/\\/g, "\\\\").replace(/"/g, '`"')}"
$Shortcut.Description = "Launch ${info.gameName.replace(/"/g, "'")} on GeForce NOW"
if (Test-Path "${iconPath.replace(/\\/g, "\\\\").replace(/"/g, '`"')}") {
    $Shortcut.IconLocation = "${iconPath.replace(/\\/g, "\\\\").replace(/"/g, '`"')}"
}
$Shortcut.Save()
`;

    return new Promise((resolve) => {
        const { exec } = require("child_process");
        const BOM = "\uFEFF";
        fs.writeFileSync(tempScriptPath, BOM + psScript, { encoding: "utf8" });
        
        exec(`powershell -ExecutionPolicy Bypass -File "${tempScriptPath}"`, (error: Error | null) => {
            try { fs.unlinkSync(tempScriptPath); } catch {}
            
            if (error) {
                resolve({ success: false, error: error.message });
            } else {
                resolve({ success: true });
            }
        });
    });
}

// Create Windows .lnk shortcut(s) at desktop and/or Start Menu
async function createWindowsShortcut(info: ShortcutInfo): Promise<{ success: boolean; path?: string; paths?: string[]; error?: string }> {
    const location = info.location || "desktop";
    const execPath = getAppExecutablePath();
    const shortcutFilename = `${sanitizeFilename(info.gameName)}.lnk`;
    
    // Try to get game icon from SteamGridDB, fallback to app icon
    let iconPath = await getGameIcon(info.gameName);
    if (!iconPath) {
        iconPath = app.isPackaged 
            ? path.join(path.dirname(execPath), "resources", "assets", "resources", "infinitylogo.ico")
            : path.join(__dirname, "..", "..", "assets", "resources", "infinitylogo.ico");
    }

    const paths: string[] = [];
    const errors: string[] = [];

    // Determine which paths to create shortcuts in
    const targetPaths: string[] = [];
    if (location === "desktop" || location === "both") {
        targetPaths.push(path.join(getDesktopPath(), shortcutFilename));
    }
    if (location === "startmenu" || location === "both") {
        targetPaths.push(path.join(getWindowsStartMenuPath(), shortcutFilename));
    }

    for (const shortcutPath of targetPaths) {
        const result = await createSingleWindowsShortcut(shortcutPath, execPath, iconPath, info);
        if (result.success) {
            paths.push(shortcutPath);
        } else {
            errors.push(`${shortcutPath}: ${result.error}`);
        }
    }

    if (paths.length > 0) {
        return { 
            success: true, 
            path: paths[0], 
            paths: paths 
        };
    } else {
        return { 
            success: false, 
            error: errors.join("; ") 
        };
    }
}

// Create a Linux .desktop file
async function createLinuxShortcut(info: ShortcutInfo): Promise<{ success: boolean; path?: string; paths?: string[]; error?: string }> {
    const location = info.location || "desktop";
    const execPath = getAppExecutablePath();
    const shortcutFilename = `${sanitizeFilename(info.gameName)}.desktop`;
    
    // Try to get game icon from SteamGridDB first
    let iconPath = await getGameIcon(info.gameName);
    
    // Fallback to app icon if no game icon found
    if (!iconPath) {
        const possibleIconPaths = [
            path.join(path.dirname(execPath), "resources", "assets", "resources", "infinitylogo.png"),
            "/opt/ProjectNOW/resources/assets/resources/infinitylogo.png",
            path.join(__dirname, "..", "..", "assets", "resources", "infinitylogo.png"),
        ];
        
        for (const p of possibleIconPaths) {
            if (fs.existsSync(p)) {
                iconPath = p;
                break;
            }
        }
    }

    const desktopEntry = `[Desktop Entry]
Name=${info.gameName}
Comment=Launch ${info.gameName} on GeForce NOW via Project NOW
Exec="${execPath}" --game-id=${info.gameId}
Icon=${iconPath || ""}
Terminal=false
Type=Application
Categories=Game;
StartupNotify=true
`;

    // Ensure the AppImage (or execPath) is executable so the desktop entry can run it
    try {
        if (process.platform === "linux" && fs.existsSync(execPath)) {
            fs.chmodSync(execPath, 0o755);
        }
    } catch (e) {
        // ignore chmod errors
        console.warn("[Shortcuts] Could not chmod execPath:", execPath, e);
    }

    const paths: string[] = [];
    const errors: string[] = [];

    // Determine which paths to create shortcuts in
    const targetPaths: string[] = [];
    if (location === "desktop" || location === "both") {
        targetPaths.push(path.join(getDesktopPath(), shortcutFilename));
    }
    if (location === "startmenu" || location === "both") {
        targetPaths.push(path.join(getApplicationsPath(), shortcutFilename));
    }

    for (const shortcutPath of targetPaths) {
        try {
            fs.writeFileSync(shortcutPath, desktopEntry, { mode: 0o755 });
            fs.chmodSync(shortcutPath, 0o755);
            paths.push(shortcutPath);
        } catch (error) {
            errors.push(`${shortcutPath}: ${(error as Error).message}`);
        }
    }

    if (paths.length > 0) {
        return { 
            success: true, 
            path: paths[0], 
            paths: paths 
        };
    } else {
        return { 
            success: false, 
            error: errors.join("; ") 
        };
    }
}

// Create a macOS .app shortcut
async function createMacOSShortcut(info: ShortcutInfo): Promise<{ success: boolean; path?: string; error?: string }> {
    const desktopPath = getDesktopPath();
    const appName = sanitizeFilename(info.gameName);
    const appPath = path.join(desktopPath, `${appName}.app`);
    const execPath = getAppExecutablePath();
    
    const contentsPath = path.join(appPath, "Contents");
    const macOSPath = path.join(contentsPath, "MacOS");
    const resourcesPath = path.join(contentsPath, "Resources");
    
    try {
        fs.mkdirSync(macOSPath, { recursive: true });
        fs.mkdirSync(resourcesPath, { recursive: true });
        
        const launcherScript = `#!/bin/bash
"${execPath}" --game-id=${info.gameId}
`;
        const launcherPath = path.join(macOSPath, appName);
        fs.writeFileSync(launcherPath, launcherScript, { mode: 0o755 });
        
        const infoPlist = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>CFBundleExecutable</key>
    <string>${appName}</string>
    <key>CFBundleIdentifier</key>
    <string>net.oaojfr.projectnow.game.${info.gameId}</string>
    <key>CFBundleName</key>
    <string>${info.gameName}</string>
    <key>CFBundlePackageType</key>
    <string>APPL</string>
    <key>CFBundleShortVersionString</key>
    <string>1.0</string>
    <key>LSMinimumSystemVersion</key>
    <string>10.10</string>
</dict>
</plist>
`;
        fs.writeFileSync(path.join(contentsPath, "Info.plist"), infoPlist);
        
        return { success: true, path: appPath };
    } catch (error) {
        return { success: false, error: (error as Error).message };
    }
}

async function createGameShortcut(info: ShortcutInfo): Promise<{ success: boolean; path?: string; paths?: string[]; error?: string }> {
    switch (process.platform) {
        case "win32":
            return createWindowsShortcut(info);
        case "darwin":
            return createMacOSShortcut(info);
        default:
            return createLinuxShortcut(info);
    }
}

function extractGameIdFromUrl(url: string): string | null {
    try {
        const urlObj = new URL(url);
        
        // Try different parameter names used by GeForce NOW
        const gameId = urlObj.searchParams.get("game-id") 
            || urlObj.searchParams.get("gameId")
            || urlObj.searchParams.get("game_id");
        
        if (gameId) return gameId;
        
        // Try to extract from URL path (e.g., /games/game-id-here)
        const pathMatch = urlObj.pathname.match(/\/games?\/([a-f0-9-]{36})/i);
        if (pathMatch) return pathMatch[1];
        
        // Try to find UUID pattern anywhere in the URL
        const uuidMatch = url.match(/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/i);
        if (uuidMatch) return uuidMatch[0];
        
        return null;
    } catch {
        return null;
    }
}

export function registerShortcutHandlers() {
    // Handle creation: create OS shortcuts then index them in a JSON file
    ipcMain.handle("create-game-shortcut", async (_event, info: ShortcutInfo) => {
        console.log("[Shortcuts] Creating shortcut for:", info.gameName, "with ID:", info.gameId);
        // Try to obtain a game icon path (may return null)
        const iconPath = await getGameIcon(info.gameName);
        const result = await createGameShortcut(info);

        if (result.success) {
            // Store metadata in index for later listing/editing/deleting
            const entries = readShortcutsIndex();
            const id = `${Date.now()}-${Math.random().toString(36).slice(2,9)}`;
            // Build index entry including optional icon path
            const entry = {
                id,
                gameName: info.gameName,
                gameId: info.gameId,
                location: info.location || "desktop",
                paths: result.paths || (result.path ? [result.path] : []),
                icon: iconPath || null,
                createdAt: Date.now(),
            };
            entries.push(entry);
            writeShortcutsIndex(entries);
            return { ...result, id };
        }

        return result;
    });

    // List stored shortcuts
    ipcMain.handle("list-game-shortcuts", () => {
        return readShortcutsIndex();
    });

    // Delete a stored shortcut by id: remove files and index entry
    ipcMain.handle("delete-game-shortcut", async (_event, id: string) => {
        try {
            const entries = readShortcutsIndex();
            const idx = entries.findIndex((e: any) => e.id === id);
            if (idx === -1) return { success: false, error: "Not found" };
            const entry = entries[idx];

            // Attempt to remove files referenced in entry.paths
            if (Array.isArray(entry.paths)) {
                for (const p of entry.paths) {
                    try {
                        if (fs.existsSync(p)) fs.unlinkSync(p);
                    } catch (e) {
                        console.warn("[Shortcuts] Failed to remove file:", p, e);
                    }
                }
            }

            // Remove from index and persist
            entries.splice(idx, 1);
            writeShortcutsIndex(entries);
            return { success: true };
        } catch (e) {
            console.error("[Shortcuts] delete-game-shortcut error:", e);
            return { success: false, error: String(e) };
        }
    });

    // Edit a stored shortcut's name: recreate shortcuts with new name and update index
    ipcMain.handle("edit-game-shortcut", async (_event, id: string, newName: string) => {
        try {
            const entries = readShortcutsIndex();
            const idx = entries.findIndex((e: any) => e.id === id);
            if (idx === -1) return { success: false, error: "Not found" };
            const entry = entries[idx];

            // Create new shortcuts with the same gameId and location but new name
            const newResult = await createGameShortcut({ gameName: newName, gameId: entry.gameId, location: entry.location });
            if (!newResult.success) {
                return { success: false, error: newResult.error || "Failed to recreate shortcut" };
            }


            // Determine new paths and only delete old files that are NOT part of the new result
            const newPaths = newResult.paths || (newResult.path ? [newResult.path] : []);

            if (Array.isArray(entry.paths)) {
                for (const p of entry.paths) {
                    try {
                        // Skip deletion if this path is present in the newly created paths
                        if (newPaths.includes(p)) continue;
                        if (fs.existsSync(p)) fs.unlinkSync(p);
                    } catch (e) {
                        console.warn("[Shortcuts] Failed to remove old shortcut file:", p, e);
                    }
                }
            }

            // Update index entry
            entry.gameName = newName;
            entry.paths = newPaths;
            entry.updatedAt = Date.now();
            entries[idx] = entry;
            writeShortcutsIndex(entries);

            return { success: true, paths: entry.paths };
        } catch (e) {
            console.error("[Shortcuts] edit-game-shortcut error:", e);
            return { success: false, error: String(e) };
        }
    });

    ipcMain.handle("get-platform", () => {
        return process.platform;
    });

    ipcMain.handle("extract-game-id", (_event, url: string) => {
        return extractGameIdFromUrl(url);
    });

    // Read a file and return a data URL (useful for renderer to display local icons)
    ipcMain.handle("read-file-data-url", async (_event, filePath: string) => {
        try {
            if (!filePath || !fs.existsSync(filePath)) return null;
            const buf = fs.readFileSync(filePath);
            const ext = path.extname(filePath).toLowerCase().replace(".", "");
            // Basic mime-type mapping
            const mime = ext === "png" ? "image/png" : ext === "jpg" || ext === "jpeg" ? "image/jpeg" : ext === "ico" ? "image/x-icon" : "application/octet-stream";
            return `data:${mime};base64,${buf.toString("base64")}`;
        } catch (e) {
            console.error("[Shortcuts] read-file-data-url error:", e);
            return null;
        }
    });
}

export { extractGameIdFromUrl };
