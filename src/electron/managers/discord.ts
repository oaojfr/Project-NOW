import DiscordRPC, { Client as DiscordRPCClient } from "@t0msk/discord-rpc";

export type RpcClient = {
    login: (options: { clientId: string }) => Promise<void>;
    setActivity: (activity: {
        state: string;
        largeImageKey: string;
        largeImageText: string;
        startTimestamp: Date;
    }) => void;
};

export const clientId = "1445408764399194283";
let rpcClient: DiscordRPCClient | undefined;
let startTimestamp: Date;
let rpcReady = false;

export function initRpcClient(start: Date, initialTitle: string) {
    startTimestamp = start;
    try {
        rpcClient = new DiscordRPC.Client({ transport: "ipc" });

        if (!rpcClient) return;

        rpcReady = false;
        rpcClient.on("ready", () => {
            rpcReady = true;
            console.log("Discord RPC connected");
            updateActivity(initialTitle);
        });

        rpcClient.login({ clientId }).catch((err) => {
            console.error("RPC login error:", err);
            rpcClient = undefined;
            rpcReady = false;
        });
    } catch (err) {
        console.error("RPC init error:", err);
    }
}

export function updateActivity(gameTitle: string | null) {
    if (!rpcClient || !rpcReady) return;

    try {
        const maybePromise = (rpcClient as any).setActivity({
            state: gameTitle ? `Playing ${gameTitle}` : "Idling...",
            largeImageKey: "infinity_logo",
            largeImageText: "Project NOW",
            startTimestamp,
        });
        if (maybePromise && typeof maybePromise.then === "function") {
            (maybePromise as Promise<any>).catch((err) =>
                console.error("Failed to set activity (async):", err)
            );
        }
    } catch (err) {
        console.error("Failed to set activity:", err);
    }
}
