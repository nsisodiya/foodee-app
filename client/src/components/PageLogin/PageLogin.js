import React from 'react';
import { Form, Button } from 'antd';
import css from 'css-template';
import { DevLinks } from '../DevLinks/DevLinks';
import { StoreConnector } from '../../components/StoreConnector/StoreConnector';
import { actions } from '../../domless/stores/actions';
import { generateFormItem } from '../forms/generateFormItem';
import { Rows } from '../../css/Layout';
import { H1 } from '../../css/common.styled';

import { Container } from './PageLogin.styled';
// Open - http://localhost:1234/components/page-login
// Open - http://localhost:6006/?path=/story/components-pagelogin--normal
const filePath = `/src/components/PageLogin/PageLogin.js`;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 }
};

const onFinish = (values) => {
  console.error('Success:', values);
  actions.LoginStore.loginAccount();
};

const onFinishFailed = (errorInfo) => {
  console.error('Failed:', errorInfo);
};

export const PageLogin = function () {
  //message.success('This is a success message');

  return (
    <Container data-file={filePath} className='p-3 bg-white'>
      <StoreConnector
        storeName='LoginStore'
        connectTo={(state) => {
          return (
            <>
              <Rows centered>
                <H1>Login to you account</H1>
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
                    {generateFormItem(state, 'email', actions.LoginStore)}
                    {generateFormItem(state, 'password', actions.LoginStore)}

                    <Form.Item {...tailLayout}>
                      <Button disabled={!state.isFormValid} type='primary' htmlType='submit'>
                        {state.submitBtnText}
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              </Rows>

              <DevLinks displayName={PageLogin.displayName} filePath={filePath} />
            </>
          );
        }}
      />
    </Container>
  );
};

PageLogin.displayName = 'PageLogin';
PageLogin.testProps = [];
PageLogin.propTypes = {};
