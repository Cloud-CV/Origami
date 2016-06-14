//eslint-disable import/default

import { combineReducers } from 'redux';
import login from './loginReducer';
import user from './userReducer';
import githubDemoModel from './githubDemoModelReducer';
import inputComponentDemoModel from './inputComponentDemoModelReducer';

const rootReducer = combineReducers({
  login,
  user,
  githubDemoModel,
  inputComponentDemoModel
});

export default rootReducer;
