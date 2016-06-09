//eslint-disable import/default

import { combineReducers } from 'redux';
import login from './loginReducer';

const rootReducer = combineReducers({
  login
});

export default rootReducer;
