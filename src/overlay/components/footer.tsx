import {
    FaGithub,
    FaCloudDownloadAlt,
} from "react-icons/fa";
import { getTranslation, type Language } from "../i18n";

const githubUrl = "https://github.com/oaojfr/Project-NOW";
const updatesUrl = "https://github.com/oaojfr/Project-NOW/releases";

declare const __APP_VERSION__: string;

type FooterProps = {
    language: Language;
};

export const Footer: React.FC<FooterProps> = ({ language }) => {
    const t = getTranslation(language);
    
    return (
        <footer className="w-full bg-[#0c1015] text-gray-300 p-4 font-sans bottom-0 left-0">
            <div className="flex justify-evenly m-4">
                <a
                    onClick={() => window.electronAPI.openExternal(githubUrl)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center text-sm hover:text-white transition"
                >
                    <FaGithub className="text-4xl mb-1" />
                    <span>GitHub</span>
                </a>
                <a
                    onClick={() => window.electronAPI.openExternal(updatesUrl)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center text-sm hover:text-white transition"
                >
                    <FaCloudDownloadAlt className="text-4xl mb-1" />
                    <span className="flex flex-col items-center text-center whitespace-pre-line">
                        {t.checkForUpdates}
                    </span>
                </a>
            </div>

            <div className="text-sm text-gray-400 text-left mt-4">
                Version: {__APP_VERSION__ || "0.0.0"}
            </div>
        </footer>
    );
};

export default Footer;
