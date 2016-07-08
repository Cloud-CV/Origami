import * as types from './actionTypes';
import userApi from '../api/Github/userApi';

export function enableUserLoad(user) {
  let userJSON = JSON.parse(user);
  return { type: types.ENABLE_USER_LOAD, user: userJSON };
}

export function LoadUser() {
  return function(dispatch) {
    return userApi.userProfile().then((user) => {
      dispatch(enableUserLoad(user));
    })
      .catch((err) => {
        throw (err);
      });
  };
}
