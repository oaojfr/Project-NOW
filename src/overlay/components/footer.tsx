import React, { useState, useEffect } from "react";
import {
    FaGithub,
    FaCloudDownloadAlt,
    FaCheckCircle,
    FaExclamationCircle,
    FaSpinner,
} from "react-icons/fa";
import { getTranslation, type Language } from "../i18n";

const githubUrl = "https://github.com/oaojfr/Project-NOW";

declare const __APP_VERSION__: string;

type UpdateStatus = "idle" | "checking" | "up-to-date" | "update-available" | "error";

interface UpdateInfo {
    latestVersion: string;
    releaseUrl: string;
}

type FooterProps = {
    language: Language;
};

export const Footer: React.FC<FooterProps> = ({ language }) => {
    const t = getTranslation(language);
    const [updateStatus, setUpdateStatus] = useState<UpdateStatus>("idle");
    const [updateInfo, setUpdateInfo] = useState<UpdateInfo | null>(null);
    const [appVersion, setAppVersion] = useState(__APP_VERSION__ || "0.0.0");

    useEffect(() => {
        // Get actual version from main process
        window.electronAPI.getAppVersion().then(setAppVersion);

        // Listen for update notifications from startup check
        window.electronAPI.onGitHubUpdateAvailable((_event, result) => {
            if (result.updateAvailable) {
                setUpdateStatus("update-available");
                setUpdateInfo({
                    latestVersion: result.latestVersion,
                    releaseUrl: result.releaseUrl,
                });
            }
        });
    }, []);

    const handleCheckForUpdates = async () => {
        setUpdateStatus("checking");
        
        try {
            const result = await window.electronAPI.checkForUpdates();
            
            if (result.error) {
                setUpdateStatus("error");
                return;
            }

            if (result.updateAvailable) {
                setUpdateStatus("update-available");
                setUpdateInfo({
                    latestVersion: result.latestVersion,
                    releaseUrl: result.releaseUrl,
                });
            } else {
                setUpdateStatus("up-to-date");
                // Reset to idle after 3 seconds
                setTimeout(() => setUpdateStatus("idle"), 3000);
            }
        } catch (error) {
            console.error("Failed to check for updates:", error);
            setUpdateStatus("error");
            setTimeout(() => setUpdateStatus("idle"), 3000);
        }
    };

    const handleDownloadUpdate = () => {
        if (updateInfo?.releaseUrl) {
            window.electronAPI.openExternal(updateInfo.releaseUrl);
        }
    };

    const getUpdateIcon = () => {
        switch (updateStatus) {
            case "checking":
                return <FaSpinner className="text-4xl mb-1 animate-spin" />;
            case "up-to-date":
                return <FaCheckCircle className="text-4xl mb-1 text-green-500" />;
            case "update-available":
                return <FaExclamationCircle className="text-4xl mb-1 text-yellow-500" />;
            case "error":
                return <FaExclamationCircle className="text-4xl mb-1 text-red-500" />;
            default:
                return <FaCloudDownloadAlt className="text-4xl mb-1" />;
        }
    };

    const getUpdateText = () => {
        switch (updateStatus) {
            case "checking":
                return t.checkingForUpdates || "Checking...";
            case "up-to-date":
                return t.upToDate || "Up to date!";
            case "update-available":
                return `${t.updateAvailableText || "Update"}: ${updateInfo?.latestVersion}`;
            case "error":
                return t.updateError || "Error";
            default:
                return t.checkForUpdates;
        }
    };
    
    return (
        <footer className="w-full bg-[#0c1015] text-gray-300 p-4 font-sans bottom-0 left-0">
            <div className="flex justify-evenly m-4">
                <a
                    onClick={() => window.electronAPI.openExternal(githubUrl)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center text-sm hover:text-white transition cursor-pointer"
                >
                    <FaGithub className="text-4xl mb-1" />
                    <span>GitHub</span>
                </a>
                <a
                    onClick={updateStatus === "update-available" ? handleDownloadUpdate : handleCheckForUpdates}
                    className={`flex flex-col items-center text-sm transition cursor-pointer ${
                        updateStatus === "update-available" 
                            ? "text-yellow-400 hover:text-yellow-300" 
                            : "hover:text-white"
                    }`}
                >
                    {getUpdateIcon()}
                    <span className="flex flex-col items-center text-center whitespace-pre-line">
                        {getUpdateText()}
                    </span>
                </a>
            </div>

            <div className="text-sm text-gray-400 text-left mt-4">
                Version: {appVersion}
                {updateStatus === "update-available" && updateInfo && (
                    <span className="text-yellow-400 ml-2">
                        → {updateInfo.latestVersion} {t.available || "available"}
                    </span>
                )}
            </div>
        </footer>
    );
};

export default Footer;
