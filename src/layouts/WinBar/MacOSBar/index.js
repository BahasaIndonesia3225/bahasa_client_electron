import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'umi';
import { Alert, Button } from 'antd';
import Marquee from 'react-fast-marquee';
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
      <Alert
        style={{ width: 400, height: 26 }}
        type="info"
        showIcon
        title={
          <Marquee
            speed={20}
            pauseOnHover={true}
            gradient={false}>
            由于公司去挪威团建，12月11号全天无法回复信息。请同学们先留言
          </Marquee>
        }
      />
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
