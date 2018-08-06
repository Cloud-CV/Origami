import React from 'react';
import { PropTypes } from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BounceLoader } from 'react-spinners';
import {
  is_cloudcv,
  getAllDemosByCloudCV,
} from '../../api/Generic/getCloudCVDemos';
import { getAllDeployed } from '../../api/Nongh/getAllDeployed';
import { getSearchedDemos } from '../../api/Nongh/getSearchedDemos';
import HomePageDemoCard from '../stateless/homePageDemoCard';
import { getAllPermalink } from '../../api/Nongh/permalink';
import * as loginActions from '../../actions/loginActions';
import {
  Layout,
  Menu,
  Icon,
  Button,
  Card,
  Row,
  Col,
  Input,
  Select,
  Modal,
} from 'antd';
import toastr from 'toastr';
import { SocialDialog } from '../social/SocialDialog';
import { trimAndPad } from '../../utils/generalUtils';
import { DEMO_CARD_DESCRIP_MAX_LEN } from '../../constants';
import { selectUser } from '../../actions/user_profile_action';
import userApi from '../../api/Github/userApi';

const { Header, Content, Footer } = Layout;
const Option = Select.Option;
const demoSpinnerStyle = {
  position: 'fixed',
  top: '50%',
  left: '50%',
};

class HomePage extends React.Component {
  constructor(props, context) {
    super(props, context);
    // this.buildFromGithubLogin = this.buildFromGithubLogin.bind(this);
    this.useLocalDeploymentLogin = this.useLocalDeploymentLogin.bind(this);
    $('#appbar-progress').progress({
      percent: '0%',
    });

    this.state = {
      is_cloudcv: false,
      rootData: {},
      allDeployed: [],
      demoBeingShown: {},
      permalinkHolder: {},
      shareModalOpen: false,
      searchBy: 'demo',
      demoLoading: true,
      logged: false,
      profile: {},
      loaded: false,
    };

    this.handleShareModal = this.handleShareModal.bind(this);
    this.goToDemoPage = this.goToDemoPage.bind(this);
    this.findDemo = this.findDemo.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.getDocs = this.getDocs.bind(this);
    this.success = this.success.bind(this);
  }

  componentWillMount() {
    getAllDeployed()
      .then(alldeployedRepos => {
        let tmp = JSON.parse(alldeployedRepos);
        let allDeployed = [];
        let profile = {};
        for (let i = 0; i < tmp.length; i++) {
          let uname = tmp[i].username;
          userApi.userProfileFromName(uname).then(user => {
            user = JSON.parse(user);
            let username = user['login'];
            let avatar = user['avatar_url'];
            profile[username] = avatar;
          });
        }
        while (tmp.length) {
          allDeployed.push(tmp.splice(0, 3));
        }
        this.setState({ allDeployed });
        this.setState({ demoLoading: false, profile: profile });
      })
      .then(() => {
        const stateToPut = {};
        getAllPermalink().then(data => {
          JSON.parse(data).map(perma => {
            if (!stateToPut[perma.proect_id]) {
              stateToPut[perma.project_id] = {};
            }

            let permalink = `${window.location.protocol}//${
              window.location.host
            }${perma.short_relative_url}`;
            perma.permalink = permalink;
            stateToPut[perma.project_id] = perma;
            this.setState({
              permalinkHolder: Object.assign({}, stateToPut),
            });
          });
        });
      })
      .catch(err => {
        toastr.error(err);
      });
  }

  handleShareModal(demoBeingShown) {
    let id = demoBeingShown.id;
    if (demoBeingShown !== false)
      demoBeingShown.permalink = this.state.permalinkHolder[id].permalink;
    this.setState({ demoBeingShown }, () => {
      this.setState({ shareModalOpen: !this.state.shareModalOpen });
    });
  }
  success() {
    const modal = Modal.info({
      title: 'Logging you in',
    });
    setTimeout(() => modal.destroy(), 2000);
  }

  useLocalDeploymentLogin() {
    if (!this.props.login) {
      $('.loginButton').trigger('click');
    } else {
      this.props.history.push('/ngh/user');
    }
  }

  goToDemoPage(demo) {
    this.props.history.push(
      this.state.permalinkHolder[demo.id].short_relative_url
    );
  }

  findDemo(search_term) {
    getSearchedDemos(this.state.searchBy, search_term)
      .then(allRepos => {
        if (Object.keys(JSON.parse(allRepos)).length > 0) {
          let tmp = JSON.parse(allRepos);
          let allDeployed = [];
          while (tmp.length) {
            allDeployed.push(tmp.splice(0, 3));
          }
          this.setState({
            allDeployed,
          });
        } else {
          this.setState({ allDeployed: [] });
        }
      })
      .then(() => {
        const stateToPut = {};
        getAllPermalink().then(data => {
          JSON.parse(data).map(perma => {
            if (!stateToPut[perma.user_id]) {
              stateToPut[perma.user_id] = {};
            }
            stateToPut[perma.project_id] = perma;
            this.setState({
              permalinkHolder: Object.assign({}, stateToPut),
            });
          });
        });
      })
      .catch(err => {
        toastr.error(err);
      });
  }

