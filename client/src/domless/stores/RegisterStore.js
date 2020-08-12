import { createReducer } from 'redux-wow';
import isEmail from 'validator/lib/isEmail';
import isLength from 'validator/lib/isLength';
import { XHR_STATUS } from '../../constants/XHR_STATUS';
import { getHeaders } from '../utils/getHeaders';
import { HttpCodes } from '../utils/HttpCodes';
import { actions } from './actions';

const fieldMetaData = {
  email: {
    validator(val) {
      const error = !isEmail(val);
      let errorMessage = '';
      if (error) {
        errorMessage = 'Email is not valid';
      }
      return {
        error,
        errorMessage
      };
    }
  },
  password: {
    validator(val) {
      const error = !isLength(val, {
        min: 4
      });
      let errorMessage = '';
      if (error) {
        errorMessage = 'Password should be atleast 4 char';
      }
      return {
        error,
        errorMessage
      };
    }
  }
};

const calculateIsFormValid = (state) => {
  const v1 = fieldMetaData.email.validator(state.fields.email.val);
  const v2 = fieldMetaData.password.validator(state.fields.password.val);
  return v1.error === false && v2.error === false;
};

const validate = (state, field, val) => {
  const { error, errorMessage } = fieldMetaData[field].validator(val);
  state.fields[field].error = error;
  state.fields[field].errorMessage = errorMessage;
};
export const RegisterStore = createReducer({
  namespace: 'RegisterStore',
  initialState: {
    fields: {
      email: {
        val: '',
        error: false,
        errorMessage: ''
      },
      password: {
        val: '',
        error: false,
        errorMessage: ''
      }
    },
    isFormValid: false,
    xhr: {
      create: {
        status: XHR_STATUS.XHR_NOT_STARTED,
        error: null,
        statusCode: '',
        statusText: '',
        errorMessage: ''
      }
    }
  },
  editEmailVal(state, val) {
    var email = state.fields.email;
    email.val = val;
    validate(state, 'email', val);
    state.isFormValid = calculateIsFormValid(state);
  },
  editPasswordVal(state, val) {
    var password = state.fields.password;
    password.val = val;
    validate(state, 'password', val);
    state.isFormValid = calculateIsFormValid(state);
  },

  createAccount(state) {
    if (state.isFormValid === false) {
      return;
    }
    state.xhr.create.status = XHR_STATUS.XHR_IN_PROGRESS;
    (async () => {
      try {
        const resraw = await fetch(`${process.env.API_URL}/auth/register`, {
          method: 'POST',
          body: JSON.stringify({
            email: state.fields.email.val,
            password: state.fields.password.val
          }),
          headers: getHeaders()
        });
        const { status: statusCode, statusText } = resraw;
        // Status is less than 200 and greater than equal to 300.
        if (statusCode < HttpCodes.OK200 || statusCode >= HttpCodes.MULTIPLE_CHOICES) {
          actions.RegisterStore.createAccountFailure({
            statusCode,
            statusText,
            errorMessage: 'Something wrong with server API'
          });
          return;
        }
        const res = await resraw.json();
        if (res.error === true) {
          actions.RegisterStore.createAccountFailure({
            statusCode,
            statusText,
            errorMessage: res.errorMessage
          });
        } else {
          actions.RegisterStore.createAccountSuccess(res);
        }
      } catch (error) {
        console.error('Catch Error: RegisterStore -> createAccount', error);
        actions.RegisterStore.createAccountFailure({
          errorMessage: error
        });
      }
    })();
  },
  createAccountSuccess(state /*, res*/) {
    state.xhr.create.status = XHR_STATUS.XHR_IN_SUCCESS;
    state.xhr.create.successMessage = 'Your account successfully created';
    //TODO - save Token from server and redirect to "/"
    //TODO - show UI message that - res.successMessage
    //TODO - Redirect to /Login
  },
  createAccountFailure(state, { statusCode, statusText, errorMessage }) {
    state.xhr.create.status = XHR_STATUS.XHR_IN_ERROR;
    state.xhr.create.statusCode = statusCode;
    state.xhr.create.statusText = statusText;
    state.xhr.create.errorMessage = errorMessage;
    console.error(
      `XHR failed - RegisterStore:CreateAccount. StatusCode-${statusCode}, StatusText- ${statusText}`
    );
  }
});
