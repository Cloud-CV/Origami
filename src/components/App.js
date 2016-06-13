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

class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      login: false
    };
    this.popoutToggle = this.popoutToggle.bind(this);
    this.logout = this.logout.bind(this);
    this.PopupCenter = this.PopupCenter.bind(this);
    this.readSessionToken = this.readSessionToken.bind(this);
    this.clearSessionFlag = this.clearSessionFlag.bind(this);
    this.setSessionFlag = this.setSessionFlag.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.login != nextProps.login) {
      this.setState({login: nextProps.login});
    }
  }

  readSessionToken() {
    return sessionStorage.getItem('access_token') ? sessionStorage.getItem('access_token') : false;
  }

  clearSessionFlag() {
    sessionStorage.clear();
  }

  setSessionFlag(access_token, username) {
    sessionStorage.setItem('access_token', access_token);
    sessionStorage.setItem('username', username);
  }

  PopupCenter(url, title, w, h) {
    let dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
    let dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;

    let width = window.innerWidth ?
      window.innerWidth : document.documentElement.clientWidth ?
      document.documentElement.clientWidth : screen.width;
    let height = window.innerHeight ?
      window.innerHeight : document.documentElement.clientHeight ?
      document.documentElement.clientHeight : screen.height;

    let left = ((width / 2) - (w / 2)) + dualScreenLeft;
    let top = ((height / 2) - (h / 2)) + dualScreenTop;
    let newWindow = window.open(url, title,
      'scrollbars=yes, width=' + w + ', height=' + h +
      ', top=' + top + ', left=' + left);

    // Puts focus on the newWindow
    if (window.focus) {
      newWindow.focus();
    }

    return newWindow;
  }

  popoutToggle() {
    let x = screen.width/2 - 1000/2;
    let y = screen.height/2 - 600/2;
    let win = this.PopupCenter("/auth/github", "Authorize CloudCV", '900', '500');
    let that = this;
    let winClosed = setInterval(function () {
      if (win.location.search.indexOf('?status=passed&token=') == 0) {
        that.props.loginactions.Login();
        const temp = win.location.search.substr(21).split('&');
        const access_token = temp[0];
        const username = temp[1].split('=')[1];
        that.setSessionFlag(access_token, username);
        browserHistory.push('/user');
        win.close();
      } else if (win.location.search.indexOf('?status=failed') == 0) {
        win.close();
      }
      if (win.closed) {
        clearInterval(winClosed);
      }}, 250);
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
              style={{textDecoration: 'none', color: "inherit"}}>
              CVFY
            </Link>
          }
          showMenuIconButton = {false}
          iconElementRight={
          this.state.login ?
            <IconMenu
              iconButtonElement={
                <IconButton><MoreVertIcon /></IconButton>
              }
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
              anchorOrigin={{horizontal: 'right', vertical: 'top'}}>
              <MenuItem onTouchTap={this.logout} primaryText="Sign out" />
            </IconMenu>
            :
             <span className="loginButton" onClick={this.popoutToggle}>
                <FlatButton label="Login"
                style={{margin: "5%", color: "white"}}/>
             </span>
          }
        />
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
