import { registerUpdaterHandlers } from "./updater";
import { registerUserSettingsHandlers } from "./userSettings";
import { registerSidebarIpcHandlers } from "./sidebar";
import { registerShortcutHandlers } from "./shortcuts";

import type { AppContext } from "../types/context";

export function registerIpcHandlers(deps: AppContext) {
    registerUpdaterHandlers(deps);
    registerUserSettingsHandlers(deps);
    registerSidebarIpcHandlers(deps.mainWindow);
    registerShortcutHandlers();
}

module.exports = { registerIpcHandlers };
