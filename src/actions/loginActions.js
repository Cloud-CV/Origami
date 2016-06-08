import * as types from './actionTypes';

export function enableLoginSuccess() {
  return {type: types.ENABLE_LOGIN_SUCCESS};
}

export function disableLoginSuccess() {
  return {type: types.DISABLE_LOGIN_SUCCESS};
}

export function Login() {
  return function(dispatch) {
    dispatch(enableLoginSuccess());
  };
}

export function Logout() {
  return function(dispatch) {
    dispatch(disableLoginSuccess());
  };
}
