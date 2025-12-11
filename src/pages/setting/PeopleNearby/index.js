import React, { useState, useEffect, useRef }  from 'react';
import { Image, Radio, Typography } from 'antd';
import AMap from './Amaps'
import GoogleMaps from './GoogleMaps'
import { request } from "@/services";

const { Title, Paragraph, Text, Link } = Typography;

export default () => {
  const [mapEngine, setMapEngine] = useState(1);
  const handleChangeMapEngine = ({ target: { value } }) => {
    setMapEngine(value);
  }

  //获取附近的人
  useEffect(() => { getAllUserCoordinate() }, []);
  const [peopleNearby, setPeopleNearby] = useState([]);
  const getAllUserCoordinate = async () => {
    const data = { page: 1, size: 1000 };
    const { success, content } = await request.post('/business/web/member/listH5', { data });
    if(success) setPeopleNearby(content)
  }

  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return (
    <div className="PeopleNearby">
      <Typography>
        <Title level={2}>附近的人</Title>
        <Paragraph>
          <Text type="secondary">地图引擎：</Text>
          <Radio.Group
            value={mapEngine}
            onChange={(value) => handleChangeMapEngine(value)}
            options={[
              { value: 1, label: '高德地图' },
              { value: 2, label: '谷歌地图' },
            ]}
          />
        </Paragraph>
      </Typography>
      { mapEngine === 1 ? <AMap /> : <GoogleMaps /> }
      {peopleNearby.map((item, index) => (
        <div key={item.name}>
          <Image
            src={'https://api.dicebear.com/7.x/miniavs/svg?seed=' + (index + 1)}
            style={{ borderRadius: 20 }}
            fit='cover'
            width={40}
            height={40}
          />
          {item.name}
          {`该同学今日已经学习${getRandomNumber(10, 100)}min`}
        </div>
      ))}
    </div>
  )
}
