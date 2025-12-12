import React, { useState, useEffect } from 'react'
import { Spin, message } from 'antd';
import { request } from "@/services";
import {APIProvider, Map, useMap, AdvancedMarker, Pin} from '@vis.gl/react-google-maps';

export default function MapContainer(props) {
  const [messageApi, contextHolder] = message.useMessage();
  const [poiMarkers, setPoiMarkers] = useState([]);
  const [center, setCenter] = useState({lat: -6.189465707537651, lng: 106.82024454977989});

  //地图加载成功
  const [isLoading, setIsLoading] = useState(true);
  const onLoadMap = () => {
    setIsLoading(false)
    getLocation()
  }

  //地图加载失败
  const onLoadMapError = (error) => {
    setIsLoading(false);
    messageApi.open({
      type: 'error',
      content: '地图加载失败，请检查网络设置',
      duration: 2,
      style: { marginTop: '40px' },
    });
  }

  //位置信息更新
  const updateCoordinate = async (lng, lat) => {
    try {
      const data = { lng, lat };
      await request.post('/business/web/member/updateUserLat', { data });
    } catch (error) {
      console.error('Update location failed:', error);
      // 可添加用户提示，如 Toast 显示错误信息
    }
  }

  const onCameraChanged = (ev) => {
    const { center, zoom } = ev.detail;
    setCenter(center);
  }

  return (
    <Spin spinning={isLoading} tip="地图加载中...">
      {contextHolder}
      <APIProvider
        apiKey={'AIzaSyDA862xirqWG1xNKCJY6FB3YIeh4WzDMbU'}
        onLoad={() => onLoadMap()}
        onError={(error) => onLoadMapError(error)}>
        <Map
          style={{ width: '100%', height: '500px' }}
          mapId='9bdab6bf6bd31719'
          center={center}
          defaultZoom={10}
          minZoom={7}
          maxZoom={13}
          gestureHandling='greedy'
          disableDefaultUI={true}
          onCameraChanged={ (ev) => onCameraChanged(ev) }
        >
          {
            poiMarkers.map(({ name, lat, lng }, index) => (
              <AdvancedMarker
                key={`${name}-${index}`}
                position={{lat, lng}}>
                <Pin
                  background={'#ff0000'}
                  glyphColor={'#000'}
                  borderColor={'#000'} />
              </AdvancedMarker>
            ))
          }
        </Map>
      </APIProvider>
    </Spin>



  )
}
