export type Language = "en" | "fr" | "pt" | "es" | "it" | "de";

export const languageOptions: { label: string; value: Language }[] = [
    { label: "English", value: "en" },
    { label: "Français", value: "fr" },
    { label: "Português", value: "pt" },
    { label: "Español", value: "es" },
    { label: "Italiano", value: "it" },
    { label: "Deutsch", value: "de" },
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
    checkingForUpdates: string;
    upToDate: string;
    updateAvailableText: string;
    updateError: string;
    available: string;

    // Color options
    colorGfnGreen: string;
    colorDefault: string;
    colorBlue: string;
    colorRed: string;
    colorYellow: string;
    colorPink: string;

    // FPS options
    ultimateOnly: string;

    // Game Shortcuts
    gameShortcuts: string;
    gameName: string;
    gameNamePlaceholder: string;
    gameId: string;
    gameIdPlaceholder: string;
    extractFromUrl: string;
    gameIdHelp: string;
    createShortcut: string;
    creating: string;
    creatingShortcut: string;
    shortcutCreated: string;
    shortcutError: string;
    fillAllFields: string;
    noGameIdFound: string;
    // Shortcut list UI
    noShortcuts: string;
    editShortcut: string;
    deleteShortcut: string;
    revealShortcut: string;
    // Loading screen
    launching: string;
    connecting: string;
    loadingPage: string;
    waitingButton: string;
    almostThere: string;
    starting: string;
    notFound: string;
    // Shortcut locations
    shortcutLocation: string;
    locationDesktop: string;
    locationStartMenu: string;
    locationApplications: string;
    locationBoth: string;
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
        checkingForUpdates: "Checking...",
        upToDate: "Up to date!",
        updateAvailableText: "Update",
        updateError: "Error",
        available: "available",

        // Color options
        colorGfnGreen: "GFN Green",
        colorDefault: "Default",
        colorBlue: "Blue",
        colorRed: "Red",
        colorYellow: "Yellow",
        colorPink: "Pink",

        // FPS options
        ultimateOnly: "Ultimate Only",

        // Game Shortcuts
        gameShortcuts: "Game Shortcuts",
        gameName: "Game Name",
        gameNamePlaceholder: "e.g., Cyberpunk 2077",
        gameId: "Game ID",
        gameIdPlaceholder: "e.g., dcff9c03-5971-4992-ab7d-0f655ef0bfe2",
        extractFromUrl: "Extract from current URL",
        gameIdHelp: "Navigate to a game page and click 📋 to extract the ID",
        createShortcut: "Create Desktop Shortcut",
        creating: "Creating...",
        creatingShortcut: "Creating shortcut...",
        shortcutCreated: "Shortcut created successfully!",
        shortcutError: "Error creating shortcut",
        fillAllFields: "Please fill in all fields",
        noGameIdFound: "No game ID found in current URL",
        // Shortcut list UI
        noShortcuts: "No shortcuts",
        editShortcut: "Edit",
        deleteShortcut: "Delete",
        revealShortcut: "Reveal on disk",
        // Linux shortcut locations
        shortcutLocation: "Shortcut Location",
        locationDesktop: "Desktop",
        locationStartMenu: "Start Menu",
        locationApplications: "Applications Menu",
        locationBoth: "Both",
        // Loading screen
        launching: "Launching game...",
        connecting: "Connecting to GeForce NOW...",
        loadingPage: "Loading game page...",
        waitingButton: "Waiting for Play button...",
        almostThere: "Almost there...",
        starting: "Starting game...",
        notFound: "Could not find Play button. Click manually.",
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
        checkingForUpdates: "Vérification...",
        upToDate: "À jour !",
        updateAvailableText: "Mise à jour",
        updateError: "Erreur",
        available: "disponible",

        // Color options
        colorGfnGreen: "Vert GFN",
        colorDefault: "Par défaut",
        colorBlue: "Bleu",
        colorRed: "Rouge",
        colorYellow: "Jaune",
        colorPink: "Rose",

        // FPS options
        ultimateOnly: "Ultimate uniquement",

        // Game Shortcuts
        gameShortcuts: "Raccourcis de jeux",
        gameName: "Nom du jeu",
        gameNamePlaceholder: "ex: Cyberpunk 2077",
        gameId: "ID du jeu",
        gameIdPlaceholder: "ex: dcff9c03-5971-4992-ab7d-0f655ef0bfe2",
        extractFromUrl: "Extraire de l'URL actuelle",
        gameIdHelp: "Naviguez vers une page de jeu et cliquez 📋 pour extraire l'ID",
        createShortcut: "Créer un raccourci bureau",
        creating: "Création...",
        creatingShortcut: "Création du raccourci...",
        shortcutCreated: "Raccourci créé avec succès !",
        shortcutError: "Erreur lors de la création du raccourci",
        fillAllFields: "Veuillez remplir tous les champs",
        noGameIdFound: "Aucun ID de jeu trouvé dans l'URL actuelle",
        // Linux shortcut locations
        // Shortcut list UI
        noShortcuts: "Aucun raccourci",
        editShortcut: "Modifier",
        deleteShortcut: "Supprimer",
        revealShortcut: "Afficher dans le dossier",
        shortcutLocation: "Emplacement du raccourci",
        locationDesktop: "Bureau",
        locationStartMenu: "Menu Démarrer",
        locationApplications: "Menu des applications",
        locationBoth: "Les deux",
        // Loading screen
        launching: "Lancement du jeu...",
        connecting: "Connexion à GeForce NOW...",
        loadingPage: "Chargement de la page...",
        waitingButton: "Recherche du bouton Jouer...",
        almostThere: "Presque prêt...",
        starting: "Démarrage du jeu...",
        notFound: "Bouton Jouer introuvable. Cliquez manuellement.",
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
        checkingForUpdates: "Verificando...",
        upToDate: "Atualizado!",
        updateAvailableText: "Atualização",
        updateError: "Erro",
        available: "disponível",

        // Color options
        colorGfnGreen: "Verde GFN",
        colorDefault: "Padrão",
        colorBlue: "Azul",
        colorRed: "Vermelho",
        colorYellow: "Amarelo",
        colorPink: "Rosa",

        // FPS options
        ultimateOnly: "Apenas Ultimate",

        // Game Shortcuts
        gameShortcuts: "Atalhos de Jogos",
        gameName: "Nome do Jogo",
        gameNamePlaceholder: "ex: Cyberpunk 2077",
        gameId: "ID do Jogo",
        gameIdPlaceholder: "ex: dcff9c03-5971-4992-ab7d-0f655ef0bfe2",
        extractFromUrl: "Extrair da URL atual",
        gameIdHelp: "Navegue até uma página de jogo e clique 📋 para extrair o ID",
        createShortcut: "Criar Atalho na Área de Trabalho",
        creating: "Criando...",
        creatingShortcut: "Criando atalho...",
        shortcutCreated: "Atalho criado com sucesso!",
        shortcutError: "Erro ao criar atalho",
        fillAllFields: "Por favor, preencha todos os campos",
        noGameIdFound: "Nenhum ID de jogo encontrado na URL atual",
        // Linux shortcut locations
        // Shortcut list UI
        noShortcuts: "Nenhum atalho",
        editShortcut: "Editar",
        deleteShortcut: "Excluir",
        revealShortcut: "Mostrar no disco",
        shortcutLocation: "Local do Atalho",
        locationDesktop: "Área de Trabalho",
        locationStartMenu: "Menu Iniciar",
        locationApplications: "Menu de Aplicativos",
        locationBoth: "Ambos",
        // Loading screen
        launching: "Iniciando jogo...",
        connecting: "Conectando ao GeForce NOW...",
        loadingPage: "Carregando página do jogo...",
        waitingButton: "Aguardando botão Jogar...",
        almostThere: "Quase lá...",
        starting: "Iniciando jogo...",
        notFound: "Botão Jogar não encontrado. Clique manualmente.",
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
        checkingForUpdates: "Verificando...",
        upToDate: "¡Actualizado!",
        updateAvailableText: "Actualización",
        updateError: "Error",
        available: "disponible",

        // Color options
        colorGfnGreen: "Verde GFN",
        colorDefault: "Predeterminado",
        colorBlue: "Azul",
        colorRed: "Rojo",
        colorYellow: "Amarillo",
        colorPink: "Rosa",

        // FPS options
        ultimateOnly: "Solo Ultimate",

        // Game Shortcuts
        gameShortcuts: "Accesos Directos de Juegos",
        gameName: "Nombre del Juego",
        gameNamePlaceholder: "ej: Cyberpunk 2077",
        gameId: "ID del Juego",
        gameIdPlaceholder: "ej: dcff9c03-5971-4992-ab7d-0f655ef0bfe2",
        extractFromUrl: "Extraer de la URL actual",
        gameIdHelp: "Navega a una página de juego y haz clic en 📋 para extraer el ID",
        createShortcut: "Crear Acceso Directo en el Escritorio",
        creating: "Creando...",
        creatingShortcut: "Creando acceso directo...",
        shortcutCreated: "¡Acceso directo creado con éxito!",
        shortcutError: "Error al crear el acceso directo",
        fillAllFields: "Por favor, rellena todos los campos",
        noGameIdFound: "No se encontró ID de juego en la URL actual",
        // Linux shortcut locations
        // Shortcut list UI
        noShortcuts: "Sin accesos directos",
        editShortcut: "Editar",
        deleteShortcut: "Eliminar",
        revealShortcut: "Mostrar en disco",
        shortcutLocation: "Ubicación del Acceso Directo",
        locationDesktop: "Escritorio",
        locationStartMenu: "Menú Inicio",
        locationApplications: "Menú de Aplicaciones",
        locationBoth: "Ambos",
        // Loading screen
        launching: "Iniciando juego...",
        connecting: "Conectando a GeForce NOW...",
        loadingPage: "Cargando página del juego...",
        waitingButton: "Esperando botón Jugar...",
        almostThere: "Casi listo...",
        starting: "Iniciando juego...",
        notFound: "No se encontró el botón Jugar. Haz clic manualmente.",
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
        checkingForUpdates: "Controllo...",
        upToDate: "Aggiornato!",
        updateAvailableText: "Aggiornamento",
        updateError: "Errore",
        available: "disponibile",

        // Color options
        colorGfnGreen: "Verde GFN",
        colorDefault: "Predefinito",
        colorBlue: "Blu",
        colorRed: "Rosso",
        colorYellow: "Giallo",
        colorPink: "Rosa",

        // FPS options
        ultimateOnly: "Solo Ultimate",

        // Game Shortcuts
        gameShortcuts: "Scorciatoie Giochi",
        gameName: "Nome del Gioco",
        gameNamePlaceholder: "es: Cyberpunk 2077",
        gameId: "ID del Gioco",
        gameIdPlaceholder: "es: dcff9c03-5971-4992-ab7d-0f655ef0bfe2",
        extractFromUrl: "Estrai dall'URL attuale",
        gameIdHelp: "Naviga su una pagina di gioco e clicca 📋 per estrarre l'ID",
        createShortcut: "Crea Collegamento sul Desktop",
        creating: "Creazione...",
        creatingShortcut: "Creazione collegamento...",
        shortcutCreated: "Collegamento creato con successo!",
        shortcutError: "Errore nella creazione del collegamento",
        fillAllFields: "Per favore, compila tutti i campi",
        noGameIdFound: "Nessun ID gioco trovato nell'URL attuale",
        // Linux shortcut locations
        // Shortcut list UI
        noShortcuts: "Nessun collegamento",
        editShortcut: "Modifica",
        deleteShortcut: "Elimina",
        revealShortcut: "Mostra nella cartella",
        shortcutLocation: "Posizione del Collegamento",
        locationDesktop: "Desktop",
        locationStartMenu: "Menu Start",
        locationApplications: "Menu Applicazioni",
        locationBoth: "Entrambi",
        // Loading screen
        launching: "Avvio del gioco...",
        connecting: "Connessione a GeForce NOW...",
        loadingPage: "Caricamento pagina...",
        waitingButton: "In attesa del pulsante Gioca...",
        almostThere: "Quasi pronto...",
        starting: "Avvio del gioco...",
        notFound: "Pulsante Gioca non trovato. Clicca manualmente.",
    },

    de: {
        // Header
        statusConnected: "Status: Mit GFN verbunden 🎮",

        // Settings Section
        settings: "Einstellungen",
        accentColor: "Akzentfarbe",
        accentColorTooltip: "Legt eine benutzerdefinierte\nAkzentfarbe für GeForce NOW fest.",
        reloadToApply: "Laden Sie GFN neu, um die Änderungen zu übernehmen.",
        userAgent: "User Agent",
        userAgentTooltip: "Ändert den User Agent – verwenden\nSie diese Option, wenn Sie Probleme beim\nStarten oder Spielen von Spielen haben.",
        restartToApply: "Starten Sie die Anwendung neu, um die Änderungen zu übernehmen.",
        resolution: "Auflösung",
        resolutionTooltip: "Wählen Sie die Ziel-Monitorauflösung\naus, die für das Streaming verwendet\nwerden soll.",
        fps: "FPS",
        fpsTooltip: "Wählen Sie die gewünschte Frame rate aus.",
        discordRichPresence: "Discord Rich Presence",
        discordRichPresenceTooltip: "Aktiviert Discord Rich Presence, wodurch Ihr aktuelles Spiel in Ihrem Discord-Status angezeigt wird.",
        gameReadyNotification: "Spielbereitschaftsmeldung",
        gameReadyNotificationTooltip: "Aktiviert eine Benachrichtigung, wenn das\nSpiel bereit ist.",
        autofocus: "Autofokus",
        autofocusTooltip: "Aktiviert den Autofokus auf das\nFenster, wenn das Spiel bereit ist\noder wenn Sie aufgrund von Inaktivität\ngekickt werden (die \"Benachrichtigung bei Inaktivität\" muss aktiviert sein).",
        automute: "Automute",
        automuteTooltip: "Das Spiel wird automatisch stummgeschaltet, wenn das Fenster nicht im Vordergrund ist.",
        inactivityNotification: "Benachrichtigung bei Inaktivität",
        inactivityNotificationTooltip: "Aktiviert eine Benachrichtigung, wenn Sie aufgrund von Inaktivität kurz davor stehen, aus dem Spiel geworfen zu werden.",
        language: "Sprache",
        languageTooltip: "Wählen Sie Ihre bevorzugte Sprache aus.",

        // Buttons
        reloadGFN: "GFN neu laden",
        defaultSettings: "Standardeinstellungen",

        // Dialogs
        reloadDialogTitle: "Diese Aktion wird dich aus dem laufenden Spiel werfen.",
        defaultSettingsDialogTitle: "Standardeinstellungen laden?",
        dialogOk: "OK",
        dialogCancel: "Abbrechen",
        dialogYes: "Ja",
        dialogNo: "Nein",

        // Shortcuts
        keyboardShortcuts: "Keyboard Shortcuts",
        openSidebar: "Sidebar öffnen",

        // Footer
        checkForUpdates: "Auf neues Update prüfen",
        checkingForUpdates: "Wird geprüft...",
        upToDate: "Up to date!",
        updateAvailableText: "Update",
        updateError: "Error",
        available: "verfügbar",

        // Color options
        colorGfnGreen: "GFN Grün",
        colorDefault: "Standard",
        colorBlue: "Blau",
        colorRed: "Rot",
        colorYellow: "Gelb",
        colorPink: "Pink",

        // FPS options
        ultimateOnly: "Nur Ultimate",

        // Game Shortcuts
        gameShortcuts: "Spiel-Verknüpfung",
        gameName: "Name des Spiels",
        gameNamePlaceholder: "e.g., Cyberpunk 2077",
        gameId: "Spiel-ID",
        gameIdPlaceholder: "e.g., dcff9c03-5971-4992-ab7d-0f655ef0bfe2",
        extractFromUrl: "Auszug aus der aktuellen URL",
        gameIdHelp: "Navigieren Sie zu einer Spiele-Seite und klicken Sie auf 📋, um die ID zu extrahieren.",
        createShortcut: "Desktop-Verknüpfung erstellen",
        creating: "Erstellen...",
        creatingShortcut: "Verknüpfung erstellen...",
        shortcutCreated: "Shortcut created successfully!",
        shortcutError: "Fehler beim Erstellen der Verknüpfung",
        fillAllFields: "Bitte füllen Sie alle Felder aus.",
        noGameIdFound: "Keine Spiel-ID in der aktuellen URL gefunden",
        // Shortcut list UI
        noShortcuts: "Keine Abkürzungen",
        editShortcut: "Bearbeiten",
        deleteShortcut: "Löschen",
        revealShortcut: "Auf Festplatte anzeigen",
        // Linux shortcut locations
        shortcutLocation: "Verknüpfung Speicherort",
        locationDesktop: "Desktop",
        locationStartMenu: "Start Menu",
        locationApplications: "Applications Menu",
        locationBoth: "Both",
        // Loading screen
        launching: "Spiel wird gestartet...",
        connecting: "Verbindung zu GeForce NOW wird hergestellt...",
        loadingPage: "Spiele-Seite wird geladen...",
        waitingButton: "Warten auf Play-Button...",
        almostThere: "Fast fertig...",
        starting: "Spiel wird gestartet...",
        notFound: "Der Play-Button wurde nicht gefunden. Klicken Sie manuell darauf.",
    },
};

export const getTranslation = (lang: Language): TranslationKeys => {
    return translations[lang] || translations.en;
};

export default translations;
