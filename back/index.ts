import { app, BrowserWindow } from "electron"
import { join } from "path"
function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false, // is default value after Electron v5
      contextIsolation: true, // protect against prototype pollution
      preload: join(__dirname, "preload.js"),
    },
  })
  if (process.env.NODE_ENV == "dev") {
    win.loadURL("http://127.0.0.1:3000")
    win.webContents.openDevTools()
  } else {
    win.loadFile("dist/index.html")
  }
}
app.whenReady().then(() => {
  createWindow()
  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})
