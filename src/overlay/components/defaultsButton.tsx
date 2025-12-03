import { useState } from "react";

import { Dialog } from "./dialog";
import type { Config } from "../../shared/types";
import { defaultConfig } from "../../shared/types";
import { getTranslation, type Language } from "../i18n";

type DefaultsButtonProps = {
    setConfig: React.Dispatch<React.SetStateAction<Config>>;
    language: Language;
};

export const DefaultsButton: React.FC<DefaultsButtonProps> = ({
    setConfig,
    language,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const t = getTranslation(language);

    const handleConfirm = () => {
        setIsOpen(false);
        setConfig(defaultConfig);
    };

    return (
        <div className="flex">
            <button
                onClick={() => setIsOpen(true)}
                className="bg-gray-600 hover:bg-gray-700 w-48 text-white text-lg font-semibold py-2 px-4 rounded shadow"
            >
                {t.defaultSettings}
            </button>

            <Dialog
                title={t.defaultSettingsDialogTitle}
                confirmText={t.dialogYes}
                cancelText={t.dialogNo}
                setIsOpen={setIsOpen}
                isOpen={isOpen}
                handleConfirm={handleConfirm}
            >
                <small>{t.restartToApply}</small>
            </Dialog>
        </div>
    );
};
