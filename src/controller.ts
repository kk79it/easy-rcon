import { ipcMain, IpcMainInvokeEvent } from "electron";
import { Rcon, RconOptions } from "rcon-client";

export function register() {
  ipcMain.handle("start", start);
  ipcMain.handle("stop", stop);
  ipcMain.handle("send", send);
}

let rcon: Rcon | undefined;

async function start(
  _event: IpcMainInvokeEvent,
  options: RconOptions
): Promise<boolean> {
  rcon = await Rcon.connect({
    host: options.host,
    port: options.port,
    password: options.password,
  }).catch(() => {
    return undefined;
  });

  return rcon ? rcon.authenticated : false;
}

async function stop(): Promise<boolean> {
  if (rcon) {
    rcon.end();
    return !rcon.authenticated;
  }
  return true;
}

async function send(
  _event: IpcMainInvokeEvent,
  command: string
): Promise<Response> {
  const flag = false;
  if (!rcon || !rcon.authenticated)
    return { type: "error", message: "Connection closed" };
  const res = await rcon.send(command).catch((reason) => {
    return `An error has occurred: ${reason}`;
  });
  return { type: flag ? "error" : "success", message: res };
}

interface Response {
  type: string;
  message: string;
}
