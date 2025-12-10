import React from 'react'
import { Image, Watermark, ConfigProvider } from "antd";
import { useNavigate, useRouteProps, Outlet, connect } from 'umi';
import WinBar from './WinBar';
import SideBar from './SideBar';
import zhCN from 'antd/locale/zh_CN';
import "./index.less"

const theme= {
  components: {
    Alert: {
      withDescriptionPadding: [10, 12]
    },
  },
}

const Layout = (props) => {
  const routeProps = useRouteProps()
  const { name } = routeProps;

  return (
    <div className="layout">
      <WinBar />
      <div className="app-content">
        <ConfigProvider  locale={zhCN} theme={theme}>
          <Outlet/>
        </ConfigProvider>
      </div>
    </div>
  );
}

export default Layout;
