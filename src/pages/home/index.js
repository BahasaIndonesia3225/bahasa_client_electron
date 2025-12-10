import React, { useState, useEffect } from 'react'
import { Space, Image, Flex, Button, message } from 'antd';
import { AndroidFilled, AppleFilled } from '@ant-design/icons';
import { useNavigate } from 'umi';
import './index.less';

export default () => {
  let navigate = useNavigate();

  const UserAgreementLink = "https://taioassets.oss-cn-beijing.aliyuncs.com/Pdfs/%E4%B8%9C%E4%B8%9C%E5%8D%B0%E5%B0%BC%E8%AF%AD%E7%94%A8%E6%88%B7%E4%BD%BF%E7%94%A8%E6%9C%8D%E5%8A%A1%E5%8D%8F%E8%AE%AE.pdf";
  const TikTokLink = "https://v.douyin.com/iNNrghAv/ 8@5.com";
  const YouTubeLink = "https://www.youtube.com/channel/UCNz0CuIKBXpizEmn8akC42w";
  const iOSLink = "https://apps.apple.com/cn/app/bahasadong/id6502833636";
  const AndroidLink = "https://storage.googleapis.com/video_pelajaran/aplikasiAndroid/SistemBelajar9.0.apk";
  const openLink = (link) => window.electron.openUrl(link);

  //下载安卓APK
  const [isDownloading, setIsDownloading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const key = "home-download";

  useEffect(() => {
    window.electron.onDownloadProgress((data) => {
      const progress = Math.round(data.progress * 100);
      messageApi.open({
        key,
        type: 'loading',
        content: `文件下载中 ${progress}%`,
        duration: progress === 100 ? 1 : 0,
        style: { marginTop: '40px' },
      }).then(() => {
        messageApi.open({
          key,
          type: 'success',
          content: `文件下载成功`,
          duration: 2,
          style: { marginTop: '40px' },
        })
      }).then((result) => setIsDownloading(false))
    });
    return () => { window.electron.removeDownloadProgressListener() };
  }, []);

  const downLoadApk = () => {
    setIsDownloading(true);
    messageApi.open({
      key,
      type: 'loading',
      content: '文件开始下载',
      duration: 0,
      style: { marginTop: '40px' },
    });
    const fileUrl = AndroidLink;
    const fileName = "东东印尼语.apk";
    window.electron.downloadFile(fileUrl, fileName).then((savedPath) => {
      window.electron.shellShowItemInFolder(savedPath);
    })
  }

  return (
    <div className="home">
      <div className="homeContainer">
        <Image
          src='./image/login_home.png'
          preview={false}
          width={300}
          style={{marginBottom: 40}}
        />
        <Space direction='vertical' align='center' size={10}>
          <Image
            src='./image/loginBtn.png'
            preview={false}
            width={340}
            onClick={() => navigate("/login", {replace: false})}
          />
          <Image
            src='./image/loginProtocol.png'
            width={340}
            preview={false}
            onClick={() => openLink(UserAgreementLink)}
          />
        </Space>
        <Flex
          style={{ marginTop: 18 }}
          gap="small"
          justify="space-between"
          align='center'>
          <Button
            shape="round"
            icon={<AppleFilled />}
            size='small'
            onClick={() => openLink(iOSLink)}>
            iOS
          </Button>
          <Button
            shape="round"
            icon={<AndroidFilled />}
            size='small'
            loading={isDownloading}
            onClick={() => downLoadApk()}>
            Android
          </Button>
          {contextHolder}
        </Flex>
      </div>
      <div
        className="bahasaindoLink"
        onClick={() => window.open("http://bahasaindo.cn/", "_blank", 'width=375,height=667')}>
        <div className="icon">
          <Image
            src="./image/icon_card.png"
            preview={false}
          />
        </div>
        <span>单词卡</span>
      </div>
      <div
        className="bahasaindoLink ptdchatbot"
        onClick={() => window.open("http://ptdchatbot.cn", "_blank", 'width=375,height=667')}>
        <div className="icon">
          <Image
            style={{ borderRadius: 20 }}
            src="./image/icon_card2.png"
            preview={false}
          />
        </div>
        <span>小曼同学</span>
      </div>
      <div
        className="bahasaindoLink ptdpintar"
        onClick={() => window.open("http://ptdpintar.cn", "_blank", 'width=375,height=667')}>
        <div className="icon">
          <Image
            style={{ borderRadius: 20 }}
            src="./image/icon_card1.png"
            preview={false}
          />
        </div>
        <span>东仔</span>
      </div>
      <div className="bahasaindoFooter">
        <div className="friendLink">
          <span onClick={() => openLink(YouTubeLink)}>东东印尼语YouTube</span>
          <span onClick={() => openLink(TikTokLink)}>东东印尼语抖音</span>
        </div>
        <p>
          D 2019-2024 PT BahasaDona All rights reserved
        </p>
      </div>
    </div>
  )
}
