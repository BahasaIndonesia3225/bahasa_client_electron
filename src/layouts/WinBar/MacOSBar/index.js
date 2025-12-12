import React from 'react'
import { Alert } from 'antd';
import Marquee from 'react-fast-marquee';
import { SettingOutlined, LeftOutlined } from '@ant-design/icons';
import "./index.less"

export default ({ isLogin, isHomePage, dumpBack, dumpSetting, notice }) => {

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
            onClick={() => dumpBack()}
          />
        )}
      </div>
      {
        notice && (
          <Alert
            style={{ width: 400, height: 26 }}
            type="info"
            showIcon
            title={
              <Marquee
                speed={20}
                pauseOnHover={true}
                gradient={false}>
                {notice}
              </Marquee>
            }
          />
        )
      }
      <div className="rightMenu">
        <SettingOutlined
          title="设置"
          className="iconfont"
          onClick={() => dumpSetting()}
        />
      </div>
    </div>
  )
}
