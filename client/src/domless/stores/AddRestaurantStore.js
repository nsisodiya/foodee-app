import { createReducer } from 'redux-wow';
import isLength from 'validator/lib/isLength';
import { message } from 'antd';
import { XHR_STATUS } from '../../constants/XHR_STATUS';
import { getHeaders } from '../utils/getHeaders';
import { HttpCodes } from '../utils/HttpCodes';
import { history } from '../utils/history';
import { actions } from './actions';
import { formUtil } from './formUtil';
/*
{
    "name": "New Rajdhani",
    "address": "Nanded City Pune",
    "cuisines": "North Indian, Rajdhani",
    "imageurl": "https://b.zmtcdn.com/data/pictures/chains/9/18198449/7516c3b9fbacd0e9402bc20ca0c6a920_featured_v2.jpg",
    "hours": "9am – 11pm (Mon-Sun)",
    "website":"www.rajdhani.com",
    "phone": "+91 98345 98762"
}*/

const fieldMetaData = {
  name: {
    validator(val) {
      const error = !isLength(val, {
        min: 4
      });
      let errorMessage = '';
      if (error) {
        errorMessage = 'Name should be atleast 4 chars';
      }
      return {
        error,
        errorMessage
      };
    }
  },
  address: {
    validator(val) {
      const error = !isLength(val, {
        min: 5
      });
      let errorMessage = '';
      if (error) {
        errorMessage = 'Address should be atleast 5 char';
      }
      return {
        error,
        errorMessage
      };
    }
  }
};

export const AddRestaurantStore = createReducer({
  namespace: 'AddRestaurantStore',
  initialState: {
    fields: {
      name: {
        placeholder: '',
        label: 'Name',
        required: true,
        type: 'text',
        val: '',
        error: false,
        errorMessage: ''
      },
      address: {
        placeholder: '',
        label: 'Address',
        required: true,
        type: 'text',
        val: '',
        error: false,
        errorMessage: ''
      },
      cuisines: {
        placeholder: 'North India, South Indian',
        label: 'Cuisines',
        required: false,
        type: 'text',
        val: '',
        error: false,
        errorMessage: ''
      },
      imageurl: {
        placeholder: 'http://example.com/1.png',
        label: 'Image Url',
        required: false,
        type: 'text',
        val: '',
        error: false,
        errorMessage: ''
      },
      hours: {
        placeholder: '9AM to 10PM',
        label: 'Hours',
        required: false,
        type: 'text',
        val: '',
        error: false,
        errorMessage: ''
      },
      website: {
        placeholder: 'https://example.com',
        label: 'Website',
        required: false,
        type: 'text',
        val: '',
        error: false,
        errorMessage: ''
      },
      phone: {
        placeholder: '+91 011 95673456',
        label: 'Phone',
        required: false,
        type: 'text',
        val: '',
        error: false,
        errorMessage: ''
      }
    },
    submitBtnText: 'Create',
    apiUrl: '/restaurants',
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
  create(state) {
    formUtil.validateAll(state, fieldMetaData);
    if (state.isFormValid === false) {
      return;
    }
    state.xhr.create.status = XHR_STATUS.XHR_IN_PROGRESS;
    (async () => {
      try {
        const resraw = await fetch(`${process.env.API_URL}${state.apiUrl}`, {
          method: 'POST',
          body: JSON.stringify(formUtil.getCurrentFormValue(state)),
          headers: getHeaders()
        });
        const { status: statusCode, statusText } = resraw;
        // Status is less than 200 and greater than equal to 300.
        if (statusCode < HttpCodes.OK200 || statusCode >= HttpCodes.MULTIPLE_CHOICES) {
          actions.AddRestaurantStore.createFailure({
            statusCode,
            statusText,
            errorMessage: 'Something wrong with server API'
          });
          return;
        }
        const res = await resraw.json();
        if (res.error === true) {
          actions.AddRestaurantStore.createFailure({
            statusCode,
            statusText,
            errorMessage: res.errorMessage
          });
        } else {
          actions.AddRestaurantStore.createSuccess(res);
        }
      } catch (error) {
        console.error('Catch Error: AddRestaurantStore -> create', error);
        actions.AddRestaurantStore.createFailure({
          errorMessage: error
        });
      }
    })();
  },
  createSuccess(state, res) {
    state.xhr.create.status = XHR_STATUS.XHR_IN_SUCCESS;
    state.xhr.create.successMessage = 'Restaurant Address Succefully';
    message.success(state.xhr.create.successMessage);
    const duration = 1000;
    setTimeout(() => {
      history.push(`/restaurant/${res.id}`);
      //location = `/restaurant/${res.id}`;
    }, duration);

    //TODO - Clear form;
    //TODO - The navigation should be pushState, use <Redirect>
  },
  createFailure(state, { statusCode, statusText, errorMessage }) {
    state.xhr.create.status = XHR_STATUS.XHR_IN_ERROR;
    state.xhr.create.statusCode = statusCode;
    state.xhr.create.statusText = statusText;
    state.xhr.create.errorMessage = errorMessage;
    message.error(state.xhr.create.errorMessage);
    console.error(
      `XHR failed - AddRestaurantStore:create. StatusCode-${statusCode}, StatusText- ${statusText}`
    );
  }
});
