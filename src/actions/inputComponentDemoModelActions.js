import * as types from './actionTypes';

export function updateInputComponentModelSuccess(model) {
  return {type: types.ADD_INPUT_COMPONENT_DEMO_MODEL_SUCCESS, model};
}

export function killInputComponentModelSuccess() {
  return {type: types.KILL_INPUT_COMPONENT_DEMO_MODEL_SUCCESS};
}

export function updateInputComponentModel(newModelData) {
  return function(dispatch) {
    return new Promise((resolve, reject) => {
      dispatch(updateInputComponentModelSuccess(newModelData));
      resolve('dispatched input component model update call');
    });
  };
}

export function killInputComponentModel() {
  return function(dispatch) {
    return new Promise((reject, resolve) => {
      dispatch(killInputComponentModelSuccess());
    });
  };
}
