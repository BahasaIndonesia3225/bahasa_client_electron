import React, { useState } from 'react'
import { Image, Space, Divider, Typography, Radio } from 'antd'
import "./index.less"

const { Title, Paragraph, Text, Link } = Typography;

const options = [
  { label: '香港线路', value: "http://bahasaindo.net/" },
  { label: '大陆线路', value: "http://study.bahasaindo.cn/" },
  { label: '台湾线路', value: "http://bahasaindo.com/" },
];

export default () => {
  const [value, setValue] = useState("http://bahasaindo.net/");
  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className="SwitchLine" >
      <Typography>
        <Title level={2}>线路切换</Title>
        <Paragraph>
          线路切换是现代网站架构中提升全球用户体验的关键技术，通过智能路由和弹性架构，确保用户无论身处何地都能获得快速稳定的服务。
        </Paragraph>
        <Radio.Group
          vertical
          value={value}
          options={options}
          onChange={onChange}
        />
      </Typography>
    </div>
  )
}
