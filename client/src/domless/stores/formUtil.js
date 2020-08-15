export const formUtil = {
  calculateIsFormValid(state, fieldMetaData) {
    var r = true;
    Object.keys(fieldMetaData).forEach((v) => {
      if (fieldMetaData[v] !== undefined && typeof fieldMetaData[v].validator === 'function') {
        r = r && fieldMetaData[v].validator(state.fields[v].val).error === false;
      }
    });
    return r;
  },
  validate(state, field, val, fieldMetaData) {
    if (
      fieldMetaData[field] !== undefined &&
      typeof fieldMetaData[field].validator === 'function'
    ) {
      const { error, errorMessage } = fieldMetaData[field].validator(val);
      state.fields[field].error = error;
      state.fields[field].errorMessage = errorMessage;
    } else {
      state.fields[field].error = false;
    }
  },
  validateAll(state, fieldMetaData) {
    Object.keys(state.fields).forEach((field) => {
      formUtil.validate(state, field, state.fields[field].val, fieldMetaData);
    });
    var r = true;
    Object.keys(state.fields).forEach((field) => {
      r = r && state.fields[field].error === false;
    });
    state.isFormValid = r;
  },
  getCurrentFormValue(state) {
    var r = {};
    Object.keys(state.fields).forEach((field) => {
      r[field] = state.fields[field].val;
    });
    return r;
  }
};
