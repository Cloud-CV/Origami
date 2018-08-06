//eslint-disable import/default

import { combineReducers } from "redux";
import login from "./loginReducer";
import user from "./userReducer";
import nonghDemoModel from "./nonghDemoModelReducer";
import inputComponentDemoModel from "./inputComponentDemoModelReducer";
import outputComponentDemoModel from "./outputComponentDemoModelReducer";
import activeUser from "./activeUser"

const rootReducer = combineReducers({
  login,
  user,
  nonghDemoModel,
  inputComponentDemoModel,
  outputComponentDemoModel,
  activeUser
});

export default rootReducer;
