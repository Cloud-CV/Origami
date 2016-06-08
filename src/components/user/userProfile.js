import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as loginActions from '../../actions/loginActions';
import toastr from 'toastr';

toastr.options.closeButton = true;

class UserProfile extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div className="jumbotron">
        <Link to="/">
          <p>Userprofile</p>
        </Link>
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
