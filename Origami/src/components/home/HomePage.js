import React, { PropTypes } from "react";
import { Link, browserHistory } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
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
import Radium from "radium";
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

class HomePageComponent extends React.Component {
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
      searchBy: "demo"
    };

    this.handleShareModal = this.handleShareModal.bind(this);
    this.getStyles = this.getStyles.bind(this);
    this.goToDemoPage = this.goToDemoPage.bind(this);
    this.findDemo = this.findDemo.bind(this);
  }

  componentWillMount() {
    getAllDeployed()
      .then(alldeployedRepos => {
        this.setState({ allDeployed: JSON.parse(alldeployedRepos) });
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

  useLocalDeploymentLogin() {
    if (!this.props.login) {
      $(".loginButton").trigger("click");
    } else {
      browserHistory.push("/ngh/user");
    }
  }

  goToDemoPage(demo) {
    browserHistory.push(this.state.permalinkHolder[demo.id].short_relative_url);
  }

  findDemo(search_term) {
    getSearchedDemos(this.state.searchBy, search_term)
      .then(allRepos => {
        if (Object.keys(JSON.parse(allRepos)).length > 0) {
          this.setState({ allDeployed: JSON.parse(allRepos) });
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

  getStyles() {
    return {
      content: {
        margin: "24px 16px 0",
        overflow: "initial"
      },
      contentDiv: {
        padding: 12,
        background: "#FEFEFE",
        textAlign: "center"
      },
      launchButton: {
        "margin-bottom": "5%"
      }
    };
  }

  render() {
    const styles = this.getStyles();

    return (
      <div>
        {this.props.login &&
          <Header id="layout-header">
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
              <Col span={2} offset={0}>
                <Col span={2} offset={0}>
                  <Select
                    defaultValue="demo"
                    style={{ width: 70 }}
                    onChange={value => this.setState({ searchBy: value })}
                  >
                    <Option value="demo">demo</Option>
                    <Option value="user">user</Option>
                  </Select>
                </Col>
              </Col>
            </Row>
          </Header>}
        <Content style={styles.content}>
          <div style={styles.contentDiv}>
            <Row>
              {Object.keys(this.state.allDeployed).length > 0
                ? this.state.allDeployed.map(demo => (
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
                            style={styles.launchButton}
                            onClick={() => this.goToDemoPage(demo)}
                          >
                            Demo<Icon type="rocket" />
                          </Button>
                          <br />
                        </div>
                      </Card>
                      <br />
                    </Col>
                  ))
                : <Col span={24}>
                    <h4> Demo not found. Try Searching for another demo </h4>
                  </Col>}
            </Row>
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
            background: "#fefefe",
            color: "#455A64",
            "font-size": "14px",
            "box-shadow": "0px -2px 5px #E0E0E0"
          }}
        >
          <strong>Origami</strong>
          {" "}
          - Created by
          {" "}
          <a href="http://cloudcv.org/">Team CloudCV</a>
        </Footer>
      </div>
    );
  }
}

HomePageComponent.propTypes = {
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

const HomePage = Radium(HomePageComponent);

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
