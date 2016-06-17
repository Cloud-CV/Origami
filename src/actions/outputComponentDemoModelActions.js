import * as types from './actionTypes';

export function updateOutputComponentModelSuccess(model) {
  return {type: types.ADD_OUTPUT_COMPONENT_DEMO_MODEL_SUCCESS, model};
}

export function killOutputComponentModelSuccess() {
  return {type: types.KILL_OUTPUT_COMPONENT_DEMO_MODEL_SUCCESS};
}

export function updateOutputComponentModel(newModelData) {
  return function(dispatch) {
    return new Promise((resolve, reject) => {
      dispatch(updateOutputComponentModelSuccess(newModelData));
      resolve('dispatched output component model update call');
    });
  };
}

export function killOutputComponentModel() {
  return function(dispatch) {
    return new Promise((reject, resolve) => {
      dispatch(killOutputComponentModelSuccess());
    });
  };
}
