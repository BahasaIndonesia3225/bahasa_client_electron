import React, { useEffect, useState } from 'react';
import { connect, useNavigate, useLocation } from 'umi';
import { request } from '@/services';
import MacOSBar from "./MacOSBar";
import Win32Bar from "./Win32Bar";

const WinBar = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const { node, electron, chrome } = window.electron.versions;
  const platform = window.electron.platform;

  //监听路由变化（设置界面中判断是否登录）
  useEffect(() => {
    if (pathname === '/' || pathname === '/login') {
      props.dispatch({ type: 'user/clearToken' });
      getNotLoggedRemarks()
    }
    if (pathname === '/courseCatalog') {
      getLoggedRemarks()
    }
  }, [pathname]);

  //获取公告
  const [notice, setNotice] = useState(undefined);
  //获取公告（登录状态）
  const getLoggedRemarks = async () => {
    const { content } = await request.post('/business/web/notice/all');
    const { remark } = content;
    window.electron.setSettings("notice", remark);
    setNotice(remark);
  }
  //获取公告（未登录状态）
  const getNotLoggedRemarks = async () => {
    const remark = await window.electron.getSettings("notice");
    setNotice(remark);
  }

  const version = 'V1.08';
  const isLogin = !!props.token;
  const isHomePage = pathname === '/';
  const isMacOS = platform === 'darwin';
  const dumpBack = () => navigate(-1);
  const dumpSetting = () => navigate("/setting", { replace: false })
  const BarComponent = isMacOS ? MacOSBar : Win32Bar;
  return (
    <BarComponent
      notice={notice}
      isLogin={isLogin}
      isHomePage={isHomePage}
      dumpBack={dumpBack}
      dumpSetting={dumpSetting}
      version={version}
    />
  )
}

const mapStateToProps = (state) => ({
  token: state.user.token,
});
export default connect(mapStateToProps)(WinBar)
