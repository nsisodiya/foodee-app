import React from 'react';
//import css from 'css-template';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Input, Button } from 'antd';
import css from 'css-template';
import { DevLinks } from '../DevLinks/DevLinks';
import { H1 } from '../../css/common.styled';
import { StoreConnector } from '../../components/StoreConnector/StoreConnector';
import { actions } from '../../domless/stores/actions';
import { Rows, Columns, ColSpacer, RowSpacer } from '../../css/Layout';
import { RestaurantWidget } from '../RestaurantWidget/RestaurantWidget';
import { formUtil } from '../../domless/stores/formUtil';
import { XHR_STATUS } from '../../constants/XHR_STATUS';
import { iff } from '../../utils/iff';
import { Container } from './PageAddRestaurant.styled';
// Open - http://localhost:1234/components/page-add-restaurant
// Open - http://localhost:6006/?path=/story/components-pageaddrestaurant--normal

const filePath = `/src/components/PageAddRestaurant/PageAddRestaurant.js`;

const Label = styled.div`
   {
    flex: 0 0 33.33333333%;
    max-width: 33.33333333%;
    text-align: end;
    color: black;
  }
`;
const ErrorLabel = styled.span`
   {
    color: #ff4d4f;
  }
`;
const generateSubmitButton = (state, store) => {
  return (
    <Columns centered style={{ height: '22px' }}>
      <Label />
      <ColSpacer>10</ColSpacer>
      <Button
        loading={state.xhr.create.status === XHR_STATUS.XHR_IN_PROGRESS}
        disabled={!state.isFormValid}
        onClick={() => {
          store.create();
        }}
        type='primary'
        htmlType='submit'>
        {state.submitBtnText}
      </Button>
    </Columns>
  );
};
const generateField = (state, field, store) => {
  return (
    <Rows
      style={css`
        margin-bottom: 0px;
      `}>
      <Columns centered>
        <Label>
          {iff(state.fields[field].required, <ErrorLabel>* </ErrorLabel>)}{' '}
          {state.fields[field].label} :{' '}
        </Label>
        <ColSpacer>10</ColSpacer>
        <Input
          style={{ border: iff(state.fields[field].error, '1px solid red', '1px solid #d9d9d9') }}
          bordered
          placeholder={state.fields[field].placeholder}
          value={state.fields[field].val}
          onChange={(event) => {
            store.editFormField(field, event.target.value);
          }}
        />
      </Columns>
      <Columns centered style={{ height: '22px' }}>
        <Label />
        <ColSpacer>10</ColSpacer>
        <ErrorLabel>{state.fields[field].errorMessage}</ErrorLabel>
      </Columns>
    </Rows>
  );
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
                  {generateField(state, 'name', actions.AddRestaurantStore)}
                  {generateField(state, 'address', actions.AddRestaurantStore)}
                  {generateField(state, 'cuisines', actions.AddRestaurantStore)}
                  {generateField(state, 'imageurl', actions.AddRestaurantStore)}
                  {generateField(state, 'hours', actions.AddRestaurantStore)}
                  {generateField(state, 'website', actions.AddRestaurantStore)}
                  {generateField(state, 'phone', actions.AddRestaurantStore)}
                  {generateSubmitButton(state, actions.AddRestaurantStore)}
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
