"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
function createWindow() {
    var win = new electron_1.BrowserWindow({
        width: 800,
        height: 600,
    });
    win.loadURL("http://127.0.0.1:3000");
}
electron_1.app.whenReady().then(function () {
    createWindow();
    electron_1.app.on('activate', function () {
        if (electron_1.BrowserWindow.getAllWindows().length === 0)
            createWindow();
    });
});
