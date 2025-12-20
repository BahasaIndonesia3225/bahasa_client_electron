import React, { useState } from 'react';
import { connect } from 'umi';
import { Tabs } from 'antd';
import AboutUs from './AboutUs';
import BindPhone from './BindPhone';
import PeopleNearby from "./PeopleNearby";
import SwitchLine from "./SwitchLine"
import "./index.less"

const setting = (props) => {
  const isLogin = !!props.token;

  //动态设置items
  let items = [];
  if (isLogin) {
    items = [
      { key: '1', label: '手机号码', children: <BindPhone/> },
      { key: '2', label: '附近的人', children: <PeopleNearby/> },
      { key: '3', label: '关于我们', children: <AboutUs/> },
      { key: '4', label: '线路切换', children: <SwitchLine/> },
    ];
  }else {
    items = [
      { key: '3', label: '关于我们', children: <AboutUs/> },
      { key: '4', label: '线路切换', children: <SwitchLine/> },
    ];
  }

  const [activeKey, setActiveKey] = useState(items[0].key);
  const onChange = (key) => {
    setActiveKey(key);
  };

  return (
    <div className="setting">
      <Tabs
        tabPlacement="start"
        activeKey={activeKey}
        onChange={onChange}
        items={items}
      />
    </div>
  )
}

export default connect((state) => ({ token: state.user.token }))(setting)
