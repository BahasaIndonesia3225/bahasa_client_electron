import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'umi';
import {
  SettingOutlined,
  MinusOutlined,
  ArrowsAltOutlined,
  ShrinkOutlined,
  CloseOutlined,
  LeftOutlined,
  RightOutlined,
} from '@ant-design/icons';
import "./index.less"

export default () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [isMaximize, setIsMaximize] = useState(false);
  useEffect(() => {
    // 获取初始窗口状态
    window.electron.getWindowState().then(state => {
      setIsMaximize(state === 'maximized' || state === 'fullscreen');
    });
    // 添加窗口状态变化监听
    const handleStateChange = (state) => {
      setIsMaximize(state === 'maximized' || state === 'fullscreen');
    };
    window.electron.onWindowStateChange(handleStateChange);

    return () => { window.electron.removeWindowStateListener() };
  }, []);

  return (
    <div className="Win32Bar" >
      <div className="leftMenu">
        <img alt="" src="./image/client_icon.png"/>
        <span className="title">东东印尼语</span>
        <div className="split-line"></div>
        {!isHomePage && (
          <LeftOutlined
            title="返回"
            className="iconfont"
            onClick={() => {
              navigate(-1);
            }}
          />
        )}
      </div>
      <div className="rightMenu">
        <SettingOutlined
          title="设置"
          className="iconfont"
          onClick={() => {}}
        />
        <div className="split-line"></div>
        <MinusOutlined
          title="最小化"
          className="iconfont"
          onClick={() => { window.electron.minimizeWindow() }}
        />
        {!isMaximize && (
          <ArrowsAltOutlined
            title="最大化"
            className="iconfont"
            onClick={() => {
              window.electron.maximizeWindow();
              setIsMaximize(true);
            }}
          />
        )}
        {isMaximize && (
          <ShrinkOutlined
            title="恢复"
            className="iconfont"
            onClick={() => {
              window.electron.maximizeWindow();
              setIsMaximize(false);
            }}
          />
        )}
        <CloseOutlined
          title="关闭"
          className="iconfont"
          onClick={() => { window.electron.closeWindow() }}
        />
      </div>
    </div>
  )
}
