import React from "react";
import { Route, IndexRoute, Redirect } from "react-router";
import App from "./components/App";

import PageNotfoundHandler from "./components/PageNotfoundHandler";
import HomePageComponent from "./components/home/HomePage";
import URLShortenerComponent from "./components/urlShortener";
import ShareProfile from "./components/user/userShareProfile";

import LibConfigDocsPageComponent
  from "./components/docs/libdocs/Configuration";
import LibRegistrationDocsPageComponent
  from "./components/docs/libdocs/Registration";
import LibInputDocsPageComponent from "./components/docs/libdocs/Input";
import LibOutputDocsPageComponent from "./components/docs/libdocs/Output";
import LibTerminalDocsPageComponent from "./components/docs/libdocs/Terminal";

import GettingStartedConfigurationPageComponent
  from "./components/docs/gettingstarted/Configuration";
import GettingStartedCreatePageComponent
  from "./components/docs/gettingstarted/Create";
import GettingStartedIOPageComponent from "./components/docs/gettingstarted/IO";
import GettingStartedPublishPageComponent
  from "./components/docs/gettingstarted/Publish";
import GettingStartedModifyPageComponent
  from "./components/docs/gettingstarted/Modify";

import NonGHUserProfileComponent from "./components/user/nonghUserProfile";

import LoginComponent from "./components/stateless/login";
import InitialSetupComponent from "./components/initialSetupPage";

import RegisterNonGHPageComponent
  from "./components/deployment/UsePrebuiltProject/registerPage";
import SelectInputComponentsNonGHPageComponent
  from "./components/deployment/UsePrebuiltProject/selectInputComponentPage";
import SelectOutputComponentsNonGHPageComponent
  from "./components/deployment/UsePrebuiltProject/selectOutputComponentPage";
import NGHDemoPageComponent
  from "./components/deployment/UsePrebuiltProject/nghDemoPage";

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePageComponent} />

    <Redirect from="libdocs" to="/libdocs/configuration" />
    <Route path="libdocs">
      <Route path="configuration" component={LibConfigDocsPageComponent} />
      <Route path="registration" component={LibRegistrationDocsPageComponent} />
      <Route path="input" component={LibInputDocsPageComponent} />
      <Route path="output" component={LibOutputDocsPageComponent} />
      <Route path="terminal" component={LibTerminalDocsPageComponent} />
    </Route>

    <Redirect from="gettingstarted" to="/gettingstarted/configuration" />
    <Route path="gettingstarted">
      <Route
        path="configuration"
        component={GettingStartedConfigurationPageComponent}
      />
      <Route path="create" component={GettingStartedCreatePageComponent} />
      <Route path="io" component={GettingStartedIOPageComponent} />
      <Route path="publish" component={GettingStartedPublishPageComponent} />
      <Route path="modify" component={GettingStartedModifyPageComponent} />
    </Route>

    <Route path="ngh/user" component={NonGHUserProfileComponent} />
    <Route path="ngh/user/register" component={RegisterNonGHPageComponent} />
    <Route
      path="ngh/user/:repoName/:repoId/register(/:type)"
      component={RegisterNonGHPageComponent}
    />
    <Route
      path="ngh/user/:repoName/:repoId/inputcomponent(/:type)"
      component={SelectInputComponentsNonGHPageComponent}
    />
    <Route
      path="ngh/user/:repoName/:repoId/outputcomponent(/:type)"
      component={SelectOutputComponentsNonGHPageComponent}
    />
    <Route
      path="ngh/user/:userid/:repoName/:repoId/demo"
      component={NGHDemoPageComponent}
    />

    <Route path="initialsetup" component={InitialSetupComponent} />
    <Route path="p/:shorturl" component={URLShortenerComponent} />
    <Route path="u/:username/:userid" component={ShareProfile} />
    <Route path="login*" component={LoginComponent} />
    <Route path="*" component={PageNotfoundHandler} />
  </Route>
);
