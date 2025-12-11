import React from 'react'
import { Image, Space, Divider, Typography } from 'antd'
import "./index.less"

const { Title, Paragraph, Text, Link } = Typography;

export default () => {
  return (
    <div className="AboutUs" >
      {/*<Space*/}
      {/*  orientation="vertical"*/}
      {/*  size="middle"*/}
      {/*  align="center"*/}
      {/*  style={{ display: 'flex' }}>*/}
      {/*  <Image*/}
      {/*    width={125}*/}
      {/*    height={25}*/}
      {/*    preview={false}*/}
      {/*    src='./image/aboutUs/logo.png'*/}
      {/*  />*/}
      {/*  <Image*/}
      {/*    width={300}*/}
      {/*    height={45}*/}
      {/*    preview={false}*/}
      {/*    src='./image/aboutUs/word.png'*/}
      {/*  />*/}
      {/*  <Image*/}
      {/*    width={252}*/}
      {/*    height={179}*/}
      {/*    preview={false}*/}
      {/*    src='./image/aboutUs/icon1.png'*/}
      {/*  />*/}
      {/*</Space>*/}
      <Typography>
        <Title level={2}>关于我们</Title>
        <Paragraph>
          东东外语自2018年起进入中国大陆市场，致力于提供印度尼西亚语言培训。
          目前，我们在多个平台拥有近<Text mark>10万粉丝</Text>，井吸引了来自全国各地的学员。
          我们采用了创新的“<Text mark>视频课程＋一对一课后答疑</Text>〞模式，有效满足了有意学习印尼语但难以抽出时间参加传统课堂的学员的需求，为了增强学习体验，我们不断开发新的应用程序，使学员能更好地投入到学习中。
        </Paragraph>
        <Paragraph style={{ marginBottom: 0 }}>
          <Text type="secondary">公司地址：</Text>
          <Text copyable>No.01 G6 L4, Rd Ls, CM, 52300</Text>
        </Paragraph>
        <Paragraph style={{ marginBottom: 0 }}>
          <Text type="secondary">中国大陆地区实体税号：</Text>
          <Text copyable>91441900MABLHM2T92</Text>
        </Paragraph>
        <Paragraph>
          <Text type="secondary">东东印尼语学习系统备案号：</Text>
          <Text copyable>粤ICP备2024177696号</Text>
        </Paragraph>
      </Typography>
    </div>
  )
}
