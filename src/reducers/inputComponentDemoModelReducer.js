import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function inputComponentDemoModelReducer(state = initialState.inputComponentDemoModel, action) {
  switch (action.type) {
  case types.ADD_INPUT_COMPONENT_DEMO_MODEL_SUCCESS:
    return Object.assign(
        Object.assign({}, state), action.model);
  case types.KILL_INPUT_COMPONENT_DEMO_MODEL_SUCCESS:
    return initialState.inputComponentDemoModel;
  default:
    return state;
  }
}
