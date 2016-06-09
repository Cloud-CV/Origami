//eslint-disable import/default

import { combineReducers } from 'redux';
import login from './loginReducer';
import user from './userReducer';

const rootReducer = combineReducers({
  login,
  user
});

export default rootReducer;
