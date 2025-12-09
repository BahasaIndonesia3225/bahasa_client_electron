import { contextBridge, ipcRenderer } from 'electron';

const api = {
  versions: process.versions,
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  minimizeWindow: () => ipcRenderer.invoke('minimize-window'),
  maximizeWindow: () => ipcRenderer.invoke('maximize-window'),
  restoreWindow: () => ipcRenderer.invoke('restore-window'),
  closeApp: () => ipcRenderer.invoke('close-app'),
  openUrl: (url: string) => ipcRenderer.send('open-url', url),
};

//预加载脚本在渲染器加载网页之前注入
const apiKey = 'electron';
contextBridge.exposeInMainWorld(apiKey, api);
