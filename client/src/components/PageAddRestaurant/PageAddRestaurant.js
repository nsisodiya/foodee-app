import React from 'react';
//import css from 'css-template';
// import PropTypes from 'prop-types';
//import styled from 'styled-components';
import { Form, Button } from 'antd';
import css from 'css-template';
import { DevLinks } from '../DevLinks/DevLinks';
import { H1 } from '../../css/common.styled';
import { StoreConnector } from '../../components/StoreConnector/StoreConnector';
import { actions } from '../../domless/stores/actions';
import { generateFormItem } from '../forms/generateFormItem';
import { Rows, RowSpacer } from '../../css/Layout';
import { RestaurantWidget } from '../RestaurantWidget/RestaurantWidget';
import { formUtil } from '../../domless/stores/formUtil';
import { XHR_STATUS } from '../../constants/XHR_STATUS';
import { Container } from './PageAddRestaurant.styled';
// Open - http://localhost:1234/components/page-add-restaurant
// Open - http://localhost:6006/?path=/story/components-pageaddrestaurant--normal

const filePath = `/src/components/PageAddRestaurant/PageAddRestaurant.js`;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 }
};
const onFinish = (values) => {
  console.error('Success:', values);
  actions.AddRestaurantStore.create();
};

const onFinishFailed = (errorInfo) => {
  console.error('Failed:', errorInfo);
};

export const PageAddRestaurant = function () {
  return (
    <Container data-file={filePath} className='p-3 bg-white'>
      <StoreConnector
        storeName='AddRestaurantStore'
        connectTo={(state) => {
          return (
            <>
              <Rows centered>
                <H1>Add Restaurant</H1>
                <RestaurantWidget {...formUtil.getCurrentFormValue(state)} />
                <RowSpacer>50</RowSpacer>
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
                    {generateFormItem(state, 'name', actions.AddRestaurantStore)}
                    {generateFormItem(state, 'address', actions.AddRestaurantStore)}
                    {generateFormItem(state, 'cuisines', actions.AddRestaurantStore)}
                    {generateFormItem(state, 'imageurl', actions.AddRestaurantStore)}
                    {generateFormItem(state, 'hours', actions.AddRestaurantStore)}
                    {generateFormItem(state, 'website', actions.AddRestaurantStore)}
                    {generateFormItem(state, 'phone', actions.AddRestaurantStore)}
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

              <DevLinks displayName={PageAddRestaurant.displayName} filePath={filePath} />
            </>
          );
        }}
      />
    </Container>
  );
};

PageAddRestaurant.displayName = 'PageAddRestaurant';
PageAddRestaurant.testProps = [];
PageAddRestaurant.propTypes = {};
