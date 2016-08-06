import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';
import App from './components/App';

import PageNotfoundHandler from './components/PageNotfoundHandler';
import HomePageComponent from './components/home/HomePage';
import URLShortenerComponent from './components/urlShortener';

import LibConfigDocsPageComponent from './components/docs/libdocs/Configuration';
import LibRegistrationDocsPageComponent from './components/docs/libdocs/Registration';
import LibPipelineDocsPageComponent from './components/docs/libdocs/Pipeline';
import LibInputDocsPageComponent from './components/docs/libdocs/Input';
import LibOutputDocsPageComponent from './components/docs/libdocs/Output';
import LibTerminalDocsPageComponent from './components/docs/libdocs/Terminal';

import GettingStartedConfigurationPageComponent from './components/docs/gettingstarted/Configuration';
import GettingStartedCreatePageComponent from './components/docs/gettingstarted/Create';
import GettingStartedIOPageComponent from './components/docs/gettingstarted/IO';
import GettingStartedPublishPageComponent from './components/docs/gettingstarted/Publish';
import GettingStartedModifyPageComponent from './components/docs/gettingstarted/Modify';

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

    <Redirect from="libdocs" to="/libdocs/configuration" />
    <Route path="libdocs">
      <Route path="configuration" component={LibConfigDocsPageComponent}/>
      <Route path="registration" component={LibRegistrationDocsPageComponent}/>
      <Route path="pipeline" component={LibPipelineDocsPageComponent}/>
      <Route path="input" component={LibInputDocsPageComponent}/>
      <Route path="output" component={LibOutputDocsPageComponent}/>
      <Route path="terminal" component={LibTerminalDocsPageComponent}/>
    </Route>

    <Redirect from="gettingstarted" to="/gettingstarted/configuration" />
    <Route path="gettingstarted">
      <Route path="configuration" component={GettingStartedConfigurationPageComponent}/>
      <Route path="create" component={GettingStartedCreatePageComponent}/>
      <Route path="io" component={GettingStartedIOPageComponent}/>
      <Route path="publish" component={GettingStartedPublishPageComponent}/>
      <Route path="modify" component={GettingStartedModifyPageComponent}/>
    </Route>

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
    <Route path="ngh/user/:userid/:repoName/:repoId/demo" component={NGHDemoPageComponent} />

    <Route path="initialsetup" component={InitialSetupComponent} />
    <Route path="p/:shorturl" component={URLShortenerComponent} />
    <Route path="login*" component={LoginComponent} />
    <Route path="*" component={PageNotfoundHandler} />
  </Route>
);
