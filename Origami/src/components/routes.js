import React from "react";
import { Switch, Route } from "react-router-dom";

import PageNotfoundHandler from "./PageNotfoundHandler";
import HomePageComponent from "./home/HomePage";
import URLShortenerComponent from "./urlShortener";
import ShareProfile from "./user/userShareProfile";

import NonGHUserProfileComponent from "./user/nonghUserProfile";

import LoginComponent from "./stateless/login";
import InitialSetupComponent from "./initialSetupPage";

import RegisterNonGHPageComponent
  from "./deployment/UsePrebuiltProject/registerPage";
import SelectInputComponentsNonGHPageComponent
  from "./deployment/UsePrebuiltProject/selectInputComponentPage";
import SelectOutputComponentsNonGHPageComponent
  from "./deployment/UsePrebuiltProject/selectOutputComponentPage";
import NGHDemoPageComponent
  from "./deployment/UsePrebuiltProject/nghDemoPage";
import NGHDemoFrameComponent from "./deployment/UsePrebuiltProject/nghDemoFrame";

export default (
  <Switch>
    <Route exact path="/" component={HomePageComponent} />

    <Route exact path="/ngh/user" component={NonGHUserProfileComponent} />
    <Route exact path="/ngh/user/register" component={RegisterNonGHPageComponent} />
    <Route
      path="/ngh/user/:repoName/:repoId/register/:type?"
      component={RegisterNonGHPageComponent}
    />
    <Route
      path="/ngh/user/:repoName/:repoId/inputcomponent/:type?"
      component={SelectInputComponentsNonGHPageComponent}
    />
    <Route
      path="/ngh/user/:repoName/:repoId/outputcomponent/:type?"
      component={SelectOutputComponentsNonGHPageComponent}
    />
    <Route
      path="/ngh/user/:user_id/:repoName/:repoId/demo"
      component={NGHDemoPageComponent}
    />
    <Route
      path="/frame/ngh/user/:user_id/:repoName/:repoId/demo"
      component={NGHDemoFrameComponent}
    />

    <Route exact path="/initialsetup" component={InitialSetupComponent} />
    <Route path="/p/:shorturl" component={URLShortenerComponent} />
    <Route path="/u/:username/:user_id" component={ShareProfile} />
    <Route path="/login*" component={LoginComponent} />
    <Route path="*" component={PageNotfoundHandler} />
  </Switch>
);
