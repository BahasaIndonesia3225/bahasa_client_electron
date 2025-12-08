import { app, BrowserWindow, protocol, Menu } from 'electron';
import * as path from 'path';
import createProtocol from './createProtocol';

const isDevelopment = process.env.NODE_ENV === 'development';
let mainWindow: BrowserWindow;
protocol.registerSchemesAsPrivileged([
  {
    scheme: 'app',
    privileges: {
      secure: true,
      standard: true,
      supportFetchAPI: true,
      allowServiceWorkers: true,
    },
  },
]);

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 960,
    height: 720,
    // x: 300, y: 300,
    minWidth: 960,
    minHeight: 720,
    maxWidth: 1200,
    maxHeight: 900,
    icon: "public/image/client_icon.png",
    title: 'My Electron App',
    backgroundColor: '#ffffff',  //用于设置窗口的背景颜色
    fullscreen: false,  //指定窗口是否以全屏模式启动
    resizable: true,    //控制用户是否可以调整窗口大小
    movable: true,      //指定窗口是否可移动
    show: true,         //指定创建窗口后是否立即显示
    transparent: true,  //指定窗口是否支持透明度
    alwaysOnTop: false, //控制窗口是否始终保持在顶部
    frame: true,        //是否显示窗口的外部框架（包括标题栏和控制按钮）
    closable: true,     //指定用户是否可以窗口关闭
    minimizable: true,  //指定用户是否可以窗口最小化
    maximizable: true,  //指定用户是否可以窗口最大化
    skipTaskbar: false, //控制窗口是否在任务栏中隐藏
    //用于配置窗口的 Web 集成选项，例如启用 Node.js、预加载脚本等。
    webPreferences: {
      devTools: true,  //指定用户是否可开启控制台
      contextIsolation: true,  //启用上下文隔离
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  //隐藏窗口的菜单
  mainWindow.setMenu(null);

  if (isDevelopment) {
    mainWindow.loadURL('http://localhost:8888');
    // mainWindow.webContents.openDevTools();
  } else {
    createProtocol('app');
    mainWindow.loadURL('app://./index.html');
  }
}

//当 Electron 初始化完成并且应用程序准备好创建浏览器窗口时
app.on('ready', async () => {
  createWindow();
});

//当用户尝试退出应用程序时，通常是通过关闭所有窗口或者点击关闭按钮
app.on('before-quit', async () => {
  console.log('before-quit');
});

//所有应用程序窗口都被关闭时(通常用于在应用程序完全退出之前保留某些功能，在 macOS 下通常会保留菜单栏)
//platform: darwin 表示 macOS，win32 表示 Windows，linux 表示 linux
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

//在点击 Dock 图标（macOS）或者任务栏图标（Windows）时
app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
