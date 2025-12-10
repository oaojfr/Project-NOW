import { ipcMain, app } from "electron";
import path from "path";
import fs from "fs";
import os from "os";

interface ShortcutInfo {
    gameName: string;
    gameId: string;
}

// Get the application executable path based on the platform
function getAppExecutablePath(): string {
    if (app.isPackaged) {
        // For packaged app
        if (process.platform === "win32") {
            return process.execPath;
        } else if (process.platform === "darwin") {
            // macOS: get the .app bundle path
            return process.execPath.replace(/\/Contents\/MacOS\/.*$/, "");
        } else {
            // Linux
            return process.execPath;
        }
    } else {
        // Development mode
        return process.execPath;
    }
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

function sanitizeFilename(name: string): string {
    // Remove characters that are invalid in filenames
    return name.replace(/[<>:"/\\|?*]/g, "").replace(/\s+/g, " ").trim();
}

// Create a Windows .lnk shortcut using PowerShell with temp script file
async function createWindowsShortcut(info: ShortcutInfo): Promise<{ success: boolean; path?: string; error?: string }> {
    const desktopPath = getDesktopPath();
    const shortcutPath = path.join(desktopPath, `${sanitizeFilename(info.gameName)}.lnk`);
    const execPath = getAppExecutablePath();
    const iconPath = app.isPackaged 
        ? path.join(path.dirname(execPath), "resources", "assets", "resources", "infinitylogo.ico")
        : path.join(__dirname, "..", "..", "assets", "resources", "infinitylogo.ico");

    // Use a temp file to avoid encoding/escaping issues with special characters
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
        
        // Write script to temp file with UTF-8 BOM for proper encoding
        const BOM = "\uFEFF";
        fs.writeFileSync(tempScriptPath, BOM + psScript, { encoding: "utf8" });
        
        // Execute the script file
        exec(`powershell -ExecutionPolicy Bypass -File "${tempScriptPath}"`, (error: Error | null) => {
            // Clean up temp file
            try { fs.unlinkSync(tempScriptPath); } catch {}
            
            if (error) {
                resolve({ success: false, error: error.message });
            } else {
                resolve({ success: true, path: shortcutPath });
            }
        });
    });
}

// Create a Linux .desktop file
async function createLinuxShortcut(info: ShortcutInfo): Promise<{ success: boolean; path?: string; error?: string }> {
    const desktopPath = getDesktopPath();
    const shortcutPath = path.join(desktopPath, `${sanitizeFilename(info.gameName)}.desktop`);
    const execPath = getAppExecutablePath();
    
    let iconPath = "";
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

    const desktopEntry = `[Desktop Entry]
Name=${info.gameName}
Comment=Launch ${info.gameName} on GeForce NOW via Project NOW
Exec="${execPath}" --game-id=${info.gameId}
Icon=${iconPath}
Terminal=false
Type=Application
Categories=Game;
StartupNotify=true
`;

    try {
        fs.writeFileSync(shortcutPath, desktopEntry, { mode: 0o755 });
        fs.chmodSync(shortcutPath, 0o755);
        
        return { success: true, path: shortcutPath };
    } catch (error) {
        return { success: false, error: (error as Error).message };
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

async function createGameShortcut(info: ShortcutInfo): Promise<{ success: boolean; path?: string; error?: string }> {
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
        return urlObj.searchParams.get("game-id");
    } catch {
        return null;
    }
}

export function registerShortcutHandlers() {
    ipcMain.handle("create-game-shortcut", async (_event, info: ShortcutInfo) => {
        console.log("[Shortcuts] Creating shortcut for:", info.gameName, "with ID:", info.gameId);
        return createGameShortcut(info);
    });

    ipcMain.handle("get-platform", () => {
        return process.platform;
    });

    ipcMain.handle("extract-game-id", (_event, url: string) => {
        return extractGameIdFromUrl(url);
    });
}

export { extractGameIdFromUrl };
