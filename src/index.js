/*eslint-disable  import/default */

import "babel-polyfill";
import injectTapEventPlugin from "react-tap-event-plugin";
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { Router, browserHistory } from "react-router";
import routes from "./routes";
import configureStore from "./store/configureStore";
import "../node_modules/semantic-ui-css/semantic.min.css";
import "../node_modules/semantic-ui-css/semantic.min";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import "../node_modules/toastr/build/toastr.min.css";

const store = configureStore();
injectTapEventPlugin();

const muiTheme = getMuiTheme({
  appBar: {
    height: 45
  }
});

render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
      <Router history={browserHistory} routes={routes} />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById("app")
);
