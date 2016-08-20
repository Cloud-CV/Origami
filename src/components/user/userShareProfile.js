import React, { PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import HomePageDemoCard from '../stateless/homePageDemoCard';
import { getAllPermalink } from '../../api/Nongh/permalink';
import { getDeployed } from '../../api/Nongh/getDeployed';
import { isCloudCV } from '../../api/Generic/getCloudCVDemos';
import userApi  from '../../api/Github/userApi';
import RaisedButton from 'material-ui/RaisedButton';
import { indigo600, grey900, blue100 } from 'material-ui/styles/colors';
import Dialog from 'material-ui/Dialog';
import toastr from 'toastr';
import { ShareButtons, ShareCounts, generateShareIcon } from 'react-share';

const { FacebookShareButton, GooglePlusShareButton, LinkedinShareButton, TwitterShareButton } = ShareButtons;
const { FacebookShareCount, GooglePlusShareCount, LinkedinShareCount } = ShareCounts;
const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');
const GooglePlusIcon = generateShareIcon('google');
const LinkedinIcon = generateShareIcon('linkedin');

class ShareProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      showOutput: 'hidden',
      allDeployed: {},
      demoBeingShown: {},
      shareModalOpen: false
    };

    this.toggleShow = this.toggleShow.bind(this);
    this.handleShareModal = this.handleShareModal.bind(this);
  }

  componentWillMount() {
    if (this.props.params.username) {

      isCloudCV().then((data) => {
        const rootData = JSON.parse(data);
        userApi.userProfileFromName(this.props.params.username).then((userData) => {
          this.setState({ user: JSON.parse(userData) }, () => {
            getAllPermalink().then((links) => {
              getDeployed(this.props.params.userid).then((alldeployedRepos) => {
                const relevantLink = JSON.parse(links)
                  .filter((x) => parseInt(x.userId, 10) === this.state.user.id);
                const allDemos = [];
                JSON.parse(alldeployedRepos).map((demo, index) => {
                  if (index < JSON.parse(alldeployedRepos).length) {
                    const demoToPut = Object.assign({}, demo,
                      { permalink: `http://${rootData.appip}:${rootData.port}${relevantLink[index].shortRelativeURL}` }
                    );
                    allDemos.push(demoToPut);
                  }
                  if (allDemos.length === JSON.parse(alldeployedRepos).length) {
                    this.setState({
                      allDeployed: allDemos
                    });
                  }
                });
              })
                .catch((err) => {
                  toastr.error(err);
                });
            });
          });
        });
      });
    }
  }

  toggleShow() {
    this.setState({ showOutput: this.state.showOutput === 'visible' ? 'hidden' : 'visible' });
  }

  handleShareModal(demoBeingShown) {
    this.setState({ demoBeingShown }, () => {
      this.setState({ shareModalOpen: !this.state.shareModalOpen });
    });
  }

  render() {
    return (
      <div className="sixteen column stretched row" style={{ visibility: this.state.showOutput }}>

        <div className="ui container row"
             style={{ height: '10vh' }}
        >
        </div>

        <div className="ui container row grid">
          <div className="ui four wide right aligned column" style={{ minHeight: '15vh' }}>
            <div className="ui fluid bottom aligned medium rounded image">
              <div className="ui medium ribbon black label">@{this.state.user.login}</div>
              <img className="" onLoad={this.toggleShow}
                   src={this.state.user.avatar_url}
              />
            </div>
          </div>

          <div className="ui six wide column" >
            <div>
              <div className="row" style={{  }} />
              <h1 className="row"><u>{this.state.user.name}</u></h1>
              {this.state.user.company &&
              <h3 className="row">{this.state.user.company}</h3>
              }
              {this.state.user.blog &&
              <a href={this.state.user.blog}> <h3 className="row">{this.state.user.blog}</h3></a>
              }
              <h3 className="row">Github Follower Count: {this.state.user.followers}</h3>
              <h3 className="row">Number of Apps: {this.state.allDeployed.length}</h3>
            </div>
          </div>
        </div>

        <span className="ui horizontal divider row"><hr /></span>

        {this.state.allDeployed.length > 0 &&
        <div className="fifteen wide column stretched stackable centered container">
          <div className="ui very padded stackable centered grid">
            {this.state.allDeployed.map((demo, index) =>
              <HomePageDemoCard
                key={index}
                {...demo}
                handleShareModal={this.handleShareModal}
              />
            )}
          </div>
        </div>
        }

        {this.state.allDeployed.length > 0 &&
        <div className="ui centered row container grid">

          <div className="ui fluid row"
               style={{ minHeight: '10vh', minWidth: '100vw' }}
          >
          </div>

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
        </div>
        }

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


ShareProfile.propTypes = {
  params: PropTypes.object.isRequired
};

export default ShareProfile;
