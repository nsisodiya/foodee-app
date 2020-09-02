import React from 'react';
import { Form, Input, Button, Rate } from 'antd';
import styled from 'styled-components';
import css from 'css-template';
import { iff } from '../../utils/iff';
import { Rows, Columns, ColSpacer } from '../../css/Layout';
import { XHR_STATUS } from '../../constants/XHR_STATUS';

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
export const generateSubmitButton = (state, store, nospace) => {
  return (
    <Columns centered style={{ height: '22px' }}>
      {iff(
        nospace === undefined,
        <>
          <Label />
          <ColSpacer>10</ColSpacer>
        </>
      )}
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
export const generateField = (state, field, store) => {
  return (
    <Rows
      style={css`
        margin-bottom: 0px;
      `}>
      <Columns centered>
        {iff(
          state.fields[field].label !== '' && state.fields[field].label !== undefined,
          <>
            <Label>
              {iff(state.fields[field].required, <ErrorLabel>* </ErrorLabel>)}{' '}
              {state.fields[field].label} :{' '}
            </Label>
            <ColSpacer>10</ColSpacer>
          </>
        )}
        {(() => {
          switch (state.fields[field].type) {
            case 'rating':
              return (
                <Rate
                  style={{ color: 'red' }}
                  value={state.fields[field].val}
                  onChange={(value) => {
                    store.editFormField(field, value);
                  }}
                />
              );
              break;
            case 'textarea':
              return (
                <Input.TextArea
                  style={{
                    border: iff(state.fields[field].error, '1px solid red', '1px solid #d9d9d9')
                  }}
                  bordered
                  value={state.fields[field].val}
                  placeholder={state.fields[field].placeholder}
                  onChange={(event) => {
                    store.editFormField(field, event.target.value);
                  }}
                />
              );
              break;
            case 'text':
              return (
                <Input
                  style={{
                    border: iff(state.fields[field].error, '1px solid red', '1px solid #d9d9d9')
                  }}
                  bordered
                  placeholder={state.fields[field].placeholder}
                  value={state.fields[field].val}
                  onChange={(event) => {
                    store.editFormField(field, event.target.value);
                  }}
                />
              );
              break;
            case 'password':
              return (
                <Input.Password
                  style={{
                    border: iff(state.fields[field].error, '1px solid red', '1px solid #d9d9d9')
                  }}
                  bordered
                  value={state.fields[field].val}
                  placeholder={state.fields[field].placeholder}
                  onChange={(event) => {
                    store.editFormField(field, event.target.value);
                  }}
                />
              );
              break;
            default:
              return <div>Something wrong</div>;
              break;
          }
        })()}
      </Columns>
      <Columns centered style={{ height: '22px' }}>
        <Label />
        <ColSpacer>10</ColSpacer>
        <ErrorLabel>{state.fields[field].errorMessage}</ErrorLabel>
      </Columns>
    </Rows>
  );
};

export const generateFormItem = (state, field, store) => {
  return (
    <Form.Item
      label={state.fields[field].label}
      required={state.fields[field].required}
      validateStatus={iff(state.fields[field].error, 'error', null)}
      name={field}
      help={iff(state.fields[field].error, state.fields[field].errorMessage, null)}>
      {(() => {
        switch (state.fields[field].type) {
          case 'rating':
            return (
              <Rate
                style={{ color: 'red' }}
                value={state.fields[field].val}
                onChange={(value) => {
                  store.editFormField(field, value);
                }}
              />
            );
            break;
          case 'textarea':
            return (
              <Input.TextArea
                value={state.fields[field].val}
                placeholder={state.fields[field].placeholder}
                onChange={(event) => {
                  store.editFormField(field, event.target.value);
                }}
              />
            );
            break;
          case 'text':
            return (
              <Input
                value={state.fields[field].val}
                placeholder={state.fields[field].placeholder}
                onChange={(event) => {
                  store.editFormField(field, event.target.value);
                }}
              />
            );
            break;
          case 'password':
            return (
              <Input.Password
                value={state.fields[field].val}
                placeholder={state.fields[field].placeholder}
                onChange={(event) => {
                  store.editFormField(field, event.target.value);
                }}
              />
            );
            break;
          default:
            return <div>Something wrong</div>;
            break;
        }
      })()}
    </Form.Item>
  );
};
