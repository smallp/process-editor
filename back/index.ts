import { app, BrowserWindow } from "electron";
function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  });
  win.loadURL("http://127.0.0.1:3000");
    // win.loadFile("index.html");
}
app.whenReady().then(() => {
  createWindow();
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
});
