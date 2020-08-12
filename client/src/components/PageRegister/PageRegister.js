import React from 'react';
import { Form, Input, Button } from 'antd';
import css from 'css-template';
import { DevLinks } from '../DevLinks/DevLinks';
import { Container } from './PageRegister.styled';

// Open - http://localhost:1234/components/page-register
// Open - http://localhost:6006/?path=/story/components-pageregister--normal

const filePath = `/src/components/PageRegister/PageRegister.js`;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 }
};
const onFinish = (values) => {
  console.error('Success:', values);
};

const onFinishFailed = (errorInfo) => {
  console.error('Failed:', errorInfo);
};
export const PageRegister = function () {
  return (
    <Container data-file={filePath} className='p-3 bg-white'>
      <h1>Welcome to Restaurant Review</h1>
      <h1>Create Your Account</h1>
      <div
        style={css`
          width: 50%;
        `}>
        <Form
          {...layout}
          name='basic'
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}>
          <Form.Item
            label='Email'
            name='email'
            rules={[{ required: true, message: 'Please input your email!' }]}>
            <Input />
          </Form.Item>

          <Form.Item
            label='Password'
            name='password'
            rules={[{ required: true, message: 'Please input your password!' }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type='primary' htmlType='submit'>
              Create Account
            </Button>
          </Form.Item>
        </Form>
      </div>

      <DevLinks displayName={PageRegister.displayName} filePath={filePath} />
    </Container>
  );
};

PageRegister.displayName = 'PageRegister';
PageRegister.testProps = [];
PageRegister.propTypes = {};
