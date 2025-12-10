import React, { useState } from "react";
import type { Config } from "../../shared/types";
import type { Language } from "../i18n";
import { getTranslation } from "../i18n";

import { Header } from "./header";
import { Footer } from "./footer";
import { SettingsSection } from "./settingsSection";
import { ShortcutSection } from "./shortcutSection";
import { GameShortcutSection } from "./gameShortcutSection";

type TabType = "settings" | "shortcuts";

interface SidebarProps {
    config: Config;
    setConfig: React.Dispatch<React.SetStateAction<Config>>;
    visible: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ config, setConfig, visible }) => {
    const currentLang = (config.language || "en") as Language;
    const t = getTranslation(currentLang);
    const [activeTab, setActiveTab] = useState<TabType>("settings");
    
    return (
        <div
            className={`fixed top-0 right-0 bottom-0 w-[450px] bg-[#23272b] text-[#babec4] z-[99999] font-sans
        transform transition-transform duration-300 ease-in-out flex flex-col
        ${visible ? "translate-x-0" : "translate-x-full"}
      `}
            style={{ pointerEvents: visible ? "auto" : "none" }}
        >
            <Header language={currentLang} />
            
            {/* Tabs */}
            <div className="flex border-b border-gray-700 px-4">
                <button
                    onClick={() => setActiveTab("settings")}
                    className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                        activeTab === "settings"
                            ? "text-[#76b900] border-b-2 border-[#76b900]"
                            : "text-gray-400 hover:text-gray-200"
                    }`}
                >
                    ⚙️ {t.settings}
                </button>
                <button
                    onClick={() => setActiveTab("shortcuts")}
                    className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                        activeTab === "shortcuts"
                            ? "text-[#76b900] border-b-2 border-[#76b900]"
                            : "text-gray-400 hover:text-gray-200"
                    }`}
                >
                    🎮 {t.gameShortcuts}
                </button>
            </div>

            <div className="flex-1 overflow-y-auto px-8 py-4 min-h-0 scrollbar">
                {activeTab === "settings" ? (
                    <>
                        <SettingsSection config={config} setConfig={setConfig} />
                        <hr className="mx-8 my-4 border-gray-700" />
                        <ShortcutSection language={currentLang} />
                    </>
                ) : (
                    <GameShortcutSection language={currentLang} />
                )}
            </div>
            <Footer language={currentLang} />
        </div>
    );
};

export default Sidebar;
