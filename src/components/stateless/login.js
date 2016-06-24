import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import * as loginActions from '../../actions/loginActions';
import toastr from 'toastr';

class LoginHandler extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      login: false
    };
    this.setSessionFlag = this.setSessionFlag.bind(this);
  }

  componentWillMount() {
    if (window.location.search.indexOf('?status=passed&token=') == 0) {
      this.props.loginactions.Login();
      const temp = window.location.search.substr(21).split('&');
      const access_token = temp[0];
      const username = temp[1].split('=')[1];
      this.setSessionFlag(access_token, username);
      browserHistory.push('/');
    } else if (window.location.search.indexOf('?status=failed') == 0) {
      toastr.error('Unable to login');
    }
  }

  setSessionFlag(access_token, username) {
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('username', username);
    localStorage.setItem('gh_access_token_time', Date.now());
  }

  render() {
    return (
      <div>
        <p>Bye!</p>
      </div>
    );
  }
}

LoginHandler.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginHandler);
