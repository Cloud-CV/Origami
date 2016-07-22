import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import PageNotfoundHandler from './components/PageNotfoundHandler';
import HomePageComponent from './components/home/HomePage';
import DocumentationFrontPageComponent from './components/docs/documentation/DocumentationFrontpage';
import GettingStartedFrontPageComponent from './components/docs/gettingstarted/GettingStartedFrontpage';
import GHUserProfileComponent from './components/user/ghUserProfile';
import NonGHUserProfileComponent from './components/user/nonghUserProfile';
import LoginComponent from './components/stateless/login';
import InitialSetupComponent from './components/initialSetupPage';
import RegisterGithubPageComponent from './components/deployment/BuildWIthGithub/registerPage';
import RegisterNonGHPageComponent from './components/deployment/UsePrebuiltProject/registerPage';
import SelectInputComponentsGithubPageComponent from './components/deployment/BuildWIthGithub/selectInputComponentPage';
import SelectInputComponentsNonGHPageComponent from './components/deployment/UsePrebuiltProject/selectInputComponentPage';
import SelectOutputComponentsGithubPageComponent from './components/deployment/BuildWIthGithub/selectOutputComponentPage';
import SelectOutputComponentsNonGHPageComponent from './components/deployment/UsePrebuiltProject/selectOutputComponentPage';
import GHBuildPageComponent from './components/deployment/BuildWIthGithub/ghBuildPage';
import GHDemoPageComponent from './components/deployment/BuildWIthGithub/ghDemoPage';
import NGHDemoPageComponent from './components/deployment/UsePrebuiltProject/nghDemoPage';

export default(
  <Route path="/" component={App}>
    <IndexRoute component={HomePageComponent} />
    <Route path="documentation" component={DocumentationFrontPageComponent} />
    <Route path="gettingstarted" component={GettingStartedFrontPageComponent} />

    <Route path="user" component={GHUserProfileComponent} />
    <Route path="user/repo/:repoName/:repoId" component={RegisterGithubPageComponent} />
    <Route path="user/repo/:repoName/:repoId/inputcomponent" component={SelectInputComponentsGithubPageComponent} />
    <Route path="user/repo/:repoName/:repoId/outputcomponent" component={SelectOutputComponentsGithubPageComponent} />
    <Route path="user/repo/:repoName/:repoId/build" component={GHBuildPageComponent} />
    <Route path="user/repo/:repoName/:repoId/demo" component={GHDemoPageComponent} />

    <Route path="ngh/user" component={NonGHUserProfileComponent} />
    <Route path="ngh/user/register" component={RegisterNonGHPageComponent} />
    <Route path="ngh/user/:repoName/:repoId/register(/:type)" component={RegisterNonGHPageComponent} />
    <Route path="ngh/user/:repoName/:repoId/inputcomponent(/:type)" component={SelectInputComponentsNonGHPageComponent} />
    <Route path="ngh/user/:repoName/:repoId/outputcomponent(/:type)" component={SelectOutputComponentsNonGHPageComponent} />
    <Route path="ngh/user/:repoName/:repoId/demo" component={NGHDemoPageComponent} />

    <Route path="initialsetup" component={InitialSetupComponent} />
    <Route path="login*" component={LoginComponent} />
    <Route path="*" component={PageNotfoundHandler} />
  </Route>
);
