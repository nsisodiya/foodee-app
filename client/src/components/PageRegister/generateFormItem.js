import React from 'react';
import { Form, Input } from 'antd';
import { actions } from '../../domless/stores/actions';
import { iff } from '../../utils/iff';

export const generateFormItem = (state, field) => {
  return (
    <Form.Item
      label={state.fields[field].label}
      required={state.fields[field].required}
      validateStatus={iff(state.fields[field].error, 'error', null)}
      name={field}
      help={iff(state.fields[field].error, state.fields[field].errorMessage, null)}>
      {iff(
        state.fields[field].subType === 'password',
        () => {
          return (
            <Input.Password
              value={state.fields[field].val}
              placeholder={state.fields[field].placeholder}
              onChange={(event) => {
                actions.RegisterStore.editFormField(field, event.target.value);
              }}
            />
          );
        },
        () => {
          return (
            <Input
              value={state.fields[field].val}
              placeholder={state.fields[field].placeholder}
              onChange={(event) => {
                actions.RegisterStore.editFormField(field, event.target.value);
              }}
            />
          );
        }
      )}
    </Form.Item>
  );
};
