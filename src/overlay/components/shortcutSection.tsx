import { getTranslation, type Language } from "../i18n";

type ShortcutSectionProps = {
    language: Language;
};

export const ShortcutSection: React.FC<ShortcutSectionProps> = ({ language }) => {
    const t = getTranslation(language);
    
    return (
        <div className="relative border-2 border-gray-400 rounded-lg p-6 w-96 mx-auto mt-10 bg-white/0">
            <div className="absolute -top-3 left-1/5 px-3 text-[#babec4] font-semibold select-none bg-[#23272b]">
                {t.keyboardShortcuts}
            </div>

            <div className="mt-4 text-[#babec4]">
                <div className="flex justify-between font-mono text-sm mb-2">
                    <span>Ctrl+I</span>
                    <span>{t.openSidebar}</span>
                </div>
            </div>
        </div>
    );
};
