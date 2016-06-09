import React, { PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as loginActions from '../../actions/loginActions';
import * as userActions from '../../actions/userActions';
import toastr from 'toastr';

toastr.options.closeButton = true;

class UserProfile extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      user: {}
    };
  }

  componentWillMount() {
    !this.props.login && browserHistory.push('/');
    this.props.useractions.LoadUser().catch(err => {
      toastr.error("Error: " + err);
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({user: nextProps.user});
  }

  render() {
    console.log('in render: ', this.state.user);
    return (
      <div className="jumbotron">
        Welcome!
      </div>
    );
  }
}

UserProfile.propTypes = {
  login: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  loginactions: PropTypes.object.isRequired,
  useractions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    login: state.login,
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loginactions: bindActionCreators(loginActions, dispatch),
    useractions: bindActionCreators(userActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
