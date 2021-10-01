import { ipcMain } from "electron";

export class controller {
  constructor() {
    ipcMain.on("start", this.start);
  }

  start() {}
}
