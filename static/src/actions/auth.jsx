import { browserHistory } from 'react-router';

import { endpoints, actions } from './constants';
import { apiPost } from './utils';

export function loginUser(username, password) {
  return apiPost(endpoints.LOGIN, { username, password }, false);
}

const logoutAction = { type: actions.LOGOUT };

export function logoutUser() {
  return (dispatch) => dispatch(logoutAction);
}

export function changePassword(currentPassword, newPassword) {
  return apiPost(endpoints.CHANGE_PASSWORD, {currentPassword, newPassword}, true);
}

export function validateToken(token) {
  return apiPost(endpoints.VALIDATE_TOKEN, {token}, false);
}