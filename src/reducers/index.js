//eslint-disable import/default

import {combineReducers} from 'redux';
import holder from './holderReducer';

const rootReducer = combineReducers({
  holder
});

export default rootReducer;
