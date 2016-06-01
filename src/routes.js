import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/App';
import HomePageComponent from './components/home/HomePage';
import HolderPageComponent from './components/holder/holderPage';
import AboutPageComponent from './components/about/AboutPage';

export default(
  <Route path="/" component={App}>
    <IndexRoute component={HomePageComponent} />
    <Route path="holder" component={HolderPageComponent} />
    <Route path="about" component={AboutPageComponent} />
  </Route>
);
