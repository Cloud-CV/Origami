import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function outputComponentDemoModelReducer(state = initialState.outputComponentDemoModel, action) {
  switch (action.type) {
  case types.ADD_OUTPUT_COMPONENT_DEMO_MODEL_SUCCESS:
    return Object.assign(
      Object.assign({}, state), action.model
    );
  case types.KILL_OUTPUT_COMPONENT_DEMO_MODEL_SUCCESS:
    return initialState.outputComponentDemoModel;
  default:
    return state;
  }
}
