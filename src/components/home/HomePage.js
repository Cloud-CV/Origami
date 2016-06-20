import React, { PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as loginActions from '../../actions/loginActions';

class HomePage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.buildFromGithubLogin = this.buildFromGithubLogin.bind(this);
    this.useLocalDeploymentLogin = this.useLocalDeploymentLogin.bind(this);
  }

  buildFromGithubLogin() {
    if (!this.props.login) {
      $('.loginButton').trigger('click');
    } else {
      browserHistory.push('/user');
    }
  }

  useLocalDeploymentLogin() {
    if (!this.props.login) {
      $('.loginButton').trigger('click');
    } else {
      browserHistory.push('/ngh/user');
    }
  }

  render() {
    return (
      <div className="ui relaxed stackable grid container">

        <div className="one column stretched row">
          <div className="ui raised fluid padded text container segment">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </div>
        </div>

        <div className="three column centered stretched row">

          <div className="column center aligned"><div className="ui fluid segment">
            <Link className="ui raised fluid padded text container segment" to={this.props.login ? '/user' : '/'}
                  onClick={this.buildFromGithubLogin}
                  style={{textDecoration: 'none', color: "inherit"}}>
              Build Demos
            </Link>
            <div className="ui padded">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type book.
            </div>
          </div></div>

          <div className="column center aligned"><div className="ui fluid segment">
            <Link className="ui raised fluid padded text container segment" to={this.props.login ? '/ngh/user' : '/'}
                  onClick={this.useLocalDeploymentLogin}
                  style={{textDecoration: 'none', color: "inherit"}}>
              Use Prebuilt Project
            </Link>
            <div className="ui padded">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type book.
            </div>
          </div></div>

          <div className="column center aligned"><div className="ui fluid segment">
            <div className="ui raised fluid padded text container segment">
              Browse Your Demos
            </div>
            <div className="ui padded">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type book.
            </div>
          </div></div>
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

