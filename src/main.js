const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("node:path");

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // registerRoute({
  //   id: "main",
  //   browserWindow: mainWindow,
  //   htmlFile: path.join(__dirname, MAIN_WINDOW_WEBPACK_ENTRY),
  // });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

import Store from "electron-store";

const store = new Store();

// IPC listener
ipcMain.on("electron-store-get", async (event, val) => {
  event.returnValue = store.get(val);
});

ipcMain.on("electron-store-set", async (event, key, val) => {
  store.set(key, val);
  event.sender.send("electron-store-update", store.get("application-state"));
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

async function apiFetchJson(url, opts = {}) {
  const { body } = opts;
  return await fetch(url, {
    method: opts.method ?? "GET",
    headers: { "content-type": "application/json", ...(opts.headers ?? {}) },
    ...(body ? { body } : {}),
  });
}

ipcMain.handle("api:fetch", async (event, req) => {
  // Validate input. Never allow arbitrary file/network access without checks.
  const allowedBases = [
    "https://api-m.sandbox.paypal.com",
    "https://api-m.paypal.com",
  ];
  const u = new URL(req.url);

  if (!allowedBases.includes(`${u.protocol}//${u.host}`)) {
    throw new Error("URL not allowed");
  }

  const headers = { ...(req.headers ?? {}) };
  return apiFetchJson(req.url, {
    method: req.method,
    headers,
    body: req.body,
  }).then((r) => r.json());
});
