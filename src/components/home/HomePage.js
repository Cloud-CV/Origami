import React, { PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { cyan500 } from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import * as loginActions from '../../actions/loginActions';

class HomePage extends React.Component {
  constructor(props, context) {
    super(props, context);
    // this.buildFromGithubLogin = this.buildFromGithubLogin.bind(this);
    this.useLocalDeploymentLogin = this.useLocalDeploymentLogin.bind(this);
    $('#appbar-progress').progress({
      percent: '0%'
    });
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
      <div className="ui very relaxed stackable centered grid">

        <div className="ui fluid row"
             style={{ backgroundColor: cyan500 }}
        >
            <a href="http://www.cloudcv.org/">
              <img className="ui centered fluid small bordered rounded image" src={require('./../assets/cloudcv_logo.png')}/>
            </a>
        </div>

        <div className="ui fluid row"
             style={{ height: '10vh', backgroundColor: cyan500,
               color: 'white', fontSize: 'xx-large'
             }}
        >
          CVFY
        </div>

        <div className="ui fluid row"
             style={{ height: '15vh', backgroundColor: cyan500,
               color: 'white', fontSize: 'x-large'
             }}
        >
          CVFY helps you build a web based demo out of <br /><br />
          ML Evaluation Code
        </div>

        <div className="ui fluid row"
             style={{ backgroundColor: cyan500 }}
        >
          <div className="ui three wide column">
            <RaisedButton
              default
              label="Get Started"
              onClick={() => browserHistory.push('/gettingstarted')}
            />
          </div>
          <div className="ui three wide column">
            <RaisedButton
              default
              label="CVFY-lib docs"
              onClick={() => browserHistory.push('/libdocs')}
            />
          </div>
        </div>

        <div className="ui fluid row"
             style={{ height: '10vh', backgroundColor: cyan500 }}
        ></div>

        <br />

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
                <i className="large rocket middle aligned icon" /> Create A Demo
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

