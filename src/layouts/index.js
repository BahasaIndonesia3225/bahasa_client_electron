import React, { useState } from 'react';
import { Image, Watermark, ConfigProvider, theme } from "antd";
import { useNavigate, useRouteProps, Outlet, connect } from 'umi';
import WinBar from './WinBar';
import SideBar from './SideBar';
import zhCN from 'antd/locale/zh_CN';
import "./index.less"

const Layout = (props) => {
  const routeProps = useRouteProps()
  const { name } = routeProps;

  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        components: { Alert: { withDescriptionPadding: [10, 12] } },
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm
      }}>
      <div className="layout">
        <WinBar />
        <div className="app-content">
          <Outlet/>
        </div>
      </div>
    </ConfigProvider>
  );
}

export default Layout;
