import {contextBridge, ipcRenderer} from 'electron';

const api = {
  platform: process.platform,
  versions: process.versions,
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  openUrl: (url: string) => ipcRenderer.send('open-url', url),
  closeWindow: () => ipcRenderer.invoke('close-Window'),
  minimizeWindow: () => ipcRenderer.invoke('minimize-window'),
  maximizeWindow: () => ipcRenderer.invoke('maximize-window'),
  //窗口状态相关
  getWindowState: () => ipcRenderer.invoke('get-window-state'),
  removeWindowStateListener: () => ipcRenderer.removeAllListeners('window-state-changed'),
  onWindowStateChange: (callback: (state: string) => void) => {
    ipcRenderer.on('window-state-changed', (_, state) => callback(state));
  },
  //下载相关
  downloadFile: (fileUrl: string, outputFileName: string) =>  ipcRenderer.invoke("down-load-file", { fileUrl, outputFileName }),
  onDownloadProgress: (callback: (progress: any) => void) =>
    ipcRenderer.on('download-progress', (_, progress) => callback(progress)),
  removeDownloadProgressListener: () =>
    ipcRenderer.removeAllListeners('download-progress'),
  shellShowItemInFolder: (path: string) =>
    ipcRenderer.send('shell-show-item-in-folder', path),
  //持久化储存
  getSettings: (key: string) => ipcRenderer.invoke('get-settings', key),
  setSettings: (key: string, value: any) => ipcRenderer.invoke('set-settings', key, value)
};

//预加载脚本在渲染器加载网页之前注入
const apiKey = 'electron';
contextBridge.exposeInMainWorld(apiKey, api);
