export const defaultConfig: Config = {
    userAgent: "",
    autofocus: false,
    automute: false,
    notify: true,
    rpcEnabled: true,
    informed: false,
    accentColor: "",
    inactivityNotification: false,
    monitorWidth: 1920,
    monitorHeight: 1080,
    framesPerSecond: 60,
    language: "en"
};

export interface Config {
    userAgent: string;
    autofocus: boolean;
    automute: boolean;
    notify: boolean;
    rpcEnabled: boolean;
    informed: boolean;
    accentColor: string;
    inactivityNotification: boolean;
    monitorWidth: number;
    monitorHeight: number;
    framesPerSecond: number;
    language: string;
}
