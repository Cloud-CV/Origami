import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import PageNotfoundHandler from './components/PageNotfoundHandler';
import HomePageComponent from './components/home/HomePage';
import AboutPageComponent from './components/about/AboutPage';
import UserProfileComponent from './components/user/userProfile';
import LoginComponent from './components/login/login';

export default(
  <Route path="/" component={App}>
    <IndexRoute component={HomePageComponent} />
    <Route path="*" component={PageNotfoundHandler} />
    <Route path="about" component={AboutPageComponent} />
    <Route path="user/build" component={UserProfileComponent} />
    <Route path="login*" component={LoginComponent} />
  </Route>
);
