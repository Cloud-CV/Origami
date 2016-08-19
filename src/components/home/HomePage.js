import React, { PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { cyan500, blue100, grey900, indigo600 } from 'material-ui/styles/colors';
import { isCloudCV, getAllDemosByCloudCV } from '../../api/Generic/getCloudCVDemos';
import HomePageDemoCard from '../stateless/homePageDemoCard';
import { getAllPermalink } from '../../api/Nongh/permalink';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import * as loginActions from '../../actions/loginActions';
import { ShareButtons, ShareCounts, generateShareIcon } from 'react-share';

const { FacebookShareButton, GooglePlusShareButton, LinkedinShareButton, TwitterShareButton } = ShareButtons;
const { FacebookShareCount, GooglePlusShareCount, LinkedinShareCount } = ShareCounts;
const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');
const GooglePlusIcon = generateShareIcon('google');
const LinkedinIcon = generateShareIcon('linkedin');

class HomePage extends React.Component {
  constructor(props, context) {
    super(props, context);
    // this.buildFromGithubLogin = this.buildFromGithubLogin.bind(this);
    this.useLocalDeploymentLogin = this.useLocalDeploymentLogin.bind(this);
    $('#appbar-progress').progress({
      percent: '0%'
    });

    this.state = {
      isCloudCV: false,
      rootData: {},
      cloudCVDemos: [],
      demoBeingShown: {},
      shareModalOpen: false
    };

    this.handleShareModal = this.handleShareModal.bind(this);
  }

  // buildFromGithubLogin() {
  //   if (!this.props.login) {
  //     $('.loginButton').trigger('click');
  //   } else {
  //     browserHistory.push('/user');
  //   }
  // }

  componentWillMount() {
    isCloudCV().then((data) => {
      const rootData = JSON.parse(data);
      this.setState({ rootData });
      if (Object.keys(rootData).length) {
        if (rootData.isCloudCV) {
          this.setState({ isCloudCV: true });
          getAllPermalink().then((links) => {
            getAllDemosByCloudCV(rootData.rootUserGithubLoginId).then((demos) => {
              const relevantLink = JSON.parse(links)
                .filter((x) => parseInt(x.userId, 10) === rootData.rootUserGithubLoginId);
              const allDemos = [];
              JSON.parse(demos).map((demo, index) => {
                if (index < JSON.parse(demos).length) {
                  const demoToPut = Object.assign({}, demo,
                    { permalink: `http://${rootData.appip}:${rootData.port}${relevantLink[0].shortRelativeURL}` }
                  );
                  allDemos.push(demoToPut);
                }
                if (allDemos.length === JSON.parse(demos).length) {
                  this.setState({
                    cloudCVDemos: allDemos
                  });
                }
              });
            });
          });
        }
      }
    });
  }

  handleShareModal(demoBeingShown) {
    this.setState({ demoBeingShown }, () => {
      this.setState({ shareModalOpen: !this.state.shareModalOpen });
    });
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
      <div className="ui very relaxed stackable centered grid">

        <div className="ui fluid row"
             style={{ minHeight: '3vh', backgroundColor: cyan500,
               color: 'white', fontSize: 'xx-large', minWidth: '100vw'
             }}
        >
        </div>

        <div className="ui fluid row"
             style={{ backgroundColor: cyan500, minWidth: '100vw'
             }}
        >
          <div className="ui small image">
            <img src={require('../assets/cloudcv_logo.png')}/>
          </div>
        </div>

        <div className="ui fluid row"
             style={{ minHeight: '2vh', backgroundColor: cyan500
             }}
        >
        </div>

        <div className="ui fluid row"
             style={{ minHeight: '10vh', backgroundColor: cyan500,
               color: 'white', fontSize: 'xx-large', minWidth: '100vw'
             }}
        >
          CloudCVFy Your Code
        </div>





        <div className="ui fluid row"
             style={{ minHeight: '15vh', backgroundColor: cyan500,
               color: 'white', fontSize: 'x-large', minWidth: '100vw'
             }}
        >
          CVFY helps you build a web based demo out of <br /><br />
          Machine Learning Code
        </div>





        <div className="ui fluid row"
             style={{ backgroundColor: cyan500, minWidth: '100vw' }}
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
             style={{ minHeight: '5vh', backgroundColor: cyan500, minWidth: '100vw' }}
        >
        </div>

        {Object.keys(this.state.rootData).length === 0 &&
        <div className="one column stretched row">
          <div className="column center aligned grid">
            <div className="ui warning message">
              <div className="header">
                <h1>You must <Link to="/gettingstarted/configuration">configure </Link>the application before first use!</h1>
              </div>
              <Link to="/initialsetup">
                <h2>Go to setup page.</h2>
              </Link>
            </div>
          </div>
        </div>
        }

        {Object.keys(this.state.rootData).length > 0 &&
        <div className="two column stretched row">

          <div className="column center aligned grid">

            <div className="ui fluid small segment">

              <Link className="ui ribbon label raised fluid padded text container segment" to={this.props.login ? '/ngh/user' : '/'}
                    onClick={this.useLocalDeploymentLogin}
                    style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <i className="large rocket middle aligned icon" /> Create A Demo
              </Link>
              <br /><br />

              <div className="ui centered grid">
                <div className="ui aligned centered column">
                  <div className="ui tiny steps">
                    <div className="step">
                      <i className="browser icon" />
                      <div className="content">
                        <div className="title">Enter details</div>
                        <div className="description">Metadata of your app</div>
                      </div>
                    </div>
                    <div className="step">
                      <i className="compress icon" />
                      <div className="content">
                        <div className="title">I/O Components</div>
                        <div className="description">Build I/O pipeline</div>
                      </div>
                    </div>
                    <div className="step">
                      <i className="image icon" />
                      <div className="content">
                        <div className="title">Demo</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
        }


        {this.state.cloudCVDemos.length > 0 &&
        <div className="ui row">
          <div className="ui horizontal container divider">
            -
          </div>
        </div>
        }

        {this.state.cloudCVDemos.length > 0 &&
        <div className="ui fluid row padded grid"
             style={{ color: grey900, fontSize: 'x-large', minWidth: '80vw'
             }}
        >
          Try demos by CloudCV
        </div>
        }


        {this.state.cloudCVDemos.length > 0 &&
        <div className="ui row">
          <div className="fifteen wide column stretched stackable centered container">
            <div className="ui very padded stackable centered grid">
              {this.state.cloudCVDemos.map((demo, index) =>
                <HomePageDemoCard
                  key={index}
                  {...demo}
                  handleShareModal={this.handleShareModal}
                />
              )}
            </div>
          </div>
        </div>
        }

        {this.state.cloudCVDemos.length === 0 &&
        <div className="ui fluid row padded grid"
             style={{ minHeight: '3vh', minWidth: '80vw'
             }}
        >
        </div>
        }

        {this.state.isCloudCV &&
        <div className="ui row">
          <div className="ui horizontal container divider">
            -
          </div>
        </div>
        }

        {this.state.isCloudCV &&
        <div className="ui fluid row padded grid"
             style={{ color: grey900, fontSize: 'x-large', minWidth: '80vw'
             }}
        >
          Out Projects Are Funded By
        </div>
        }

        {this.state.isCloudCV &&
        <div className="ui fluid row padded grid"
             style={{ color: grey900, fontSize: 'x-large', minWidth: '80vw'
             }}
        >

          <div className="ui three wide column">
            <img className="ui middle aligned small image"  src={require('./../assets/vt.png')} />
          </div>

          <div className="ui three wide column">
            <img className="ui  middle alignedsmall image" src={require('./../assets/aws.png')} />
          </div>

          <div className="ui three wide column">
            <img className="ui middle aligned small image" src={require('./../assets/azure.png')} />
          </div>

          <div className="ui three wide column">
            <img className="ui middle aligned small image" src={require('./../assets/nvidia.png')} />
          </div>

        </div>
        }

        <div className="ui fluid row"
             style={{ minHeight: '5vh', backgroundColor: grey900, color: 'white', minWidth: '100vw' }}
        >
        </div>

        <div className="ui fluid container grid row"
             style={{ minHeight: '20vh', backgroundColor: grey900, color: 'white', minWidth: '100vw' }}
        >
          <div className="ui six wide column">
            <h4 className="ui inverted header">Community</h4>
            <div className="ui inverted link list">
              <a className="item" href="https://github.com/Cloud-CV/cvfy-frontend/issues" target="_blank">Submit an Issue</a>
              <a className="item" href="https://gitter.im/batra-mlp-lab/CloudCV" target="_blank">Join our Chat</a>
            </div>
          </div>
          <div className="ui ten wide column grid">
            <div className="ui row">

              <div className="eight wide right floated column">
                <h4 className="ui inverted header" style={{ color: blue100 }}>Contribute to this project</h4>
                <p>We are looking for people to add features to CVFY.</p>
                <RaisedButton backgroundColor={blue100}
                              label="Github"
                              onClick={() => location.href = 'https://github.com/Cloud-CV/cvfy-frontend'}
                />
              </div>

              <div className="eight wide right floated column">
                <h4 className="ui inverted header" style={{ color: blue100 }}>Know more about CloudCV</h4>
                <p>CloudCV provides large-scale distributed Computer Vision as a cloud service.</p>
                <RaisedButton backgroundColor={blue100}
                              label="Visit cloudcv.org"
                              onClick={() => location.href = 'https://cloudcv.org'}
                />
              </div>

            </div>
          </div>
        </div>


        <div className="ui fluid row"
             style={{ minHeight: '5vh', backgroundColor: grey900, color: 'white', minWidth: '100vw' }}
        >
          <div className="ui horizontal container divider">
            -
          </div>
        </div>



        <div className="ui fluid row"
             style={{ minHeight: '15vh', backgroundColor: grey900, color: 'white', minWidth: '100vw' }}
        >
          Free Software (AGPL 3.0)
          <br /><br />
          Crafted with React, Redux, MaterialUI and &lt;3
          <br /><br />
          © CloudCV, 2016
        </div>


        <Dialog
          title="Share This Demo"
          modal={false}
          open={this.state.shareModalOpen}
          onRequestClose={this.handleShareModal}
          autoScrollBodyContent
        >

          <div className="ui padded centered grid">

            <div className="ui row stackable column grid" style={{ cursor: 'pointer' }}>
              <TwitterShareButton
                url={this.state.demoBeingShown.permalink}
                title={this.state.demoBeingShown.name}
                hashtags={['cloudcv', 'cvfy']}
                className="ui row"
              >
                <TwitterIcon
                  size={64}
                  round
                />
              </TwitterShareButton>
            </div>

            <div className="ui eight wide stackable row column grid" style={{ cursor: 'pointer' }}>
              <FacebookShareButton
                url={this.state.demoBeingShown.permalink}
                title={this.state.demoBeingShown.name}
                className="ui row"
              >
                <FacebookIcon
                  size={64}
                  round
                />
              </FacebookShareButton>
              <FacebookShareCount
                url={this.state.demoBeingShown.permalink}
              >
                {(count) =>
                  <div className="ui compact inverted segment"
                                 style={{ backgroundColor: indigo600 }}
                  >
                  {count} Shares
                </div>}
              </FacebookShareCount>
            </div>

            <div className="ui eight wide stackable row column grid" style={{ cursor: 'pointer' }}>
              <GooglePlusShareButton
                url={this.state.demoBeingShown.permalink}
                className="ui row"
              >
                <GooglePlusIcon
                  size={64}
                  round
                />
              </GooglePlusShareButton>

              <GooglePlusShareCount
                url={this.state.demoBeingShown.permalink}
              >
                {(count) => <div className="ui compact red inverted segment">{count} Shares</div>}
              </GooglePlusShareCount>
            </div>

            <div className="ui stackable row column grid" style={{ cursor: 'pointer' }}>
              <LinkedinShareButton
                url={this.state.demoBeingShown.permalink}
                title={this.state.demoBeingShown.name}
                windowWidth={750}
                windowHeight={600}
                className="ui row"
              >
                <LinkedinIcon
                  size={64}
                  round
                />
              </LinkedinShareButton>

              <LinkedinShareCount
                url={this.state.demoBeingShown.permalink}
              >
                {(count) => <div className="ui compact blue inverted segment">{count} Shares</div>}
              </LinkedinShareCount>
            </div>

          </div>

        </Dialog>

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

