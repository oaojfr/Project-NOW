export type Language = "en" | "fr" | "pt" | "es" | "it";

export const languageOptions: { label: string; value: Language }[] = [
    { label: "English", value: "en" },
    { label: "Français", value: "fr" },
    { label: "Português", value: "pt" },
    { label: "Español", value: "es" },
    { label: "Italiano", value: "it" },
];

export type TranslationKeys = {
    // Header
    statusConnected: string;

    // Settings Section
    settings: string;
    accentColor: string;
    accentColorTooltip: string;
    reloadToApply: string;
    userAgent: string;
    userAgentTooltip: string;
    restartToApply: string;
    resolution: string;
    resolutionTooltip: string;
    fps: string;
    fpsTooltip: string;
    discordRichPresence: string;
    discordRichPresenceTooltip: string;
    gameReadyNotification: string;
    gameReadyNotificationTooltip: string;
    autofocus: string;
    autofocusTooltip: string;
    automute: string;
    automuteTooltip: string;
    inactivityNotification: string;
    inactivityNotificationTooltip: string;
    language: string;
    languageTooltip: string;

    // Buttons
    reloadGFN: string;
    defaultSettings: string;

    // Dialogs
    reloadDialogTitle: string;
    defaultSettingsDialogTitle: string;
    dialogOk: string;
    dialogCancel: string;
    dialogYes: string;
    dialogNo: string;

    // Shortcuts
    keyboardShortcuts: string;
    openSidebar: string;

    // Footer
    checkForUpdates: string;

    // Color options
    colorDefault: string;
    colorBlue: string;
    colorRed: string;
    colorYellow: string;
    colorPink: string;

    // FPS options
    ultimateOnly: string;
};

