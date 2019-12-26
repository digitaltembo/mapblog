import jwtDecode from 'jwt-decode';
import moment from 'moment';

import { createReducer } from './index';

import { endpoints, actions, requestStatus } from '../actions/constants';


const initialState = {
  token: '',
  data: null,
  isAuthenticated: false,
  authTime: null,
};

function loginSuccess(state, payload) {
  const token = payload.response.data.token;
  localStorage.setItem('token', token);
  console.log("logged in!!", token);
  return {
    ...state,
    isAuthenticating: false,
    token: token,
    data: jwtDecode(token),
    authTime: moment(),
    statusText: 'You have been successfully logged in.',
  };
}
function loginFailure(state, payload) {
  return {
    ...state,
    isAuthenticating: false,
    token: null,
    data: null,
    statusText: `Authentication Error: ${payload.error.status} ${payload.error.statusText}`,
  };
}

export default createReducer(initialState, {
  [endpoints.LOGIN]: {
    [requestStatus.REQUESTING]: (state) => ({
      ...state,
      isAuthenticating: true,
      statusText: '',
    }),
    [requestStatus.SUCCESS]: loginSuccess,
    [requestStatus.FAILURE]: loginFailure,
  },
  [endpoints.VALIDATE_TOKEN]: {
    [requestStatus.SUCCESS]: loginSuccess,
    [requestStatus.FAILURE]: loginFailure,
  },
  [actions.LOGOUT]: (state) => ({
    ...state,
    token: null,
    data: null,
  }),

});
