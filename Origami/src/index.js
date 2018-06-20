/*eslint-disable  import/default */

import "babel-polyfill";
import injectTapEventPlugin from "react-tap-event-plugin";
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App";
import configureStore from "./store/configureStore";
import "../../node_modules/semantic-ui-css/semantic.min.css";
import "../../node_modules/semantic-ui-css/semantic.min";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import "../../node_modules/toastr/build/toastr.min.css";
import "../../node_modules/antd/dist/antd.css";
import '@coreui/icons/css/coreui-icons.min.css';
import 'flag-icon-css/css/flag-icon.min.css';

import 'simple-line-icons/css/simple-line-icons.css';
import './ui/src/scss/style.css';
require('font-awesome/css/font-awesome.css');
import { LocaleProvider } from "antd";
import enUS from "antd/lib/locale-provider/en_US";
const store = configureStore();
injectTapEventPlugin();

const muiTheme = getMuiTheme({
  appBar: {
    height: 45
  }
});

render(
  <LocaleProvider locale={enUS}>
    <Provider store={store}>
      <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MuiThemeProvider>
    </Provider>
  </LocaleProvider>,
  document.getElementById("root")
);
