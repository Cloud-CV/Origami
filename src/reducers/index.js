//eslint-disable import/default

import { combineReducers } from 'redux';
import login from './loginReducer';
import user from './userReducer';
import githubDemoModel from './githubDemoModelReducer';

const rootReducer = combineReducers({
  login,
  user,
  githubDemoModel
});

export default rootReducer;
