import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function holderReducer(state = initialState.holder, action) {
  switch (action.type) {
    case types.LOAD_HOLDER_SUCCESS:
      return action.holder;
    case types.ADD_HOLDER_SUCCESS:
      return [
        ...state,
        ...action.holder
      ];
    default:
      return state;
  }
}
