import * as types from './actionTypes';

export function updateInputComponentModeSuccess(model) {
  return {type: types.ADD_INPUT_COMPONENT_DEMO_MODEL_SUCCESS, model};
}

export function updateInputComponentModel(newModelData) {
  return function(dispatch) {
    return new Promise((resolve, reject) => {
      dispatch(updateInputComponentModeSuccess(newModelData));
      resolve('dispatched input component model update call');
    });
  };
}
