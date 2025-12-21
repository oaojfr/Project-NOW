import React, { useState, useEffect } from "react";
import { getTranslation, type Language } from "../i18n";

type ShortcutLocation = "desktop" | "startmenu" | "both";

type GameShortcutSectionProps = {
    language: Language;
};

export const GameShortcutSection: React.FC<GameShortcutSectionProps> = ({ language }) => {
    const t = getTranslation(language);
    const [gameName, setGameName] = useState("");
    const [gameId, setGameId] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [statusMessage, setStatusMessage] = useState("");
    const [platform, setPlatform] = useState<string>("");
    const [shortcutLocation, setShortcutLocation] = useState<ShortcutLocation>("desktop");
    // List of created shortcuts (from main process index)
    const [shortcuts, setShortcuts] = useState<any[]>([]);
    // Map of shortcut id -> icon data URL
    const [icons, setIcons] = useState<Record<string, string | null>>({});
    // Editing state for inline rename
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editingName, setEditingName] = useState<string>("");

    useEffect(() => {
        window.electronAPI.getPlatform().then((p) => setPlatform(p));
        // Load existing shortcuts on mount
        loadShortcuts();
    }, []);

    const loadShortcuts = async () => {
        try {
            const list = await window.electronAPI.getGameShortcuts();
            const arr = Array.isArray(list) ? list : [];
            setShortcuts(arr);

            // Load icons for each shortcut that has an icon path
            const iconMap: Record<string, string | null> = {};
            await Promise.all(arr.map(async (s: any) => {
                if (s.icon) {
                    try {
                        // read file and convert to data URL via preload
                        const dataUrl = await window.electronAPI.readFileAsDataUrl(s.icon);
                        iconMap[s.id] = dataUrl;
                    } catch (e) {
                        // ignore icon load failures
                        iconMap[s.id] = null;
                    }
                } else {
                    iconMap[s.id] = null;
                }
            }));
            setIcons(iconMap);
        } catch (e) {
            console.warn("Failed to load shortcuts:", e);
            setShortcuts([]);
        }
    };

    const extractGameIdFromCurrentPage = async () => {
        const currentUrl = window.location.href;
        const extractedId = await window.electronAPI.extractGameId(currentUrl);
        if (extractedId) {
            setGameId(extractedId);
            setStatus("idle");
            setStatusMessage("");
        } else {
            setStatus("error");
            setStatusMessage(t.noGameIdFound || "No game ID found in current URL");
        }
    };

    const handleCreateShortcut = async () => {
        if (!gameName.trim() || !gameId.trim()) {
            setStatus("error");
            setStatusMessage(t.fillAllFields || "Please fill in all fields");
            return;
        }

        setStatus("loading");
        setStatusMessage(t.creatingShortcut || "Creating shortcut...");

        try {
            const result = await window.electronAPI.createGameShortcut({
                gameName: gameName.trim(),
                gameId: gameId.trim(),
                location: shortcutLocation,
            });

            if (result.success) {
                setStatus("success");
                const pathInfo = result.paths && result.paths.length > 1 
                    ? result.paths.join("\n") 
                    : result.path;
                setStatusMessage(t.shortcutCreated || `Shortcut created: ${pathInfo}`);
                // Refresh list of shortcuts
                loadShortcuts();
                // Clear fields after success
                setTimeout(() => {
                    setGameName("");
                    setGameId("");
                    setStatus("idle");
                    setStatusMessage("");
                }, 3000);
            } else {
                setStatus("error");
                setStatusMessage(result.error || t.shortcutError || "Error creating shortcut");
            }
        } catch (error) {
            setStatus("error");
            setStatusMessage(String(error));
        }
    };

    const handleDelete = async (id: string) => {
        // Delete shortcut via main and refresh
        try {
            const res = await window.electronAPI.deleteGameShortcut(id);
            if (res && res.success) {
                loadShortcuts();
            } else {
                console.warn("Failed to delete shortcut:", res?.error);
            }
        } catch (e) {
            console.warn("delete error:", e);
        }
    };

    const startEditing = (id: string, name: string) => {
        setEditingId(id);
        setEditingName(name);
    };

    const saveEdit = async (id: string) => {
        try {
            const res = await window.electronAPI.editGameShortcut(id, editingName.trim());
            if (res && res.success) {
                setEditingId(null);
                setEditingName("");
                loadShortcuts();
            } else {
                console.warn("Failed to edit shortcut:", res?.error);
            }
        } catch (e) {
            console.warn("edit error:", e);
        }
    };

    // Get platform-specific label for "Start Menu" / "Applications Menu"
    const getStartMenuLabel = () => {
        if (platform === "win32") {
            return t.locationStartMenu || "Start Menu";
        }
        return t.locationApplications || "Applications Menu";
    };

    return (
        <div className="relative border-2 border-gray-400 rounded-lg p-6 w-96 mx-auto mt-6 bg-white/0">
            <div className="absolute -top-3 left-1/5 px-3 text-[#babec4] font-semibold select-none bg-[#23272b]">
                {t.gameShortcuts || "Game Shortcuts"}
            </div>

            <div className="mt-4 text-[#babec4] space-y-4">
                {/* Game Name Input */}
                <div>
                    <label className="block text-sm mb-1">{t.gameName || "Game Name"}</label>
                    <input
                        type="text"
                        value={gameName}
                        onChange={(e) => setGameName(e.target.value)}
                        placeholder={t.gameNamePlaceholder || "e.g., Cyberpunk 2077"}
                        className="w-full px-3 py-2 bg-[#1a1d21] border border-gray-600 rounded text-[#babec4] text-sm focus:outline-none focus:border-[#76b900]"
                    />
                </div>

                {/* Game ID Input */}
                <div>
                    <label className="block text-sm mb-1">{t.gameId || "Game ID"}</label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={gameId}
                            onChange={(e) => setGameId(e.target.value)}
                            placeholder={t.gameIdPlaceholder || "e.g., dcff9c03-5971-4992-ab7d-0f655ef0bfe2"}
                            className="flex-1 px-3 py-2 bg-[#1a1d21] border border-gray-600 rounded text-[#babec4] text-sm focus:outline-none focus:border-[#76b900]"
                        />
                        <button
                            onClick={extractGameIdFromCurrentPage}
                            className="px-3 py-2 bg-[#1a1d21] border border-gray-600 rounded text-[#babec4] text-sm hover:bg-[#2a2f35] transition-colors"
                            title={t.extractFromUrl || "Extract from current URL"}
                        >
                            📋
                        </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                        {t.gameIdHelp || "Navigate to a game page and click 📋 to extract the ID"}
                    </p>
                </div>

                {/* Location Selector (Windows and Linux) */}
                {(platform === "linux" || platform === "win32") && (
                    <div>
                        <label className="block text-sm mb-1">{t.shortcutLocation || "Shortcut Location"}</label>
                        <select
                            value={shortcutLocation}
                            onChange={(e) => setShortcutLocation(e.target.value as ShortcutLocation)}
                            className="w-full px-3 py-2 bg-[#1a1d21] border border-gray-600 rounded text-[#babec4] text-sm focus:outline-none focus:border-[#76b900]"
                        >
                            <option value="desktop">{t.locationDesktop || "Desktop"}</option>
                            <option value="startmenu">{getStartMenuLabel()}</option>
                            <option value="both">{t.locationBoth || "Both"}</option>
                        </select>
                    </div>
                )}

                {/* Create Button */}
                <button
                    onClick={handleCreateShortcut}
                    disabled={status === "loading"}
                    className={`w-full py-2 rounded font-medium transition-colors ${
                        status === "loading"
                            ? "bg-gray-600 cursor-not-allowed"
                            : "bg-[#76b900] hover:bg-[#8cd000] text-black"
                    }`}
                >
                    {status === "loading" 
                        ? (t.creating || "Creating...") 
                        : (t.createShortcut || "Create Desktop Shortcut")}
                </button>

                {/* Status Message */}
                {statusMessage && (
                    <div
                        className={`text-sm p-2 rounded ${
                            status === "success"
                                ? "bg-green-900/50 text-green-300"
                                : status === "error"
                                ? "bg-red-900/50 text-red-300"
                                : "bg-gray-700/50 text-gray-300"
                        }`}
                    >
                        {statusMessage}
                    </div>
                )}
                {/* List of created shortcuts with edit/delete actions */}
                <div className="mt-4">
                    <div className="text-sm font-semibold mb-2">{t.gameShortcuts || "Game Shortcuts"}</div>
                    {shortcuts.length === 0 ? (
                        <p className="text-xs text-gray-500">{t.noShortcuts || "No shortcuts"}</p>
                    ) : (
                        shortcuts.map((s) => (
                            <div key={s.id} className="flex items-center justify-between bg-[#1a1d21] p-2 rounded mb-2">
                                <div className="flex-1">
                                    {editingId === s.id ? (
                                        <input
                                            className="w-full px-2 py-1 bg-[#121317] border border-gray-600 rounded text-sm text-[#babec4]"
                                            value={editingName}
                                            onChange={(e) => setEditingName(e.target.value)}
                                        />
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            {/* show icon if available, otherwise app logo protocol */}
                                            <img src={icons[s.id] || "geforce-resource://infinitylogo.png"} alt="icon" className="w-8 h-8 rounded" />
                                            <div className="font-medium">{s.gameName}</div>
                                        </div>
                                    )}
                                    <div className="text-xs text-gray-500">{s.gameId}</div>
                                </div>
                                <div className="ml-2 flex gap-2">
                                    {editingId === s.id ? (
                                        <>
                                            <button
                                                onClick={() => saveEdit(s.id)}
                                                className="px-2 py-1 bg-[#76b900] rounded text-black text-sm"
                                            >
                                                {t.dialogOk}
                                            </button>
                                            <button
                                                onClick={() => { setEditingId(null); setEditingName(""); }}
                                                className="px-2 py-1 bg-gray-600 rounded text-sm"
                                            >
                                                {t.dialogCancel}
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button
                                                onClick={() => startEditing(s.id, s.gameName)}
                                                className="px-2 py-1 bg-[#1a1d21] border border-gray-600 rounded text-sm hover:bg-[#2a2f35]"
                                            >
                                                {t.editShortcut || "Edit"}
                                            </button>
                                            <button
                                                onClick={() => handleDelete(s.id)}
                                                className="px-2 py-1 bg-red-700 rounded text-sm"
                                            >
                                                {t.deleteShortcut || "Delete"}
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};
