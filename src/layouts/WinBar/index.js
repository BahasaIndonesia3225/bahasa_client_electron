import React, { useEffect, useState } from 'react';
import { connect, useNavigate, useLocation } from 'umi';
import MacOSBar from "./MacOSBar";
import Win32Bar from "./Win32Bar";

const WinBar = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const { node, electron, chrome } = window.electron.versions;
  const platform = window.electron.platform;

  //监听路由变化
  useEffect(() => {
    if (pathname === '/') {
      props.dispatch({
        type: 'user/clearToken',
      });
    }
  }, [pathname]);

  //获取公告
  const [notice, setNotice] = useState(undefined);
  useEffect(() => {
    window.electron.getSettings("notice").then((res) => {
      setNotice(res);
    });
  }, []); // 空依赖数组表示此 effect 只在组件挂载时运行一次

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
    />
  )
}

const mapStateToProps = (state) => ({
  token: state.user.token,
});
export default connect(mapStateToProps)(WinBar)
