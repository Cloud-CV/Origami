import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import PageNotfoundHandler from './components/PageNotfoundHandler';
import HomePageComponent from './components/home/HomePage';
import AboutPageComponent from './components/about/AboutPage';
import UserProfileComponent from './components/user/userProfile';
import LoginComponent from './components/stateless/login';
import RegisterGithubPageComponent from './components/deployment/BuildWIthGithub/registerPage';
import SelectInputComponentsGithubPageComponent from './components/deployment/BuildWIthGithub/selectInputComponentPage';
import SelectOutputComponentsGithubPageComponent from './components/deployment/BuildWIthGithub/selectOutputComponentPage';
import GHBuildPageComponent from './components/deployment/BuildWIthGithub/ghBuildPage';
import GHDemoPageComponent from './components/deployment/BuildWIthGithub/ghDemoPage';

export default(
  <Route path="/" component={App}>
    <IndexRoute component={HomePageComponent} />
    <Route path="about" component={AboutPageComponent} />
    <Route path="user" component={UserProfileComponent} />
    <Route path="user/repo/:repoName/:repoId" component={RegisterGithubPageComponent} />
    <Route path="user/repo/:repoName/:repoId/inputcomponent" component={SelectInputComponentsGithubPageComponent} />
    <Route path="user/repo/:repoName/:repoId/outputcomponent" component={SelectOutputComponentsGithubPageComponent} />
    <Route path="user/repo/:repoName/:repoId/build" component={GHBuildPageComponent} />
    <Route path="user/repo/:repoName/:repoId/demo" component={GHDemoPageComponent} />
    <Route path="login*" component={LoginComponent} />
    <Route path="*" component={PageNotfoundHandler} />
  </Route>
);
