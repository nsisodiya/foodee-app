import React from 'react';
import { Form, Button } from 'antd';
import css from 'css-template';
import { DevLinks } from '../DevLinks/DevLinks';
import { StoreConnector } from '../../components/StoreConnector/StoreConnector';
import { actions } from '../../domless/stores/actions';
import { generateFormItem } from '../forms/generateFormItem';
import { Rows } from '../../css/Layout';
import { H1 } from '../../css/common.styled';
import { XHR_STATUS } from '../../constants/XHR_STATUS';
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
  actions.RegisterStore.createAccount();
};

const onFinishFailed = (errorInfo) => {
  console.error('Failed:', errorInfo);
};

export const PageRegister = function () {
  //message.success('This is a success message');

  return (
    <Container data-file={filePath} className='p-3 bg-white'>
      <StoreConnector
        storeName='RegisterStore'
        connectTo={(state) => {
          return (
            <>
              <Rows centered>
                <H1>Create Your Account</H1>

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
                    {generateFormItem(state, 'name', actions.RegisterStore)}
                    {generateFormItem(state, 'email', actions.RegisterStore)}
                    {generateFormItem(state, 'password', actions.RegisterStore)}

                    <Form.Item {...tailLayout}>
                      <Button
                        loading={state.xhr.create.status === XHR_STATUS.XHR_IN_PROGRESS}
                        disabled={!state.isFormValid}
                        type='primary'
                        htmlType='submit'>
                        {state.submitBtnText}
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              </Rows>
              <DevLinks displayName={PageRegister.displayName} filePath={filePath} />
            </>
          );
        }}
      />
    </Container>
  );
};

PageRegister.displayName = 'PageRegister';
PageRegister.testProps = [];
PageRegister.propTypes = {};