  handleClick(e) {
    if (!this.state.login && e.key === '2') {
      this.initiateLogin();
    } else if (e.key === '3') {
      this.getDocs();
    }
  }

  getDocs() {
    window.location =
      'http://cloudcv-origami.readthedocs.io/en/latest/index.html';

  }
  Loaded() {
    this.setState({ loaded: true });
    this.forceUpdate();
  }

  render() {
    const profile = this.state.profile;
    return (
      <Layout style={{ backgroundColor: '#FEFEFE' }}>
        <Header id="layout-header">
          <Row>
            <Col span={3} offset={1}>
              <h2 id="logo-title">Origami</h2>
            </Col>
            <Col span={12} offset={3}>
              <Input.Search
                id="search"
                placeholder="Search for demos, users"
                onSearch={value => this.findDemo(value)}
              />
            </Col>
            <Col span={3} offset={0}>
              <Col span={3} offset={0}>
                <Select
                  defaultValue="demo"
                  style={{ width: 85 }}
                  onChange={value => this.setState({ searchBy: value })}
                >
                  <Option value="demo">demo</Option>
                  <Option value="user">user</Option>
                </Select>
              </Col>
            </Col>
          </Row>
        </Header>

        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div
            style={{
              padding: 12,
              textAlign: 'center',
              fontFamily: '"Open Sans", "Helvetica", sans-serif',
            }}
          >
            {this.state.demoLoading ? (
              <div className="demoSpinner" style={demoSpinnerStyle}>
                <BounceLoader color={'#33aadd'} size={80} />
              </div>
            ) : (
              <Row s>
                {Object.keys(this.state.allDeployed).length > 0 ? (
                  this.state.allDeployed.map(row => (
                    <div key={Math.random()}>
                      <Row>
                        {row.map(demo => (
                          <Col span={6} offset={1} key={demo.id}>
                            <div
                              class="ui card"
                              style={{
                                width: '80%',
                                borderWidth: '0px',
                                borderBottom: '1px solid rgba(0, 0, 0, 0.2)',
                                boxShadow: '0 1px 5px rgba(0, 0, 0, 0.15)',
                              }}
                            >
                              <div class="content" style={{ color: '#323643' }}>
                                <img
                                  class="ui avatar image"
                                  src={profile[demo.username]}
                                  onLoad={this.Loaded.bind(this)}
                                  onClick={this.props.userclick.bind(
                                    this,
                                    demo.username
                                  )}
                                />
                                <span
                                  style={{
                                    paddingLeft: '5px',
                                    fontSize: '14px',
                                  }}
                                >
                                  {' '}
                                  {demo.username}{' '}
                                </span>

                              </div>
                              <div class="small image">
                                <img
                                  src={demo.cover_image}
                                  style={{ height: '24vh' }}
                                />
                              </div>
                              <div class="content">
                                <span
                                  style={{
                                    margin: 'auto',
                                    fontSize: '17px',
                                    fontWeight: 'Bold',
                                  }}
                                >
                                  {demo.name}
                                </span>
                                <br />
                                <span
                                  style={{ margin: 'auto', fontSize: '13px' }}
                                >
                                  Description
                                </span>
                              </div>
                              <div
                                class="extra content"
                                style={{
                                  backgroundColor: '#606470',
                                  color: 'White',
                                  borderWidth: '0px',
                                }}
                              >
                                <span>Demo</span> <Icon type="rocket" />
                              </div>
                            </div>
                          </Col>
                        ))}
                      </Row>
                      <br />
                      <br />
                      <br />
                    </div>
                  ))
                ) :(
                  <Col span={24} style={{ width: '100%' }}>
                    <h4> Demo not found. Try Searching for another demo</h4>
                  </Col>
                )}
              </Row>
            )}
          </div>
        </Content>

        <SocialDialog
          shareModalOpen={this.state.shareModalOpen}
          handleShareModal={this.handleShareModal.bind(this)}
          demoBeingShown={this.state.demoBeingShown}
        />
      </Layout>
    );
  }
}

HomePage.propTypes = {
  loginactions: PropTypes.object.isRequired,
  login: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    login: state.login,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loginactions: bindActionCreators(loginActions, dispatch),
    userclick: bindActionCreators(selectUser, dispatch),
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomePage)
);
