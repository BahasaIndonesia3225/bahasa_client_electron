import React, { useState, useEffect }  from 'react';
import { useNavigate } from 'umi';
import { Button, message, Form, Input, Typography, Modal, Row, Col  } from 'antd'
import { request } from "@/services";

const { Title, Paragraph, Text, Link } = Typography;

export default () => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  //获取手机号码
  useEffect(() => { queryUserPhone() }, []);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState("");
  const queryUserPhone = async () => {
    const result = await request.get('/business/web/member/getUser');
    const { code, content } = result;
    const { name, phone, deviceLimitNum } = content;
    setPhone(phone)
    setName(name);
  }

  //绑定手机
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };
  const handleOk = () => {
    form.validateFields().then(values => {
      request.post('/business/web/member/updateUser', {
        data: values
      }).then(res => {
        const { success, message } = res;
        if(!success) {
          messageApi.open({
            type: 'error',
            content: message,
          });
        }else {
          messageApi.open({
            type: 'success',
            content: '绑定成功',
          });
          handleCancel();
          queryUserPhone();
        }
      })
    })
  }

  //获取验证码
  const handleGetCode = () => {
    form.validateFields(['mobile']).then(values => {
      setLoading(true)
      request.post('/business/web/member/sendUser', {
        data: values
      }).then(res => {
        setLoading(false)
        const { success, message } = res;
        if(!success) {
          messageApi.open({
            type: 'error',
            content: message,
          });
        }else {
          messageApi.open({
            type: 'success',
            content: '发送成功',
          });
        }
      })
    })
  }

  return (
    <div className="BindPhone">
      {contextHolder}
      <Typography>
        <Title level={2}>手机号码</Title>
        <Paragraph style={{ marginBottom: 0 }}>
          <Text type="secondary">用户名：</Text>
          <Text>{ name }</Text>
        </Paragraph>
        <Paragraph>
          <Text type="secondary">手机号码：</Text>
          {
            phone ? <Text>{ phone }</Text> : (
              <>
                <Text>暂未绑定手机号码</Text>
                <Button type="link" onClick={() => { showModal() }}>去绑定</Button>
              </>
            )
          }
        </Paragraph>
      </Typography>
      <Modal
        title="绑定手机号"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          initialValues={{
            mobile: '',
            code: '',
          }}
        >
          <Form.Item
            name='mobile'
            label='手机号'
            rules={[
              { required: true, message: '手机号不能为空' },
              { pattern:  /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/, message: '请输入正确的中国大陆手机号码' },
            ]}>
            <Input placeholder='请输入' />
          </Form.Item>
          <Form.Item label="验证码" required>
            <Row gutter={8} style={{ width: '100%' }}>
              <Col span={18}>
                <Form.Item
                  name='code'
                  rules={[
                    { required: true, message: '验证码不能为空' },
                    { pattern:  /^\d{6}$/, message: '请输入正确的验证码' },
                  ]}>
                  <Input placeholder='请输入' />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Button
                  loading={loading}
                  loadingText='发送中'
                  onClick={() => handleGetCode()}
                  color='primary'
                  fill='none'>
                  发送验证码
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
