import React from "react";
import DefaultLayout from "../ui/src/containers/DefaultLayout";
import HomePageComponent from "./home/HomePage";
import NonGHUserProfileComponent from "./user/nonghUserProfile";
import LoginComponent from "./stateless/login";
import URLShortenerComponent from "./urlShortener";
import NGHDemoPageComponent from "./deployment/UsePrebuiltProject/nghDemoPage";
import RegisterNonGHPageComponent from "./deployment/UsePrebuiltProject/registerPage";
import ShareProfile from "./user/userShareProfile";
import InstructionsPage from './deployment/UsePrebuiltProject/instructionsPage'
import DemoPage from './deployment/UsePrebuiltProject/demoPage'
import InitialSetupComponent from "./initialSetupPage";
import SelectDemoCompare from "./compare/select";
import DemoCompare from "./compare/demo_compare";

const routes = [
  { path: '/home', name: 'Dashboard', component: HomePageComponent },
  { path: '/', exact: true, name: 'Home', component: DefaultLayout },
  { path: '/u/:username/:user_id', name: 'user', component: ShareProfile },
  { path: '/p/:shorturl', exact: true, name: 'short', component: URLShortenerComponent },
  { path: '/demo_register', exact: true, name: 'Create demo', component: RegisterNonGHPageComponent },
  { path: '/login*', name: 'login', component: LoginComponent },
  { path: '/ngh/user',exact: true,name:'My Demo', component:NonGHUserProfileComponent },
  { path: '/instructions/:user_id/:repoId/bundle',exact: true, component:InstructionsPage },
  { path: '/demo/:user_id/:repoId/page', component:DemoPage },
  { path: '/initialsetup',exact:true, component:InitialSetupComponent },
  { path: '/compare_select',exact:true, component:SelectDemoCompare },
  { path: '/demo_compare', component:DemoCompare },
];

export default routes;