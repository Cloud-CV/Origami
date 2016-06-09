import React, { PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as loginActions from '../../actions/loginActions';
import toastr from 'toastr';

toastr.options.closeButton = true;

class UserProfile extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {
    !this.props.login && browserHistory.push('/');
  }

  render() {
    return (
      <div className="jumbotron">
        Welcome!
      </div>
    );
  }
}

UserProfile.propTypes = {
  login: PropTypes.bool.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    login: state.login
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(loginActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
