import React from 'react';
import { Tabs } from 'antd';
import AboutUs from './AboutUs';
import BindPhone from './BindPhone';
import PeopleNearby from "./PeopleNearby";
import "./index.less"

export default () => {
  const items = [
    { key: '1', label: '手机号码', children: <BindPhone/> },
    { key: '2', label: '附近的人', children: <PeopleNearby/> },
    { key: '3', label: '关于我们', children: <AboutUs/> },
  ];

  return (
    <div className="setting">
      <Tabs
        tabPlacement="start"
        defaultActiveKey="1"
        items={items}
      />
    </div>
  )
}
