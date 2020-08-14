import React from 'react';
import { Form, Rate, Input } from 'antd';
import { iff } from '../../utils/iff';

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
