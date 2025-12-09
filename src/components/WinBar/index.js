import React from 'react';
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
  const { node, electron, chrome } = window.electron.versions;
  const [isMaximize, setIsMaximize] = React.useState(false);
  const isHomePage = location.pathname === '/';

  return (
    <div className="WinBar" >
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
              window.electron.restoreWindow();
              setIsMaximize(false);
            }}
          />
        )}
        <CloseOutlined
          title="关闭"
          className="iconfont"
          onClick={() => { window.electron.closeApp() }}
        />
      </div>
    </div>
  )
}
