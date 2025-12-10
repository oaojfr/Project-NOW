import React from "react";
import type { Config } from "../../shared/types";
import { ReloadButton } from "./reloadButton";
import { DefaultsButton } from "./defaultsButton";
import { FaInfoCircle } from "react-icons/fa";
import { getTranslation, languageOptions, type Language } from "../i18n";

type SettingsSectionProps = {
    config: Config;
    setConfig: React.Dispatch<React.SetStateAction<Config>>;
};

const colorOptions = [
    { label: "GFN Green", value: "#76b900", className: "bg-[#76b900] text-white" },
    { label: "Blue", value: "#0066cc", className: "bg-[#0066cc] text-white" },
    { label: "Red", value: "#cc0016", className: "bg-[#cc0016] text-white" },
    { label: "Yellow", value: "#fbf203", className: "bg-[#fbf203] text-black" },
    { label: "Pink", value: "#e412e1", className: "bg-[#e412e1] text-white" },
];

const userAgentOptions = [
    { label: "Project NOW", value: "" },
    {
        label: "Chrome",
        value: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36",
    },
    {
        label: "Firefox",
        value: "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:116.0) Gecko/20100101 Firefox/116.0",
    },
];

// New options
const resolutionOptions = [
    { label: "1366 x 768", value: "1366x768" },
    { label: "1920 x 1080", value: "1920x1080" },
    { label: "2560 x 1440 (16:9) - QHD", value: "2560x1440" },
    { label: "3440 x 1440 (21:9) - UW QHD", value: "3440x1440" },
    { label: "3456 x 2160 (16:10) - 3.5K", value: "3456x2160" },
    { label: "3840 x 1080 (32:9) - UW FHD", value: "3840x1080" },
    { label: "3840 x 1600 (24:10) - UW QHD", value: "3840x1600" },
    { label: "3840 x 2160 (16:9) - 4K", value: "3840x2160" },
    { label: "5120 x 1440 (32:9) - SUW QHD", value: "5120x1440" },
    { label: "5120 x 2160 (21:9) - UW 5K", value: "5120x2160" },
    { label: "5120 x 2880 (16:9) - 5K", value: "5120x2880" },
];

const fpsOptions = [
    { label: "30 FPS", value: 30 },
    { label: "60 FPS", value: 60 },
    { label: "120 FPS - Ultimate Only", value: 120 },
    { label: "240 FPS - Ultimate Only", value: 240 },
    { label: "360 FPS - Ultimate Only", value: 360 }
];

