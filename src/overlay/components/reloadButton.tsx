import { useState } from "react";
import { Dialog } from "./dialog";
import { getTranslation, type Language } from "../i18n";

type ReloadButtonProps = {
    language: Language;
    accentColor?: string;
};

export const ReloadButton: React.FC<ReloadButtonProps> = ({ language, accentColor }) => {
    const [isOpen, setIsOpen] = useState(false);
    const t = getTranslation(language);

    // Default to GFN green if no accent color
    const buttonColor = accentColor || "#76b900";
    
    // Calculate hover color (slightly darker)
    const darkenColor = (hex: string) => {
        const num = parseInt(hex.replace("#", ""), 16);
        const r = Math.max(0, (num >> 16) - 25);
        const g = Math.max(0, ((num >> 8) & 0x00FF) - 25);
        const b = Math.max(0, (num & 0x0000FF) - 25);
        return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, "0")}`;
    };

    const handleConfirm = () => {
        setIsOpen(false);
        window.electronAPI.reloadGFN();
    };

    return (
        <div className="flex">
            <button
                onClick={() => setIsOpen(true)}
                style={{ 
                    backgroundColor: buttonColor,
                    transition: "background-color 0.2s"
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = darkenColor(buttonColor)}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = buttonColor}
                className="w-40 text-white text-lg font-semibold py-2 px-4 rounded shadow"
            >
                {t.reloadGFN}
            </button>

            <Dialog
                title={t.reloadDialogTitle}
                confirmText={t.dialogOk}
                cancelText={t.dialogCancel}
                setIsOpen={setIsOpen}
                isOpen={isOpen}
                handleConfirm={handleConfirm}
            ></Dialog>
        </div>
    );
};
