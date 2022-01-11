"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
function createWindow() {
    var win = new electron_1.BrowserWindow({
        width: 800,
        height: 600,
    });
    if (process.env.NODE_ENV == "dev") {
        win.loadURL("http://127.0.0.1:3000");
        win.webContents.openDevTools();
    }
    else {
        win.loadFile("dist/index.html");
    }
}
electron_1.app.whenReady().then(function () {
    createWindow();
    electron_1.app.on("activate", function () {
        if (electron_1.BrowserWindow.getAllWindows().length === 0)
            createWindow();
    });
});
