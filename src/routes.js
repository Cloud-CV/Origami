import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import PageNotfoundHandler from './components/PageNotfoundHandler';
import HomePageComponent from './components/home/HomePage';
import AboutPageComponent from './components/about/AboutPage';
import UserProfileComponent from './components/user/userProfile';
import LoginComponent from './components/stateless/login';
import DeploymentPageComponent from './components/deployment/deploymentPage';

export default(
  <Route path="/" component={App}>
    <IndexRoute component={HomePageComponent} />
    <Route path="about" component={AboutPageComponent} />
    <Route path="user" component={UserProfileComponent} />
    <Route path="user/repo/:repoId" component={DeploymentPageComponent} />
    <Route path="login*" component={LoginComponent} />
    <Route path="*" component={PageNotfoundHandler} />
  </Route>
);
