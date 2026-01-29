// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("nodeAPI", {
  toBase64: (data) => Buffer.from(data).toString("base64"),
});

contextBridge.exposeInMainWorld("api", {
  fetch: (req) => ipcRenderer.invoke("api:fetch", req),
});

contextBridge.exposeInMainWorld("electron", {
  store: {
    on(name, cb) {
      const listener = (_event, data) => cb(data);
      ipcRenderer.on(`electron-store-${name}`, listener);
      return () =>
        ipcRenderer.removeListener(`electron-store-${name}`, listener);
    },

    off(name, cb) {
      const listener = (_event, data) => cb(data);
      ipcRenderer.removeListener(`electron-store-${name}`, listener);
    },

    get(key) {
      return ipcRenderer.sendSync("electron-store-get", key);
    },

    set(property, val) {
      ipcRenderer.send("electron-store-set", property, val);
    },
    // Other method you want to add like has(), reset(), etc.
  },
  // Any other methods you want to expose in the window object.
  // ...
});
