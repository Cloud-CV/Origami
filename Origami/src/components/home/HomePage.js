import React from "react";
import { PropTypes } from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BounceLoader } from 'react-spinners';
import {
  is_cloudcv,
  getAllDemosByCloudCV
} from "../../api/Generic/getCloudCVDemos";
import { getAllDeployed } from "../../api/Nongh/getAllDeployed";
import { getSearchedDemos } from "../../api/Nongh/getSearchedDemos";
import HomePageDemoCard from "../stateless/homePageDemoCard";
import { getAllPermalink } from "../../api/Nongh/permalink";
import * as loginActions from "../../actions/loginActions";
import { ShareButtons, ShareCounts, generateShareIcon } from "react-share";
import {
  Layout,
  Menu,
  Icon,
  Button,
  Card,
  Row,
  Col,
  Input,
  Select
} from "antd";
import { Modal } from "antd";
import toastr from "toastr";

const { Header, Content, Footer } = Layout;
const Option = Select.Option;
const {
  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton
} = ShareButtons;
const {
  FacebookShareCount,
  GooglePlusShareCount,
  LinkedinShareCount
} = ShareCounts;
const FacebookIcon = generateShareIcon("facebook");
const TwitterIcon = generateShareIcon("twitter");
const GooglePlusIcon = generateShareIcon("google");
const LinkedinIcon = generateShareIcon("linkedin");
const demoSpinnerStyle = {
  position: 'fixed',
  top: '50%',
  left: '50%'
  }

class HomePage extends React.Component {
  constructor(props, context) {
    super(props, context);
    // this.buildFromGithubLogin = this.buildFromGithubLogin.bind(this);
    this.useLocalDeploymentLogin = this.useLocalDeploymentLogin.bind(this);
    $("#appbar-progress").progress({
      percent: "0%"
    });

    this.state = {
      is_cloudcv: false,
      rootData: {},
      allDeployed: [],
      demoBeingShown: {},
      permalinkHolder: {},
      shareModalOpen: false,
      searchBy: "demo",
      demoLoading: true
    };

    this.handleShareModal = this.handleShareModal.bind(this);
    this.goToDemoPage = this.goToDemoPage.bind(this);
    this.findDemo = this.findDemo.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.initiateLogin = this.initiateLogin.bind(this);
    this.getDocs = this.getDocs.bind(this);
    this.success = this.success.bind(this);
  }

  componentWillMount() {
    getAllDeployed()
      .then(alldeployedRepos => {
        let tmp = JSON.parse(alldeployedRepos);
        let allDeployed = [];
        while (tmp.length) {
          allDeployed.push(tmp.splice(0, 4));
        }
        this.setState({ allDeployed: allDeployed });
        this.setState({ demoLoading: false });
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
              permalinkHolder: Object.assign({}, stateToPut)
            });
          });
        });
      })
      .catch(err => {
        toastr.error(err);
      });
  }

  handleShareModal(demoBeingShown) {
    this.setState({ demoBeingShown }, () => {
      this.setState({ shareModalOpen: !this.state.shareModalOpen });
    });
  }

  success() {
    const modal = Modal.info({
      title: "Logging you in"
    });
    setTimeout(() => modal.destroy(), 2000);
  }

  useLocalDeploymentLogin() {
    if (!this.props.login) {
      $(".loginButton").trigger("click");
    } else {
      this.props.history.push("/ngh/user");
    }
  }

  goToDemoPage(demo) {
    this.props.history.push(this.state.permalinkHolder[demo.id].short_relative_url);
  }

  findDemo(search_term) {
    getSearchedDemos(this.state.searchBy, search_term)
      .then(allRepos => {
        if (Object.keys(JSON.parse(allRepos)).length > 0) {
          let tmp = JSON.parse(allRepos);
          let allDeployed = [];
          while (tmp.length) {
            allDeployed.push(tmp.splice(0, 4));
          }
          this.setState({
            allDeployed: allDeployed
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
              permalinkHolder: Object.assign({}, stateToPut)
            });
          });
        });
      })
      .catch(err => {
        toastr.error(err);
      });
  }

  handleClick(e) {
    if (!this.state.login && e.key === "2") {
      this.initiateLogin();
    } else if (e.key == "3") {
      this.getDocs();
    }
  }

  initiateLogin() {
    this.success();
    window.location = "/auth/github/login/";
  }

  getDocs() {
    window.location = "http://cloudcv-origami.readthedocs.io/en/latest/index.html";
  }

  render() {
    return (
      <Layout style={{ background: "#FEFEFE" }}>
        {this.props.login
          ? <Header id="layout-header">
              <Row>
                <Col span={3} offset={1}>
                  <h2 id="logo-title">
                    Origami
                  </h2>
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
          : <Header id="layout-header-no-login">
              <Row>
                <Col span={3} offset={1}>
                  <h2 id="logo">
                    <img src="/static/img/origami.png" width="180" />
                  </h2>
                </Col>
                <Col span={9} offset={1}>
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
                <Col span={6} offset={1}>
                  <Menu
                    mode="horizontal"
                    defaultSelectedKeys={["1"]}
                    style={{ lineHeight: "64px" }}
                    onClick={this.handleClick}
                  >
                    <Menu.Item key="1">Home</Menu.Item>
                    <Menu.Item key="2">

                      Login

                    </Menu.Item>
                    <Menu.Item key="3">Docs</Menu.Item>
                  </Menu>
                </Col>
              </Row>
            </Header>}
        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          <div
            style={{ padding: 12, background: "#FEFEFE", textAlign: "center" }}
          >
          {this.state.demoLoading
          ? <div className="demoSpinner" style={demoSpinnerStyle}>
              <BounceLoader color={'#33aadd'} size={80}/>
            </div>
          :<Row>
              {Object.keys(this.state.allDeployed).length > 0
                ? this.state.allDeployed.map(row => (
                    <div key={Math.random()}>
                      <Row>
                        {row.map(demo => (
                          <Col span={5} offset={1} key={demo.id}>
                            <Card
                              style={{ width: "100%" }}
                              bodyStyle={{ padding: 0 }}
                            >
                              <div className="custom-card">
                                <br />
                                <h3>{demo.name}</h3>
                                <h4> - {demo.username}</h4>
                                <br />
                                <p />
                              </div>
                              <div className="custom-image">
                                <img width="100%" src={demo.cover_image} />
                              </div>
                              <div className="custom-card">
                                <p>{demo.description}</p>
                                <br />
                                <Button
                                  type="primary"
                                  id="launchButton"
                                  style={{ marginBottom: "5%" }}
                                  onClick={() => this.goToDemoPage(demo)}
                                >
                                  Demo<Icon type="rocket" />
                                </Button>
                                <br />
                              </div>
                            </Card>
                          </Col>
                        ))}
                      </Row>
                      <br />
                    </div>
                  ))
                : <Col span={24} style={{ width: "100%" }}>
                    <h4> Demo not found. Try Searching for another demo</h4>
                  </Col>}
            </Row>}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
            background: "#fefefe",
            color: "#455A64",
            fontSize: "14px",
            boxShadow: "0px -2px 5px #E0E0E0"
          }}
        >
          <strong>Origami</strong>
          {" "}
          - Created by
          {" "}
          <a href="http://cloudcv.org/">Team CloudCV</a>
        </Footer>
      </Layout>
    );
  }
}

HomePage.propTypes = {
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomePage));
