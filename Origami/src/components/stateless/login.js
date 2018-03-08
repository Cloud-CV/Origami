import React from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import * as loginActions from "../../actions/loginActions";
import toastr from "toastr";

class LoginHandler extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      login: false
    };
    this.setSessionFlag = this.setSessionFlag.bind(this);
  }

  componentWillMount() {
    if (window.location.search.indexOf("?status=passed&token=") === 0) {
      this.props.loginactions.Login();
      const temp = window.location.search.substr(21).split("&");
      const access_token = temp[0];
      const username = temp[1].split("=")[1];
      const user_id = temp[2].split("=")[1];
      this.setSessionFlag(access_token, username, user_id);
      this.props.history.push("/ngh/user");
    } else if (window.location.search.indexOf("?status=failed") === 0) {
      toastr.error("Unable to login");
    }
  }

  setSessionFlag(access_token, username, user_id) {
    localStorage.setItem("access_token", access_token);
    localStorage.setItem("username", username);
    localStorage.setItem("user_id", user_id);
    localStorage.setItem("gh_access_token_time", Date.now());
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
  login: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginHandler));
