import axios from 'axios';
import { requestStatus } from './constants';

function sendingRequest(endpoint, data) {
  return {
    type: endpoint,
    status: requestStatus.REQUESTING,
    payload: {data},
  };
}

function successResponse(response, endpoint, data) {
  return {
    type: endpoint,
    status: requestStatus.SUCCESS,
    payload: {response, data}
  };
}

function failedResponse(error, endpoint, data) {
  return {
    type: endpoint,
    status: requestStatus.FAILURE,
    payload: {error, data}
  };
}

function tokenConfig(getState){
  const token = getState().auth.token;
  return {
    headers: { 'Authorization': token } // eslint-disable-line quote-props
  };
}

function getReqConfig(data, authRequired, getState) {
  if (authRequired) {
    return {...tokanConfig(getState), params: data};
  } else {
    return { params: data };
  }
}
export function apiGet(endpoint, data, authRequired) {
  return function (dispatch, getState) {
    dispatch(sendingRequest(endpoint, data));
    return axios.get(endpoint, getReqConfig(data, authRequired, getState))
      .then((response) => response.data)
      .then((response) => {
        if (response.result == 'success') {
          dispatch(successResponse(response, endpoint, data))
        } else {
          dispatch(failedResponse(response, endpoint, data))
        }
      })
      .catch((error) => {
        dispatch(failedResponse(error, endpoint, data))
      });
  }
}

export function apiPost(endpoint, data, authRequired) {
  return function (dispatch, getState) {
    dispatch(sendingRequest(endpoint, data));
    return axios.post(endpoint, data, authRequired ? tokenConfig(getState) : {})
      .then((response) => response.data)
      .then((response) => {
        if (response.result == 'success') {
          dispatch(successResponse(response, endpoint, data))
        } else {
          dispatch(failedResponse(response, endpoint, data))
        }
      })
      .catch((error) => {
        console.log('error??');
        dispatch(failedResponse(error, endpoint, data))
      });
  }  
}