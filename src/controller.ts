import { ipcMain, IpcMainEvent } from "electron";
import { Rcon, RconOptions } from "rcon-client";

let root: Rcon | undefined = undefined;

export function register() {
  ipcMain.on("connect", connect);
  ipcMain.on("disconnect", disconnect);
}

async function connect(event: IpcMainEvent, options: RconOptions) {
  if (root) {
    if (root.authenticated) {
      event.reply("connection_already", root.config);
      return;
    }
  }

  try {
    root = await Rcon.connect(options);
  } catch (error) {
    event.reply("connection_error", error);
    return;
  }

  event.reply("connection_success", options);
}

function disconnect() {
  if (root) {
    root.end();
  }
}
