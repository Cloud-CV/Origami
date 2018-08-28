import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import { Link, withRouter } from 'react-router-dom';
import Routes from './routes';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import { bindActionCreators } from 'redux';
import * as loginActions from '../actions/loginActions';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import FlatButton from 'material-ui/FlatButton';
import io from 'socket.io-client';
import toastr from 'toastr';
import userApi from '../api/Github/userApi';
import { Layout, Menu, Icon, Button, Card, Row, Col, Input } from 'antd';
import * as rootApi from '../api/CommonLocal/rootSettingsApi';
import { ORIGAMI_READ_THE_DOCS } from '../constants';
import './index.css';
import '@coreui/icons/css/coreui-icons.min.css';
import 'flag-icon-css/css/flag-icon.min.css';
import 'simple-line-icons/css/simple-line-icons.css';
import 'font-awesome/css/font-awesome.min.css';
import  Profile from './user/user_github_profile';


const { Header, Content, Footer, Sider } = Layout;

class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      login: false,
      displayLogin: '',
      showTitle: true,
      isFrame: window.location.pathname.split('/')[1] === 'frame',
      isRoot: false,
    };

    this.initiateLogin = this.initiateLogin.bind(this);
    this.logout = this.logout.bind(this);
    this.readSessionToken = this.readSessionToken.bind(this);
    this.clearSessionFlag = this.clearSessionFlag.bind(this);
    this.setSessionFlag = this.setSessionFlag.bind(this);
    let ws_scheme = 'ws';
    this.socket = new WebSocket(`${ws_scheme}://${window.location.host}/chat/`);
    let socket = this.socket;
    this.socketId = Math.random().toString(36);
    socket.onopen = function() {
      socket.send(
        JSON.stringify({
          event: 'ConnectionEstablished',
          socketId: this.socketId,
        })
      );
    }.bind(this);
  }

  getChildContext() {
    return {
      socket: this.socket,
      socketId: this.socketId,
    };
  }

  componentWillMount() {
    if (
      window.location.pathname.split('/').slice(-1)[0] === 'demo' ||
      window.location.pathname.split('/')[1] === 'initialsetup'
    ) {
      this.setState({ displayLogin: 'none' });
    } else {
      this.setState({ displayLogin: '' });
    }

    rootApi
      .checkRootSettings()
      .then(data => {
        if (
          window.location.pathname !== "/initialsetup" &&
          JSON.parse(data).root_user_github_login_id === null
        ) {
          window.location = "/initialsetup";
        }
        if (
          JSON.parse(data).root_user_github_login_name ===
          localStorage.getItem("username")
        ) {
          this.setState({ isRoot: true });
        }
      })
      .catch(err => {
        toastr.error("Unauthorized");
        setTimeout(() => {
          $("#appbar-progress").css("visibility", "hidden");
          $("#appbar-progress").progress({
            percent: "0%"
          });
        }, 600);
      });


    

  }

  componentDidMount() {
    if (this.props.location.pathname === '/') {
      $('#appbar-progress').css('display', 'None');
    } else {
      $('#appbar-progress').css('display', '');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.login !== nextProps.login) {
      this.setState({ login: nextProps.login });
    }
  }

  readSessionToken() {
    return localStorage.getItem('access_token')
      ? localStorage.getItem('access_token')
      : false;
  }

  clearSessionFlag() {
    localStorage.clear();
  }

  setSessionFlag(access_token, username) {
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('username', username);
    localStorage.setItem('gh_access_token_time', Date.now());
  }

  initiateLogin() {
    window.location = '/auth/github/login/';
  }

  logout() {
    this.props.loginactions.Logout();
    this.clearSessionFlag();
    window.location = '/';
  }

  getDocs() {
    window.location = ORIGAMI_READ_THE_DOCS;
  }

  render() {
    if (this.props.location.pathname === '/') {
      $('#appbar-progress').css('display', 'None');
    } else {
      $('#appbar-progress').css('display', '');
    }

    if (this.readSessionToken()) {
      this.props.loginactions.Login();
    }

    if (this.state.isFrame) {
      return <Layout style={{ background: '#FEFEFE' }}>{Routes}</Layout>;
    }

    return (
      <Layout
        id="layout"
        style={{ height: '100vh', width: '100%', backgroundColor: '#F7F7F7' }}
      >
        {Routes}
      </Layout>
    );
  }
}

App.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  loginactions: PropTypes.object.isRequired,
  login: PropTypes.bool.isRequired,
};

App.childContextTypes = {
  socket: PropTypes.object.isRequired,
  socketId: PropTypes.string.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    login: state.login,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loginactions: bindActionCreators(loginActions, dispatch),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
