import React, { PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as loginActions from '../../actions/loginActions';

class HomePage extends React.Component {
  constructor(props, context) {
    super(props, context);
    // this.buildFromGithubLogin = this.buildFromGithubLogin.bind(this);
    this.useLocalDeploymentLogin = this.useLocalDeploymentLogin.bind(this);
  }

  // buildFromGithubLogin() {
  //   if (!this.props.login) {
  //     $('.loginButton').trigger('click');
  //   } else {
  //     browserHistory.push('/user');
  //   }
  // }

  useLocalDeploymentLogin() {
    if (!this.props.login) {
      $('.loginButton').trigger('click');
    } else {
      browserHistory.push('/ngh/user');
    }
  }

  render() {
    return (
      <div className="ui relaxed stackable centered grid container">
        <br />
        <div className="ui raised fluid segment text sixteen wide padded grid">
          <div className="four wide column">
            <a href="http://www.cloudcv.org/">
              <img className="ui centered fluid medium bordered rounded image" src={require('./../assets/cloudcv_logo.png')}/>
            </a>
          </div>
          <div className="twelve wide padded text left aligned container column grid">
            <div className="row">
              CVFY helps you build a web based demo out of your ML evaluation code.
              You can plug and modify predefined I/O components as per the need of your evalution code and connect it using the CVFY python lib.
              CVFY gives you two choices for deploying your demo:
              <br />
              <div className="ui ordered list">
                <div className="item">Import your project from Github and build it in a Docker container</div>
                <div className="item">Connect your own deployment with I/O pipeline on CVFY webapp</div>
              </div></div>
            <br />
            <div className="row">
              <div className="ui raised fluid text sixteen wide padded grid">
                <div className="eight wide center aligned column">
                  <div className="ui raised secondary segment">
                    <Link to="/gettingstarted">
                      Get Started
                    </Link>
                  </div>
                </div>
                <div className="eight wide center aligned column">
                  <div className="ui raised secondary segment">
                    <Link to="/documentation">
                      Documentation
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="three column centered stretched row">

          {/*
           <div className="column center aligned">
           <div className="ui blue fluid segment">

           <Link className="ui ribbon label raised fluid padded text container segment" to={this.props.login ? '/user' : '/'}
           onClick={this.buildFromGithubLogin}
           style={{ textDecoration: 'none', color: 'inherit' }}
           >
           <i className="large github middle aligned icon" /> Build From Github
           </Link>
           <br /><br />

           <div className="ui centered grid">
           <div className="ui left aligned centered ten wide column">
           <div className="ui padded">
           <div className="ui ordered list">
           <div className="item">Pull your code from Github</div>
           <div className="item">Register your app</div>
           <div className="item">Select I/O components</div>
           <div className="item">Use your demo</div>
           </div>
           </div>
           </div>
           </div>
           </div>
           </div>
           */}

          <div className="column center aligned">
            <div className="ui blue fluid segment">

              <Link className="ui ribbon label raised fluid padded text container segment" to={this.props.login ? '/ngh/user' : '/'}
                    onClick={this.useLocalDeploymentLogin}
                    style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <i className="large rocket middle aligned icon" /> Use Own Deployment
              </Link>
              <br /><br />

              <div className="ui centered grid">
                <div className="ui left aligned centered ten wide column">
                  <div className="ui padded">
                    <div className="ui ordered list">
                      <div className="item">Run your code</div>
                      <div className="item">Register your app</div>
                      <div className="item">Select I/O components</div>
                      <div className="item">Use your demo</div>
                    </div>
                  </div>
                </div>
                </div>
            </div>
          </div>

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

