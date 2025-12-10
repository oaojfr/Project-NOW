import React, { useState, useEffect } from "react";
import { getTranslation, type Language } from "../i18n";

type LinuxShortcutLocation = "desktop" | "applications" | "both";

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
    const [linuxLocation, setLinuxLocation] = useState<LinuxShortcutLocation>("desktop");

    useEffect(() => {
        window.electronAPI.getPlatform().then((p) => setPlatform(p));
    }, []);

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
                ...(platform === "linux" && { linuxLocation }),
            });

            if (result.success) {
                setStatus("success");
                const pathInfo = result.paths && result.paths.length > 1 
                    ? result.paths.join("\n") 
                    : result.path;
                setStatusMessage(t.shortcutCreated || `Shortcut created: ${pathInfo}`);
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

                {/* Linux Location Selector */}
                {platform === "linux" && (
                    <div>
                        <label className="block text-sm mb-1">{t.shortcutLocation || "Shortcut Location"}</label>
                        <select
                            value={linuxLocation}
                            onChange={(e) => setLinuxLocation(e.target.value as LinuxShortcutLocation)}
                            className="w-full px-3 py-2 bg-[#1a1d21] border border-gray-600 rounded text-[#babec4] text-sm focus:outline-none focus:border-[#76b900]"
                        >
                            <option value="desktop">{t.locationDesktop || "Desktop"}</option>
                            <option value="applications">{t.locationApplications || "Applications Menu"}</option>
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
            </div>
        </div>
    );
};
