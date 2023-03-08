import { call, put, select, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import { LOGIN_REQUEST, loginSuccess, loginFailure } from './actions';
import HTTPService from '../services/HTTPService';
import { EndpointService } from '../services/endpointService';
import { toast } from 'react-toastify';
import { getToken } from './selectors';

function* authenticateUser(action) {
 
  try {
    const response = yield call(HTTPService.post, EndpointService.loginUrl,  action.payload);
    yield put(loginSuccess(response.token));
    const token = yield select(getToken);
  } catch (error) {
    if(error.response.data.message)
    {
    toast.error(error.response.data.message)
    }
    else{
        toast.error("server error")
    }
    yield put(loginFailure(error.response.data.message));
  }
}

export default function* rootSaga() {
  yield takeLatest(LOGIN_REQUEST, authenticateUser);
}