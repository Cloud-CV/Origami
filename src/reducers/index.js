//eslint-disable import/default

import { combineReducers } from 'redux';
import login from './loginReducer';
import user from './userReducer';
import githubDemoModel from './githubDemoModelReducer';
import nonghDemoModel from './nonghDemoModelReducer';
import inputComponentDemoModel from './inputComponentDemoModelReducer';
import outputComponentDemoModel from './outputComponentDemoModelReducer';

const rootReducer = combineReducers({
  login,
  user,
  githubDemoModel,
  nonghDemoModel,
  inputComponentDemoModel,
  outputComponentDemoModel
});

export default rootReducer;
