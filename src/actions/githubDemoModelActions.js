import * as types from './actionTypes';

export function updateGithubDemoModelSuccess(model) {
  return {type: types.BUILD_NEW_GITHUB_DEMO_MODEL_SUCCESS, model};
}

export function killGithubDemoModelSuccess() {
  return {type: types.KILL_GITHUB_DEMO_MODEL_SUCCESS};
}

export function updateGithubDemoModel(newModelData) {
  return function(dispatch) {
    return new Promise((resolve, reject) => {
      dispatch(updateGithubDemoModelSuccess(newModelData));
      resolve('dispatched github model update call');
    });
  };
}

export function killGithubDemoModel() {
  return function(dispatch) {
    return new Promise((reject, resolve) => {
      dispatch(killGithubDemoModelSuccess());
    });
  };
}
