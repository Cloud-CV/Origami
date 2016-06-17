import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function githubDemoModelReducer(state = initialState.githubDemoModel, action) {
  switch (action.type) {
    case types.BUILD_NEW_GITHUB_DEMO_MODEL_SUCCESS:
      return Object.assign(
        Object.assign({}, state), action.model);
    case types.KILL_GITHUB_DEMO_MODEL_SUCCESS:
      return initialState.githubDemoModel;
    default:
      return state;
  }
}
