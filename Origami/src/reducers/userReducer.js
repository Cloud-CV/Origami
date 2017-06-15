import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function userReducer(state = initialState.user, action) {
  switch (action.type) {
    case types.ENABLE_USER_LOAD:
      return action.user;
    default:
      return state;
  }
}
