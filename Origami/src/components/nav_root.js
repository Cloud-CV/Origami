import React from "react";
import DefaultLayout from "../ui/src/containers/DefaultLayout";
import HomePageComponent from "./home/HomePage";
import NonGHUserProfileComponent from "./user/nonghUserProfile";
import LoginComponent from "./stateless/login";
import URLShortenerComponent from "./urlShortener";
import NGHDemoPageComponent from "./deployment/UsePrebuiltProject/nghDemoPage";
import RegisterNonGHPageComponent from "./deployment/UsePrebuiltProject/registerPage";
import ShareProfile from "./user/userShareProfile";
import InitialSetupComponent from "./initialSetupPage";

const routes = [
  { path: '/home', name: 'Dashboard', component: HomePageComponent },
  { path: '/', exact: true, name: 'Home', component: DefaultLayout },
  { path: '/u/:username/:user_id', name: 'user', component: ShareProfile },
  { path: '/p/:shorturl', exact: true, name: 'short', component: URLShortenerComponent },
  { path: '/demo_register', exact: true, name: 'Create demo', component: RegisterNonGHPageComponent },
  { path: '/login*', name: 'login', component: LoginComponent },
  { path: '/initialsetup',exact: true, name: 'initialsetup', component:InitialSetupComponent },
  { path: '/ngh/user',exact: true,name:'My Demo', component:NonGHUserProfileComponent },

];


export default routes;

