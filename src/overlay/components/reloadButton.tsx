import { useState } from "react";
import { Dialog } from "./dialog";
import { getTranslation, type Language } from "../i18n";

type ReloadButtonProps = {
    language: Language;
};

export const ReloadButton: React.FC<ReloadButtonProps> = ({ language }) => {
    const [isOpen, setIsOpen] = useState(false);
    const t = getTranslation(language);

    const handleConfirm = () => {
        setIsOpen(false);
        window.electronAPI.reloadGFN();
    };

    return (
        <div className="flex">
            <button
                onClick={() => setIsOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 w-40 text-white text-lg font-semibold py-2 px-4 rounded shadow"
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
