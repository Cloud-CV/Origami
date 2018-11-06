import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';

import {
  AppAside,
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from '../../_nav';
// routes config
import routes from '../../../../components/nav_root';
import DefaultAside from './DefaultAside';
import DefaultFooter from './DefaultFooter';
import DefaultHeader from './DefaultHeader';
import HomePage from '../../../../components/home/HomePage'
import ReactDOM from 'react-dom';

class DefaultLayout extends Component {
constructor(props, context) {
  super(props, context);
  this.state={
    mounted:false,
    open:false
  }
  this.minimizerRef = React.createRef();

}

ComponentDidMount(){
  this.setState({mounted:true})
}


click(){
  console.log("clicked")
}

  simulateClick() {
    this.minimizerRef.current.handleClick()
  }

  handleClick() {
    this.setState({open:!open},this.simulateClick())
  }

  render() {
      if(window.location.pathname==="/")
  {
    return <Redirect to='/home'  />
  }
    return (
      <div className="app">
        <AppHeader fixed>
          <DefaultHeader click={this.handleClick.bind(this)}/>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader  />
            <AppSidebarForm />
            <AppSidebarNav className="nav-side" navConfig={navigation} {...this.props} />
            <AppSidebarFooter />
            <AppSidebarMinimizer ref={this.minimizerRef}   />
          </AppSidebar>
          <main className="main">
            <Container fluid>
              <Switch>
                {routes.map((route, idx) => {
                    if (route.redirect) {
                      const redirected = routes.filter(r => r.path === route.to)[0];

                      return (
                        <Route key={idx} path={route.path} name={redirected.name} render={props => (
                          <redirected.component {...props} />
                        )} />
                      );
                    } else if (route.component) {
                      return (
                        <Route key={idx} path={route.path} exact={route.exact} name={route.name} render={props => (
                          <route.component {...props} />
                        )} />
                      );
                    } else {
                      return null;
                    }
                  }
                )}
              </Switch>
            </Container>
          </main>
          <AppAside fixed hidden onClick={this.click.bind(this)}>
            <DefaultAside onClick={this.click.bind(this)}/>
          </AppAside>
        </div>
        <AppFooter>
          <DefaultFooter />
        </AppFooter>
      </div>
    );
  }
}

export default DefaultLayout;
