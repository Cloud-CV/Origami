import React, { PropTypes } from "react";
import { Link, browserHistory } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  cyan500,
  blue100,
  grey900,
  indigo600
} from "material-ui/styles/colors";
import {
  is_cloudcv,
  getAllDemosByCloudCV
} from "../../api/Generic/getCloudCVDemos";
import HomePageDemoCard from "../stateless/homePageDemoCard";
import { getAllPermalink } from "../../api/Nongh/permalink";
import RaisedButton from "material-ui/RaisedButton";
import Dialog from "material-ui/Dialog";
import * as loginActions from "../../actions/loginActions";
import { ShareButtons, ShareCounts, generateShareIcon } from "react-share";
import Radium from "radium";
import { Layout, Menu, Icon, Button, Card, Row, Col, Input } from "antd";
const { Header, Content, Footer } = Layout;

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
      cloudCVDemos: [],
      demoBeingShown: {},
      shareModalOpen: false,
      showOutput: false
    };

    this.handleShareModal = this.handleShareModal.bind(this);
    this.getStyles = this.getStyles.bind(this);
  }

  componentWillMount() {
    document.body.scrollTop = (document.documentElement.scrollTop = 0);

    is_cloudcv().then(data => {
      const rootData = JSON.parse(data);
      this.setState({ rootData }, () => {
        this.setState({ showOutput: true });
      });
      if (Object.keys(rootData).length) {
        if (rootData.is_cloudcv) {
          this.setState({ is_cloudcv: true });
          getAllPermalink().then(links => {
            getAllDemosByCloudCV(rootData.root_user_github_login_id).then(demos => {
              const relevantLink = JSON.parse(links).filter(
                x => parseInt(x.user_id, 10) === rootData.root_user_github_login_id
              );
              const allDemos = [];
              JSON.parse(demos).map((demo, index) => {
                if (index < JSON.parse(demos).length) {
                  const demoToPut = Object.assign({}, demo, {
                    permalink: `http://${rootData.app_ip}:${rootData.port}${relevantLink[index].short_relative_url}`
                  });
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
      $(".loginButton").trigger("click");
    } else {
      browserHistory.push("/ngh/user");
    }
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
        <Content id="content" style={styles.content}>
          <div id="content-div" style={styles.contentDiv}>
            <Row>
              <Col span={5} offset={1}>
                <Card style={{ width: "100%" }} bodyStyle={{ padding: 0 }}>
                  <div className="custom-card">
                    <br />
                    <h3>Application Name 1</h3>
                    <p>- AvaisP</p>
                  </div>
                  <div className="custom-image">
                    <img
                      alt="example"
                      width="100%"
                      src="https://octodex.github.com/images/catstello.png"
                    />
                  </div>
                  <div className="custom-card">
                    <p>Description</p>
                    <br />
                    <Button
                      type="primary"
                      id="launchButton"
                      style={styles.launchButton}
                    >
                      Launch
                    </Button>
                  </div>
                </Card>
              </Col>
              <Col span={5} offset={1}>
                <Card style={{ width: "100%" }} bodyStyle={{ padding: 0 }}>
                  <div className="custom-card">
                    <br />
                    <h3>Application Name 2</h3>
                    <p>- Anonymous</p>
                  </div>
                  <div className="custom-image">
                    <img
                      alt="example"
                      width="100%"
                      src="https://octodex.github.com/images/catstello.png"
                    />
                  </div>
                  <div className="custom-card">
                    <p>Description</p>
                    <br />
                    <Button
                      type="primary"
                      id="launchButton"
                      style={styles.launchButton}
                    >
                      Launch
                    </Button>
                  </div>
                </Card>
              </Col>
              <Col span={5} offset={1}>
                <Card style={{ width: "100%" }} bodyStyle={{ padding: 0 }}>
                  <div className="custom-card">
                    <br />
                    <h3>Application Name 3</h3>
                    <p>- AvaisP</p>
                  </div>
                  <div className="custom-image">
                    <img
                      alt="example"
                      width="100%"
                      src="https://octodex.github.com/images/catstello.png"
                    />
                  </div>
                  <div className="custom-card">
                    <p>Description</p>
                    <br />
                    <Button
                      type="primary"
                      id="launchButton"
                      style={styles.launchButton}
                    >
                      Launch
                    </Button>
                  </div>
                </Card>
              </Col>
              <Col span={5} offset={1}>
                <Card style={{ width: "100%" }} bodyStyle={{ padding: 0 }}>
                  <div className="custom-card">
                    <br />
                    <h3>Application Name 4</h3>
                    <p>- AvaisP</p>
                  </div>
                  <div className="custom-image">
                    <img
                      alt="example"
                      width="100%"
                      src="https://octodex.github.com/images/catstello.png"
                    />
                  </div>
                  <div className="custom-card">
                    <p>Description</p>
                    <br />
                    <Button
                      type="primary"
                      id="launchButton"
                      style={styles.launchButton}
                    >
                      Launch
                    </Button>
                  </div>
                </Card>
              </Col>
            </Row>
            <br />

            <br /><br /><br /><br />

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
