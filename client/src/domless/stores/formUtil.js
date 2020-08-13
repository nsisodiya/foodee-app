import { fieldMetaData } from './RegisterStore';

export const formUtil = {
  calculateIsFormValid(state) {
    var r = true;
    Object.keys(fieldMetaData).forEach((v) => {
      r = r && fieldMetaData[v].validator(state.fields[v].val).error === false;
    });
    return r;
  },
  validate(state, field, val) {
    const { error, errorMessage } = fieldMetaData[field].validator(val);
    state.fields[field].error = error;
    state.fields[field].errorMessage = errorMessage;
  }
};
