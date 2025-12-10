//app模块控制着应用程序的事件生命周期
//BrowserWindow模块创建和管理 app 的窗口
import { app, BrowserWindow, ipcMain, protocol, shell } from 'electron';
import https from 'https';
const fs = require("fs");
const os = require("os");
import createProtocol from './createProtocol';
import * as path from 'path';

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

let mainWindow: BrowserWindow;
const isDevelopment = process.env.NODE_ENV === 'development';
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 960,
    height: 720,
    minWidth: 960,
    minHeight: 720,
    // maxWidth: 1200,
    // maxHeight: 900,
    // x: 300,
    // y: 300,
    icon: "public/image/client_icon.png",
    title: 'My Electron App',
    transparent: false,  //指定窗口是否支持透明度
    backgroundColor: '#00000000',  //用于设置窗口的背景颜色
    fullscreen: false,  //指定窗口是否以全屏模式启动
    resizable: true,    //控制用户是否可以调整窗口大小
    movable: true,      //指定窗口是否可移动
    show: true,         //指定创建窗口后是否立即显示
    alwaysOnTop: false, //控制窗口是否始终保持在顶部
    titleBarStyle: 'hidden',
    trafficLightPosition: { x: 12, y: 14 },  //macOS自定义红绿灯位置
    frame: process.platform === 'darwin',    //是否显示窗口的外部框架（包括标题栏和控制按钮）、macos显示原生的titlebar
    closable: true,     //指定用户是否可以窗口关闭
    minimizable: true,  //指定用户是否可以窗口最小化
    maximizable: true,  //指定用户是否可以窗口最大化
    skipTaskbar: false, //控制窗口是否在任务栏中隐藏
    //用于配置窗口的 Web 集成选项，例如启用 Node.js、预加载脚本等。
    webPreferences: {
      devTools: true,  //指定用户是否可开启控制台
      nodeIntegration: true, // 为了安全考虑，建议使用contextBridge而不是直接使用nodeIntegration
      contextIsolation: true,  // 如果使用contextBridge，需要设置contextIsolation为true，开启上下文隔离
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // 添加窗口状态监听器
  mainWindow.on('maximize', () => {
    mainWindow.webContents.send('window-state-changed', 'maximized');
  });

  mainWindow.on('unmaximize', () => {
    mainWindow.webContents.send('window-state-changed', 'unmaximized');
  });

  mainWindow.on('enter-full-screen', () => {
    mainWindow.webContents.send('window-state-changed', 'fullscreen');
  });

  mainWindow.on('leave-full-screen', () => {
    mainWindow.webContents.send('window-state-changed', 'unmaximized');
  });

  if (isDevelopment) {
    mainWindow.loadURL('http://localhost:8888');
    mainWindow.webContents.openDevTools();
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

ipcMain.on('open-url', (event, url) => { shell.openExternal(url) });
ipcMain.handle('close-window', () => { mainWindow.close() });
ipcMain.handle('minimize-window', () => { mainWindow.minimize() })
ipcMain.handle('maximize-window', () => {
  if (mainWindow.isMaximized()) {
    //如果已经最大化，则恢复
    mainWindow.unmaximize()
  } else {
    //否则最大化窗口
    mainWindow.maximize();
  }
})
ipcMain.handle('get-window-state', () => {
  if (mainWindow.isMaximized()) return 'maximized';
  if (mainWindow.isFullScreen()) return 'fullscreen';
  return 'normal';
});

//下载
ipcMain.handle('down-load-file', (event, { fileUrl, outputFileName }) => {
  return new Promise((resolve, reject) => {
    const outputLocationPath = path.join(os.tmpdir(), outputFileName);
    const file = fs.createWriteStream(outputLocationPath);

    https.get(fileUrl, (response) => {
      // 获取文件大小
      // @ts-ignore
      const totalBytes = parseInt(response.headers['content-length'], 10);
      let receivedBytes = 0;

      // 发送初始进度
      event.sender.send('download-progress', {
        progress: 0,
        receivedBytes: 0,
        totalBytes
      });

      response.on('data', (chunk) => {
        receivedBytes += chunk.length;
        const progress = totalBytes > 0 ? (receivedBytes / totalBytes) : 0;

        // 发送进度更新
        event.sender.send('download-progress', {
          progress,
          receivedBytes,
          totalBytes
        });
      });

      response.pipe(file);

      file.on('finish', () => {
        file.close();
        resolve(outputLocationPath);
      });

      file.on('error', (err: any) => {
        fs.unlink(outputLocationPath, () => {});
        reject(err);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
})
ipcMain.on('shell-show-item-in-folder', (event, path) => {
  shell.showItemInFolder(path);
});

