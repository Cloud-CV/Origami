//eslint-disable import/default

import {combineReducers} from 'redux';
import holder from './holderReducer';
import login from './loginReducer';

const rootReducer = combineReducers({
  holder,
  login
});

export default rootReducer;
