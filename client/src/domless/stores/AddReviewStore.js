import { createReducer } from 'redux-wow';
import isLength from 'validator/lib/isLength';
import { message } from 'antd';
import { XHR_STATUS } from '../../constants/XHR_STATUS';
import { getHeaders } from '../utils/getHeaders';
import { HttpCodes } from '../utils/HttpCodes';
import { evtbus } from '../../utils/evtbus';
import { actions } from './actions';
import { formUtil } from './formUtil';

const fieldMetaData = {
  rating: {
    validator(val) {
      const max = 5;
      const error = !(val >= 1 && val <= max);
      let errorMessage = '';
      if (error) {
        errorMessage = 'Rating is not valid';
      }
      return {
        error,
        errorMessage
      };
    }
  },
  comment: {
    validator(val) {
      const error = !isLength(val, {
        min: 4
      });
      let errorMessage = '';
      if (error) {
        errorMessage = 'Please add atleast 4 letters';
      }
      return {
        error,
        errorMessage
      };
    }
  }
};

export const AddReviewStore = createReducer({
  namespace: 'AddReviewStore',
  initialState: {
    fields: {
      restaurant: {
        required: true,
        type: 'text',
        val: '',
        error: false,
        errorMessage: ''
      },
      rating: {
        required: true,
        type: 'rating',
        val: 0,
        error: false,
        errorMessage: ''
      },
      comment: {
        placeholder: 'Please write your review...',
        required: true,
        label: '',
        type: 'textarea',
        val: '',
        error: false,
        errorMessage: ''
      }
    },
    submitBtnText: 'Submit',
    apiUrl: '/reviews',
    isFormValid: true,
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
  editFormField(state, field, val) {
    var obj = state.fields[field];
    obj.val = val;
    formUtil.validate(state, field, val, fieldMetaData);
    state.isFormValid = formUtil.calculateIsFormValid(state, fieldMetaData);
  },
  addReview(state) {
    formUtil.validateAll(state, fieldMetaData);
    if (state.isFormValid === false) {
      return;
    }
    state.xhr.create.status = XHR_STATUS.XHR_IN_PROGRESS;
    (async () => {
      try {
        const resraw = await fetch(`${process.env.API_URL}${state.apiUrl}`, {
          method: 'POST',
          body: JSON.stringify({
            rating: state.fields.rating.val,
            restaurant: state.fields.restaurant.val,
            comment: state.fields.comment.val
          }),
          headers: getHeaders()
        });
        const { status: statusCode, statusText } = resraw;
        // Status is less than 200 and greater than equal to 300.
        if (statusCode < HttpCodes.OK200 || statusCode >= HttpCodes.MULTIPLE_CHOICES) {
          actions.AddReviewStore.addReviewFailure({
            statusCode,
            statusText,
            errorMessage: 'Something wrong with server API'
          });
          return;
        }
        const res = await resraw.json();
        if (res.error === true) {
          actions.AddReviewStore.addReviewFailure({
            statusCode,
            statusText,
            errorMessage: res.errorMessage
          });
        } else {
          actions.AddReviewStore.addReviewSuccess(res);
        }
      } catch (error) {
        console.error('Catch Error: AddReviewStore -> addReview', error);
        actions.AddReviewStore.addReviewFailure({
          errorMessage: error
        });
      }
    })();
  },
  clear(state) {
    state.fields.rating.val = 0;
    state.fields.rating.error = false;
    state.fields.rating.errorMessage = '';
    state.fields.comment.val = '';
    state.fields.comment.error = false;
    state.fields.comment.errorMessage = '';
  },
  addReviewSuccess(state) {
    state.xhr.create.status = XHR_STATUS.XHR_IN_SUCCESS;
    state.xhr.create.successMessage = 'Thanks, your review Added';
    message.success(state.xhr.create.successMessage);
    evtbus.publish('NEW_COMMENT_ADDED');
    // setTimeout(function () {
    //   actions.AddReviewStore.clear();
    // }, 0);
    //Clear Form. TODO
  },
  addReviewFailure(state, { statusCode, statusText, errorMessage }) {
    state.xhr.create.status = XHR_STATUS.XHR_IN_ERROR;
    state.xhr.create.statusCode = statusCode;
    state.xhr.create.statusText = statusText;
    state.xhr.create.errorMessage = errorMessage;
    if (typeof errorMessage === 'string') {
      message.error(state.xhr.create.errorMessage);
    } else {
      message.error(state.xhr.create.errorMessage.message);
    }

    console.error(
      `XHR failed - AddReviewStore:addReview. StatusCode-${statusCode}, StatusText- ${statusText}`
    );
  }
});