export const SettingsSection: React.FC<SettingsSectionProps> = ({
    config,
    setConfig,
}) => {
    const currentLang = (config.language || "en") as Language;
    const t = getTranslation(currentLang);

    const getColorLabel = (value: string) => {
        const colorLabels: Record<string, keyof typeof t> = {
            "#76b900": "colorGfnGreen",
            "#0066cc": "colorBlue",
            "#cc0016": "colorRed",
            "#fbf203": "colorYellow",
            "#e412e1": "colorPink",
        };
        const key = colorLabels[value];
        return key ? t[key] : value;
    };

    const getFpsLabel = (value: number) => {
        if (value >= 120) {
            return `${value} FPS - ${t.ultimateOnly}`;
        }
        return `${value} FPS`;
    };

    const getColorClass = (value: string) => {
        return (
            colorOptions.find((opt) => opt.value === value)?.className ||
            "text-white"
        );
    };

    console.log("config in SettingsSection:", config);

    const getColor = () => {
        return colorOptions.find((o) => o.value === config.accentColor)
            ? config.accentColor
            : "#23272b";
    };

    const getUserAgent = () => {
        return userAgentOptions.find((o) => o.value === config.userAgent)
            ? config.userAgent
            : "";
    };

    const getResolutionValue = () => {
        const current = `${config.monitorWidth}x${config.monitorHeight}`;
        return resolutionOptions.some((r) => r.value === current)
            ? current
            : resolutionOptions[0].value;
    };

    const getFpsValue = () => {
        return fpsOptions.some((f) => f.value === config.framesPerSecond)
            ? config.framesPerSecond
            : fpsOptions[0].value;
    };

    const handleToggle = (key: keyof Config) => {
        const updatedConfig = { ...config, [key]: !config[key] };
        setConfig(updatedConfig);
    };

    const handleAccentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const updated = { ...config, accentColor: e.target.value };
        setConfig(updated);
    };

    const handleUserAgentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const updated = { ...config, userAgent: e.target.value };
        setConfig(updated);
    };

    const handleResolutionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const [wStr, hStr] = e.target.value.split("x");
        const w = Number(wStr);
        const h = Number(hStr);

        if (!Number.isNaN(w) && !Number.isNaN(h)) {
            const nextConfig: Config = {
                ...config,
                monitorWidth: w,
                monitorHeight: h,
            };
            setConfig(nextConfig);
        }
    };

    const handleFpsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const fps = Number(e.target.value);
        if (!Number.isNaN(fps)) {
            setConfig({ ...config, framesPerSecond: fps });
        }
    };

    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const updated = { ...config, language: e.target.value };
        setConfig(updated);
    };

    /*const onToggle = (key: keyof Config, value: boolean) => {
        const update = { [key]: value };
        window.electronAPI.saveConfig(update);
        setConfig((prev) => ({ ...prev, ...update }));
    };*/

    return (
        <section className="p-4 text-gray-200 max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-4">{t.settings}</h2>
            <div className="space-y-4">
                <label className="flex items-center justify-between">
                    <span>
                        {t.language}
                        <div className="relative group inline-block">
                            <FaInfoCircle className="ml-2 cursor-pointer peer" />
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 ml-8 mb-2 px-3 py-1 rounded-md bg-gray-500 text-white text-base opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                                {t.languageTooltip}
                            </div>
                        </div>
                    </span>
                    <select
                        value={currentLang}
                        onChange={handleLanguageChange}
                        className="rounded p-2 bg-[#23272b] border border-gray-600 ml-4 text-white"
                    >
                        {languageOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </label>
                <label className="flex items-center justify-between">
                    <span>
                        {t.accentColor}
                        <div className="relative group inline-block">
                            <FaInfoCircle className="ml-2 cursor-pointer peer" />
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 ml-8 mb-2 px-3 py-1 rounded-md bg-gray-500 text-white text-base opacity-0 group-hover:opacity-100 transition-opacity whitespace-pre-line z-10 pointer-events-none">
                                {t.accentColorTooltip}
                            </div>
                        </div>
                        <br />
                        <small>{t.reloadToApply}</small>
                    </span>
                    <select
                        value={getColor()}
                        onChange={handleAccentChange}
                        className={`rounded p-2 bg-[${getColor()}] border border-gray-600 ml-4 ${getColorClass(config.accentColor)}`}
                    >
                        {colorOptions.map((option) => (
                            <option
                                key={option.value}
                                value={option.value}
                                className={option.className}
                            >
                                {getColorLabel(option.value)}
                            </option>
                        ))}
                    </select>
                </label>
                <label className="flex items-center justify-between">
                    <span>
                        {t.userAgent}
                        <div className="relative group inline-block">
                            <FaInfoCircle className="ml-2 cursor-pointer peer" />
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 ml-8 mb-2 px-3 py-1 rounded-md bg-gray-500 text-white text-base opacity-0 group-hover:opacity-100 transition-opacity whitespace-pre-line z-10 pointer-events-none">
                                {t.userAgentTooltip}
                            </div>
                        </div>
                        <br />
                        <small>{t.restartToApply}</small>
                    </span>
                    <select
                        value={getUserAgent()}
                        onChange={handleUserAgentChange}
                        className="rounded p-2 bg-[#23272b] border border-gray-600 ml-4 text-white"
                    >
                        {userAgentOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </label>
                <label className="flex items-center justify-between">
                    <span>
                        {t.resolution}
                        <div className="relative group inline-block">
                            <FaInfoCircle className="ml-2 cursor-pointer peer" />
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 ml-8 mb-2 px-3 py-1 rounded-md bg-gray-500 text-white text-base opacity-0 group-hover:opacity-100 transition-opacity whitespace-pre-line z-10 pointer-events-none">
                                {t.resolutionTooltip}
                            </div>
                        </div>
                    </span>
                    <select
                        value={getResolutionValue()}
                        onChange={handleResolutionChange}
                        className="rounded p-2 bg-[#23272b] border border-gray-600 ml-4 text-white"
                    >
                        {resolutionOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </label>
                <label className="flex items-center justify-between">
                    <span>
                        {t.fps}
                        <div className="relative group inline-block">
                            <FaInfoCircle className="ml-2 cursor-pointer peer" />
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 ml-8 mb-2 px-3 py-1 rounded-md bg-gray-500 text-white text-base opacity-0 group-hover:opacity-100 transition-opacity whitespace-pre-line z-10 pointer-events-none">
                                {t.fpsTooltip}
                            </div>
                        </div>
                    </span>
                    <select
                        value={getFpsValue()}
                        onChange={handleFpsChange}
                        className="rounded p-2 bg-[#23272b] border border-gray-600 ml-4 text-white"
                    >
                        {fpsOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {getFpsLabel(option.value)}
                            </option>
                        ))}
                    </select>
                </label>

                <label className="flex items-center justify-between">
                    <span>
                        {t.discordRichPresence}
                        <div className="relative group inline-block">
                            <FaInfoCircle className="ml-2 cursor-pointer peer" />
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 ml-8 mb-2 px-3 py-1 rounded-md bg-gray-500 text-white text-base opacity-0 group-hover:opacity-100 transition-opacity whitespace-pre-line z-10 pointer-events-none">
                                {t.discordRichPresenceTooltip}
                            </div>
                        </div>
                    </span>
                    <input
                        type="checkbox"
                        checked={config.rpcEnabled}
                        onChange={() => handleToggle("rpcEnabled")}
                        className="toggle toggle-primary"
                        style={{ "--accent-color": config.accentColor } as React.CSSProperties}
                    />
                </label>

                <label className="flex items-center justify-between">
                    <span>
                        {t.gameReadyNotification}
                        <div className="relative group inline-block">
                            <FaInfoCircle className="ml-2 cursor-pointer peer" />
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 ml-8 mb-2 px-3 py-1 rounded-md bg-gray-500 text-white text-base opacity-0 group-hover:opacity-100 transition-opacity whitespace-pre-line z-10 pointer-events-none">
                                {t.gameReadyNotificationTooltip}
                            </div>
                        </div>
                    </span>
                    <input
                        type="checkbox"
                        checked={config.notify}
                        onChange={() => handleToggle("notify")}
                        className="toggle toggle-primary"
                        style={{ "--accent-color": config.accentColor } as React.CSSProperties}
                    />
                </label>

                <label className="flex items-center justify-between">
                    <span>
                        {t.autofocus}
                        <div className="relative group inline-block">
                            <FaInfoCircle className="ml-2 cursor-pointer peer" />
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 ml-8 mb-2 px-3 py-1 rounded-md bg-gray-500 text-white text-base opacity-0 group-hover:opacity-100 transition-opacity whitespace-pre-line z-10 pointer-events-none">
                                {t.autofocusTooltip}
                            </div>
                        </div>
                    </span>
                    <input
                        type="checkbox"
                        checked={config.autofocus}
                        onChange={() => handleToggle("autofocus")}
                        className="toggle toggle-primary"
                        style={{ "--accent-color": config.accentColor } as React.CSSProperties}
                    />
                </label>

                <label className="flex items-center justify-between">
                    <span>
                        {t.automute}
                        <div className="relative group inline-block">
                            <FaInfoCircle className="ml-2 cursor-pointer peer" />
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 ml-8 mb-2 px-3 py-1 rounded-md bg-gray-500 text-white text-base opacity-0 group-hover:opacity-100 transition-opacity whitespace-pre-line z-10 pointer-events-none">
                                {t.automuteTooltip}
                            </div>
                        </div>
                    </span>
                    <input
                        type="checkbox"
                        checked={config.automute}
                        onChange={() => handleToggle("automute")}
                        className="toggle toggle-primary"
                        style={{ "--accent-color": config.accentColor } as React.CSSProperties}
                    />
                </label>

                <label className="flex items-center justify-between">
                    <span>
                        {t.inactivityNotification}
                        <div className="relative group inline-block">
                            <FaInfoCircle className="ml-2 cursor-pointer peer" />
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 ml-8 mb-2 px-3 py-1 rounded-md bg-gray-500 text-white text-base opacity-0 group-hover:opacity-100 transition-opacity whitespace-pre-line z-10 pointer-events-none">
                                {t.inactivityNotificationTooltip}
                            </div>
                        </div>
                    </span>
                    <input
                        type="checkbox"
                        checked={config.inactivityNotification}
                        onChange={() => handleToggle("inactivityNotification")}
                        className="toggle toggle-primary"
                        style={{ "--accent-color": config.accentColor } as React.CSSProperties}
                    />
                </label>
            </div>
            <div className="flex justify-evenly w-full mt-10 mb-2">
                <ReloadButton language={currentLang} accentColor={config.accentColor} />
                <DefaultsButton setConfig={setConfig} language={currentLang} />
            </div>
        </section>
    );
};

export default SettingsSection;
