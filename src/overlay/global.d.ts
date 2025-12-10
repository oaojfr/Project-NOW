import type { Config } from "../shared/types";

interface ShortcutResult {
    success: boolean;
    path?: string;
    paths?: string[];
    error?: string;
}

type LinuxShortcutLocation = "desktop" | "applications" | "both";

interface UpdateCheckResult {
    updateAvailable: boolean;
    currentVersion: string;
    latestVersion: string;
    releaseUrl: string;
    releaseName: string;
    releaseNotes: string;
    error?: string;
}

declare global {
    interface Window {
        electronAPI: {
            onSidebarToggle: (callback: () => void) => void;
            openExternal: (url: string) => void;
            saveConfig: (config: Partial<Config>) => void;
            getCurrentConfig: () => Promise<Config>;
            onConfigLoaded: (callback: (config: Config) => void) => void;
            getTailwindCss: () => string;
            reloadGFN: () => void;
            // Game shortcut APIs
            createGameShortcut: (info: { gameName: string; gameId: string; linuxLocation?: LinuxShortcutLocation }) => Promise<ShortcutResult>;
            getPlatform: () => Promise<string>;
            extractGameId: (url: string) => Promise<string | null>;
            // Update APIs
            checkForUpdates: () => Promise<UpdateCheckResult>;
            getAppVersion: () => Promise<string>;
            openReleasesPage: () => void;
            onGitHubUpdateAvailable: (callback: (event: unknown, result: UpdateCheckResult) => void) => void;
        };
    }
}
