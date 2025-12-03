import React from "react";
import type { Config } from "../../shared/types";
import type { Language } from "../i18n";

import { Header } from "./header";
import { Footer } from "./footer";
import { SettingsSection } from "./settingsSection";
import { ShortcutSection } from "./shortcutSection";

interface SidebarProps {
    config: Config;
    setConfig: React.Dispatch<React.SetStateAction<Config>>;
    visible: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ config, setConfig, visible }) => {
    const currentLang = (config.language || "en") as Language;
    
    return (
        <div
            className={`fixed top-0 right-0 bottom-0 w-[450px] bg-[#23272b] text-[#babec4] z-[99999] font-sans
        transform transition-transform duration-300 ease-in-out flex flex-col
        ${visible ? "translate-x-0" : "translate-x-full"}
      `}
            style={{ pointerEvents: visible ? "auto" : "none" }}
        >
            <Header language={currentLang} />
            <div className="flex-1 overflow-y-auto px-8 py-4 min-h-0 scrollbar">
                <SettingsSection config={config} setConfig={setConfig} />
                <hr className="mx-8 my-4 border-gray-700" />
                <ShortcutSection language={currentLang} />
            </div>
            <Footer language={currentLang} />
        </div>
    );
};

export default Sidebar;
