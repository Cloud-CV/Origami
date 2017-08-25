import React from "react";
import { Route, IndexRoute, Redirect } from "react-router";
import App from "./components/App";

import PageNotfoundHandler from "./components/PageNotfoundHandler";
import HomePageComponent from "./components/home/HomePage";
import URLShortenerComponent from "./components/urlShortener";
import ShareProfile from "./components/user/userShareProfile";

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
import NGHDemoFrameComponent from "./components/deployment/UsePrebuiltProject/nghDemoFrame";

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePageComponent} />

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
      path="ngh/user/:user_id/:repoName/:repoId/demo"
      component={NGHDemoPageComponent}
    />
    <Route
      path="frame/ngh/user/:user_id/:repoName/:repoId/demo"
      component={NGHDemoFrameComponent}
    />

    <Route path="initialsetup" component={InitialSetupComponent} />
    <Route path="p/:shorturl" component={URLShortenerComponent} />
    <Route path="u/:username/:user_id" component={ShareProfile} />
    <Route path="login*" component={LoginComponent} />
    <Route path="*" component={PageNotfoundHandler} />
  </Route>
);
