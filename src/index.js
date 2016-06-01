/*eslint-disable  import/default */

import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Router, browserHistory} from 'react-router';
import routes from './routes';
import configureStore from './store/configureStore.js';
import {loadHolder} from './actions/holderActions';
import '../node_modules/semantic-ui-css/semantic.min.css';
import '../node_modules/semantic-ui-css/semantic.min';
import '../node_modules/toastr/build/toastr.min.css';
import './styles/styles.css';

const store = configureStore();
store.dispatch(loadHolder());

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes}/>
  </Provider>,
    document.getElementById('app')
);
