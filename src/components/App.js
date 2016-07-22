import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import { Link, browserHistory } from 'react-router';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import { bindActionCreators } from 'redux';
import * as loginActions from '../actions/loginActions';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import FlatButton from 'material-ui/FlatButton';
import io from 'socket.io-client';

class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      login: false,
      displayLogin: ''
    };
    this.initiateLogin = this.initiateLogin.bind(this);
    this.logout = this.logout.bind(this);
    this.readSessionToken = this.readSessionToken.bind(this);
    this.clearSessionFlag = this.clearSessionFlag.bind(this);
    this.setSessionFlag = this.setSessionFlag.bind(this);
    this.socket = io();
    this.socketId = Math.random().toString(36);
    this.socket.on('connect', () => {
      this.socket.emit('savesessiontoken', this.socketId);
    });
  }

  getChildContext() {
    return {
      socket: this.socket,
      socketId: this.socketId
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.login !== nextProps.login) {
      this.setState({ login: nextProps.login });
    }
    if (window.location.pathname.split('/').slice(-1)[0] === 'demo') {
      this.setState({ displayLogin: 'none' });
    } else {
      this.setState({ displayLogin: '' });
    }
  }

  readSessionToken() {
    return localStorage.getItem('access_token') ? localStorage.getItem('access_token') : false;
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
    window.location = '/auth/github';
  }

  logout() {
    this.props.loginactions.Logout();
    this.clearSessionFlag();
    window.location = '/logout';
  }

  render() {
    if (this.readSessionToken()) {
      this.props.loginactions.Login();
    }
    return (
      <div>
        <AppBar
          title={
            <Link to="/"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              CVFY
            </Link>
          }
          showMenuIconButton = {false}
          iconElementRight={
          this.state.login ?
            <IconMenu
              style={{ display: this.state.displayLogin }}
              iconButtonElement={
                <IconButton><MoreVertIcon /></IconButton>
              }
              targetOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            >
              <MenuItem onTouchTap={this.logout} primaryText="Sign out" />
            </IconMenu>
            :
             <span className="loginButton" style={{ display: this.state.displayLogin }} onClick={this.initiateLogin}>
                <FlatButton label="Login"
                style={{ margin: '5%', color: 'white' }}
                />
             </span>
          }
        />
        <div id="appbar-progress"
             className="ui bottom attached indicating progress"
             style={{ visibility: 'hidden' }}
        >
          <div className="bar"></div>
        </div>
        <div className="ui fluid padded grid">
          {this.props.children}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  loginactions: PropTypes.object.isRequired,
  login: PropTypes.bool.isRequired
};

App.childContextTypes = {
  socket: PropTypes.object.isRequired,
  socketId: PropTypes.string.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    login: state.login
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loginactions: bindActionCreators(loginActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
