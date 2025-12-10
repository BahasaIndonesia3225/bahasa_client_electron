import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'umi';
import { SettingOutlined, LeftOutlined } from '@ant-design/icons';
import "./index.less"

export default () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="MacOSBar" >
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
      </div>
    </div>
  )
}