const translations: Record<Language, TranslationKeys> = {
    en: {
        // Header
        statusConnected: "Status: Connected to GFN 🎮",

        // Settings Section
        settings: "Settings",
        accentColor: "Accent Color",
        accentColorTooltip: "Sets a custom accent color\nfor GeForce NOW.",
        reloadToApply: "Reload GFN to apply changes",
        userAgent: "User Agent",
        userAgentTooltip: "Changes the User Agent — use this\nif you experience issues\nlaunching or playing games.",
        restartToApply: "Restart application to apply changes",
        resolution: "Resolution",
        resolutionTooltip: "Select the target monitor resolution\nused for streaming.",
        fps: "FPS",
        fpsTooltip: "Select the target frame rate.",
        discordRichPresence: "Discord Rich Presence",
        discordRichPresenceTooltip: "Enables Discord Rich Presence, which displays\nyour current game in your Discord status.",
        gameReadyNotification: "Game Ready Notification",
        gameReadyNotificationTooltip: "Enables a notification when the gaming rig is\nready.",
        autofocus: "Autofocus",
        autofocusTooltip: "Enables autofocus on the window\nwhen the gaming rig is ready\nor when you're about to be kicked\ndue to inactivity (Inactivity Notification\nmust be enabled).",
        automute: "Automute",
        automuteTooltip: "Automatically mutes the game\nwhen the window is not focused.",
        inactivityNotification: "Inactivity Notification",
        inactivityNotificationTooltip: "Enables a notification when you're about to be\nkicked due to inactivity.",
        language: "Language",
        languageTooltip: "Select your preferred language.",

        // Buttons
        reloadGFN: "Reload GFN",
        defaultSettings: "Default Settings",

        // Dialogs
        reloadDialogTitle: "This action will kick you out of the running game.",
        defaultSettingsDialogTitle: "Load default settings?",
        dialogOk: "OK",
        dialogCancel: "Cancel",
        dialogYes: "Yes",
        dialogNo: "No",

        // Shortcuts
        keyboardShortcuts: "Keyboard Shortcuts",
        openSidebar: "Open Sidebar",

        // Footer
        checkForUpdates: "Check for\nupdates",

        // Color options
        colorDefault: "Default",
        colorBlue: "Blue",
        colorRed: "Red",
        colorYellow: "Yellow",
        colorPink: "Pink",

        // FPS options
        ultimateOnly: "Ultimate Only",
    },

    fr: {
        // Header
        statusConnected: "Statut : Connecté à GFN 🎮",

        // Settings Section
        settings: "Paramètres",
        accentColor: "Couleur d'accent",
        accentColorTooltip: "Définit une couleur d'accent personnalisée\npour GeForce NOW.",
        reloadToApply: "Recharger GFN pour appliquer",
        userAgent: "User Agent",
        userAgentTooltip: "Change le User Agent — utilisez ceci\nsi vous rencontrez des problèmes\npour lancer ou jouer à des jeux.",
        restartToApply: "Redémarrer l'application pour appliquer",
        resolution: "Résolution",
        resolutionTooltip: "Sélectionnez la résolution cible\nutilisée pour le streaming.",
        fps: "FPS",
        fpsTooltip: "Sélectionnez la fréquence d'images cible.",
        discordRichPresence: "Discord Rich Presence",
        discordRichPresenceTooltip: "Active Discord Rich Presence, qui affiche\nvotre jeu actuel dans votre statut Discord.",
        gameReadyNotification: "Notification Jeu Prêt",
        gameReadyNotificationTooltip: "Active une notification lorsque le serveur de jeu\nest prêt.",
        autofocus: "Focus automatique",
        autofocusTooltip: "Active le focus automatique sur la fenêtre\nlorsque le serveur de jeu est prêt\nou lorsque vous allez être déconnecté\npour inactivité (Notification d'inactivité\ndoit être activée).",
        automute: "Sourdine automatique",
        automuteTooltip: "Coupe automatiquement le son du jeu\nlorsque la fenêtre n'est pas au premier plan.",
        inactivityNotification: "Notification d'inactivité",
        inactivityNotificationTooltip: "Active une notification lorsque vous allez être\ndéconnecté pour inactivité.",
        language: "Langue",
        languageTooltip: "Sélectionnez votre langue préférée.",

        // Buttons
        reloadGFN: "Recharger GFN",
        defaultSettings: "Paramètres par défaut",

        // Dialogs
        reloadDialogTitle: "Cette action vous déconnectera du jeu en cours.",
        defaultSettingsDialogTitle: "Charger les paramètres par défaut ?",
        dialogOk: "OK",
        dialogCancel: "Annuler",
        dialogYes: "Oui",
        dialogNo: "Non",

        // Shortcuts
        keyboardShortcuts: "Raccourcis clavier",
        openSidebar: "Ouvrir la barre latérale",

        // Footer
        checkForUpdates: "Vérifier les\nmises à jour",

        // Color options
        colorDefault: "Par défaut",
        colorBlue: "Bleu",
        colorRed: "Rouge",
        colorYellow: "Jaune",
        colorPink: "Rose",

        // FPS options
        ultimateOnly: "Ultimate uniquement",
    },

    pt: {
        // Header
        statusConnected: "Status: Conectado ao GFN 🎮",

        // Settings Section
        settings: "Configurações",
        accentColor: "Cor de destaque",
        accentColorTooltip: "Define uma cor de destaque personalizada\npara o GeForce NOW.",
        reloadToApply: "Recarregar GFN para aplicar",
        userAgent: "User Agent",
        userAgentTooltip: "Altera o User Agent — use isto\nse você tiver problemas\npara iniciar ou jogar jogos.",
        restartToApply: "Reinicie o aplicativo para aplicar",
        resolution: "Resolução",
        resolutionTooltip: "Selecione a resolução do monitor alvo\nusada para streaming.",
        fps: "FPS",
        fpsTooltip: "Selecione a taxa de quadros alvo.",
        discordRichPresence: "Discord Rich Presence",
        discordRichPresenceTooltip: "Ativa o Discord Rich Presence, que exibe\nseu jogo atual no seu status do Discord.",
        gameReadyNotification: "Notificação de Jogo Pronto",
        gameReadyNotificationTooltip: "Ativa uma notificação quando o servidor de jogo\nestiver pronto.",
        autofocus: "Foco automático",
        autofocusTooltip: "Ativa o foco automático na janela\nquando o servidor de jogo estiver pronto\nou quando você estiver prestes a ser desconectado\npor inatividade (Notificação de inatividade\ndeve estar ativada).",
        automute: "Silenciar automaticamente",
        automuteTooltip: "Silencia automaticamente o jogo\nquando a janela não está em foco.",
        inactivityNotification: "Notificação de Inatividade",
        inactivityNotificationTooltip: "Ativa uma notificação quando você estiver prestes\na ser desconectado por inatividade.",
        language: "Idioma",
        languageTooltip: "Selecione seu idioma preferido.",

        // Buttons
        reloadGFN: "Recarregar GFN",
        defaultSettings: "Configurações Padrão",

        // Dialogs
        reloadDialogTitle: "Esta ação irá desconectá-lo do jogo em execução.",
        defaultSettingsDialogTitle: "Carregar configurações padrão?",
        dialogOk: "OK",
        dialogCancel: "Cancelar",
        dialogYes: "Sim",
        dialogNo: "Não",

        // Shortcuts
        keyboardShortcuts: "Atalhos de Teclado",
        openSidebar: "Abrir Barra Lateral",

        // Footer
        checkForUpdates: "Verificar\natualizações",

        // Color options
        colorDefault: "Padrão",
        colorBlue: "Azul",
        colorRed: "Vermelho",
        colorYellow: "Amarelo",
        colorPink: "Rosa",

        // FPS options
        ultimateOnly: "Apenas Ultimate",
    },

    es: {
        // Header
        statusConnected: "Estado: Conectado a GFN 🎮",

        // Settings Section
        settings: "Configuración",
        accentColor: "Color de acento",
        accentColorTooltip: "Establece un color de acento personalizado\npara GeForce NOW.",
        reloadToApply: "Recargar GFN para aplicar",
        userAgent: "User Agent",
        userAgentTooltip: "Cambia el User Agent — usa esto\nsi tienes problemas\npara iniciar o jugar juegos.",
        restartToApply: "Reinicia la aplicación para aplicar",
        resolution: "Resolución",
        resolutionTooltip: "Selecciona la resolución del monitor objetivo\nusada para streaming.",
        fps: "FPS",
        fpsTooltip: "Selecciona la tasa de fotogramas objetivo.",
        discordRichPresence: "Discord Rich Presence",
        discordRichPresenceTooltip: "Activa Discord Rich Presence, que muestra\ntu juego actual en tu estado de Discord.",
        gameReadyNotification: "Notificación de Juego Listo",
        gameReadyNotificationTooltip: "Activa una notificación cuando el servidor de juego\nesté listo.",
        autofocus: "Enfoque automático",
        autofocusTooltip: "Activa el enfoque automático en la ventana\ncuando el servidor de juego esté listo\no cuando estés a punto de ser desconectado\npor inactividad (Notificación de inactividad\ndebe estar activada).",
        automute: "Silencio automático",
        automuteTooltip: "Silencia automáticamente el juego\ncuando la ventana no está enfocada.",
        inactivityNotification: "Notificación de Inactividad",
        inactivityNotificationTooltip: "Activa una notificación cuando estés a punto\nde ser desconectado por inactividad.",
        language: "Idioma",
        languageTooltip: "Selecciona tu idioma preferido.",

        // Buttons
        reloadGFN: "Recargar GFN",
        defaultSettings: "Config. Predeterminada",

        // Dialogs
        reloadDialogTitle: "Esta acción te desconectará del juego en ejecución.",
        defaultSettingsDialogTitle: "¿Cargar configuración predeterminada?",
        dialogOk: "OK",
        dialogCancel: "Cancelar",
        dialogYes: "Sí",
        dialogNo: "No",

        // Shortcuts
        keyboardShortcuts: "Atajos de Teclado",
        openSidebar: "Abrir Barra Lateral",

        // Footer
        checkForUpdates: "Buscar\nactualizaciones",

        // Color options
        colorDefault: "Predeterminado",
        colorBlue: "Azul",
        colorRed: "Rojo",
        colorYellow: "Amarillo",
        colorPink: "Rosa",

        // FPS options
        ultimateOnly: "Solo Ultimate",
    },

    it: {
        // Header
        statusConnected: "Stato: Connesso a GFN 🎮",

        // Settings Section
        settings: "Impostazioni",
        accentColor: "Colore di accento",
        accentColorTooltip: "Imposta un colore di accento personalizzato\nper GeForce NOW.",
        reloadToApply: "Ricarica GFN per applicare",
        userAgent: "User Agent",
        userAgentTooltip: "Cambia lo User Agent — usa questo\nse hai problemi\nad avviare o giocare ai giochi.",
        restartToApply: "Riavvia l'applicazione per applicare",
        resolution: "Risoluzione",
        resolutionTooltip: "Seleziona la risoluzione del monitor target\nusata per lo streaming.",
        fps: "FPS",
        fpsTooltip: "Seleziona il frame rate target.",
        discordRichPresence: "Discord Rich Presence",
        discordRichPresenceTooltip: "Attiva Discord Rich Presence, che mostra\nil tuo gioco attuale nel tuo stato Discord.",
        gameReadyNotification: "Notifica Gioco Pronto",
        gameReadyNotificationTooltip: "Attiva una notifica quando il server di gioco\nè pronto.",
        autofocus: "Focus automatico",
        autofocusTooltip: "Attiva il focus automatico sulla finestra\nquando il server di gioco è pronto\no quando stai per essere disconnesso\nper inattività (Notifica di inattività\ndeve essere attivata).",
        automute: "Silenzia automatico",
        automuteTooltip: "Silenzia automaticamente il gioco\nquando la finestra non è in primo piano.",
        inactivityNotification: "Notifica di Inattività",
        inactivityNotificationTooltip: "Attiva una notifica quando stai per essere\ndisconnesso per inattività.",
        language: "Lingua",
        languageTooltip: "Seleziona la tua lingua preferita.",

        // Buttons
        reloadGFN: "Ricarica GFN",
        defaultSettings: "Impostazioni Predefinite",

        // Dialogs
        reloadDialogTitle: "Questa azione ti disconnetterà dal gioco in esecuzione.",
        defaultSettingsDialogTitle: "Caricare le impostazioni predefinite?",
        dialogOk: "OK",
        dialogCancel: "Annulla",
        dialogYes: "Sì",
        dialogNo: "No",

        // Shortcuts
        keyboardShortcuts: "Scorciatoie da Tastiera",
        openSidebar: "Apri Barra Laterale",

        // Footer
        checkForUpdates: "Controlla\naggiornamenti",

        // Color options
        colorDefault: "Predefinito",
        colorBlue: "Blu",
        colorRed: "Rosso",
        colorYellow: "Giallo",
        colorPink: "Rosa",

        // FPS options
        ultimateOnly: "Solo Ultimate",
    },
};

export const getTranslation = (lang: Language): TranslationKeys => {
    return translations[lang] || translations.en;
};

export default translations;
