const { app, BrowserWindow } = require("electron");
const windowStateKeeper = require("electron-window-state");
const updater = require("./updater");

const isDev = !app.isPackaged;

let mainWindow;

const createWindow = () => {
  setTimeout(updater, 3000);

  let winState = windowStateKeeper({
    defaultWidth: 900,
    defaultHeight: 700,
  });

  mainWindow = new BrowserWindow({
    x: winState.x,
    y: winState.y,
    width: winState.width,
    height: winState.height,
    minWidth: 800,
    minHeight: 600,
    opacity: 1,
    frame: false,
    titleBarStyle: "default",
    //backgroundColor: "#000",
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: __dirname + "/preload.js",
    },
  });

  // appMenu(mainWindow.webContents);

  mainWindow.loadFile(__dirname + "/renderer/index.html");

  winState.manage(mainWindow);

  isDev && mainWindow.webContents.openDevTools();

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
};

app.on("ready", createWindow);

app.on("browser-window-blur", () => {
  console.log("App blur");
});

app.on("browser-window-focus", () => {
  console.log("App focused");
});

app.on("before-quit", (e) => {
  //e.preventDefault();
  console.log("Preventing app from quitting");
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (mainWindow === null) createWindow();
});
