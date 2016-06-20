import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function githubDemoModelReducer(state = initialState.nonghDemoModel, action) {
  switch (action.type) {
    case types.BUILD_NEW_NONGH_DEMO_MODEL_SUCCESS:
      return Object.assign({}, action.model);
    case types.KILL_NONGH_DEMO_MODEL_SUCCESS:
      return initialState.nonghDemoModel;
    default:
      return state;
  }
}
