import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function loginReducer(state = initialState.login, action) {
  switch (action.type) {
    case types.ENABLE_LOGIN_SUCCESS:
      return true;
    case types.DISABLE_LOGIN_SUCCESS:
      return false;
    default:
      return state;
  }
}
