import React from "react";
import { PropTypes } from "prop-types";
import { withRouter } from "react-router-dom";
import { getAllPermalink } from "../../api/Nongh/permalink";
import { getDeployed } from "../../api/Nongh/getDeployed";
import { is_cloudcv } from "../../api/Generic/getCloudCVDemos";
import userApi from "../../api/Github/userApi";
import toastr from "toastr";
import Radium from "radium";
import {
  Layout,
  Menu,
  Icon,
  Dropdown,
  Button,
  Card,
  Row,
  Col,
  Input
} from "antd";
const { Header, Content, Footer, Sider } = Layout;
const Search = Input.Search;
import { SocialDialog }  from "../social/SocialDialog";



class ShareProfileComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      showOutput: "hidden",
      allDeployed: {},
      demoBeingShown: {},
      shareModalOpen: false
    };

    this.toggleShow = this.toggleShow.bind(this);
    this.handleShareModal = this.handleShareModal.bind(this);
    this.getStyles = this.getStyles.bind(this);
    this.goToDemo = this.goToDemo.bind(this);
  }

  componentWillMount() {
    if (this.props.match.params.username) {
      is_cloudcv().then(data => {
        const rootData = JSON.parse(data);
        userApi
          .userProfileFromName(this.props.match.params.username)
          .then(userData => {
            this.setState({ user: JSON.parse(userData) }, () => {
              getAllPermalink().then(links => {
                getDeployed(this.props.match.params.user_id)
                  .then(alldeployedRepos => {
                    const relevantLink = JSON.parse(links).filter(
                      x => parseInt(x.user_id, 10) === this.state.user.id
                    );
                    const allDemos = [];
                    JSON.parse(alldeployedRepos).map((demo, index) => {
                      if (index < JSON.parse(alldeployedRepos).length) {
                        const demoToPut = Object.assign({}, demo, {
                          permalink: `http://${rootData.app_ip}:${
                            rootData.port
                          }${relevantLink[index].short_relative_url}`
                        });
                        allDemos.push(demoToPut);
                      }
                      if (
                        allDemos.length === JSON.parse(alldeployedRepos).length
                      ) {
                        let tmp = allDemos;
                        let allDeployed = [];
                        while (tmp.length) {
                          allDeployed.push(tmp.splice(0, 4));
                        }
                        this.setState({
                          allDeployed
                        });
                      }
                    });
                  })
                  .catch(err => {
                    toastr.error(err);
                  });
              });
            });
          });
      });
    }
  }

  toggleShow() {
    this.setState({
      showOutput: this.state.showOutput === "visible" ? "hidden" : "visible"
    });
  }

  handleShareModal(demoBeingShown) {
    this.setState({ demoBeingShown }, () => {
      this.setState({ shareModalOpen: !this.state.shareModalOpen });
    });
  }

  getStyles() {
    return {
      layout: {
        background: "#FEFEFE"
      },
      content: {
        margin: "24px 16px 0",
        overflow: "initial"
      },
      contentDiv: {
        padding: 12,
        background: "#FEFEFE",
        textAlign: "center"
      },
      card: {
        width: "100%",
        background: "#FAFAFA"
      },
      footer: {
        textAlign: "center",
        background: "#fefefe",
        color: "#455A64",
        fontSize: "14px",
        boxShadow: "0px -2px 5px #E0E0E0"
      }
    };
  }

  goToDemo(demo) {
    this.props.history.push(
      `/ngh/user/${demo.user_id}/${demo.name}/${demo.id}/demo`
    );
  }

  render() {
    const styles = this.getStyles();
    return (
      <Layout style={styles.layout}>
        <Header id="layout-header">
          <Row>
            <Col span={4} offset={1}>
              <h1 id="logo-title">Public Profile</h1>
            </Col>
          </Row>
        </Header>
        <Content style={styles.content}>
          {this.state.user && (
            <div style={styles.contentDiv}>
              {this.state.allDeployed.length > 0 && (
                <Row>
                  {this.state.allDeployed.map(row => (
                    <div key={Math.random()}>
                      <Row>
                        {row.map(demo => (
                          <Col span={5} offset={1} key={demo.id}>
                            <Card
                              style={styles.card}
                              bodyStyle={{ padding: 0 }}
                            >
                              <div className="custom-card">
                                <br />
                                <h3>{demo.name}</h3>
                              </div>
                              <div className="custom-image">
                                <img width="100%" src={demo.cover_image} />
                              </div>
                              <div className="custom-card">
                                <p>{demo.description}</p>
                                <br />
                                <Row>
                                  <Col span={11} offset={1}>
                                    <Button
                                      type="primary"
                                      style={{ width: "100%" }}
                                      onClick={() => this.goToDemo(demo)}
                                    >
                                      Launch<Icon type="rocket" />
                                    </Button>
                                  </Col>
                                  <Col span={10} offset={1}>
                                    <Button
                                      type="primary"
                                      style={{ width: "100%" }}
                                      onClick={() =>
                                        this.handleShareModal(demo)
                                      }
                                    >
                                      Share<Icon type="share-alt" />
                                    </Button>
                                  </Col>
                                </Row>
                                <br />
                              </div>
                            </Card>
                          </Col>
                        ))}
                      </Row>
                      <br />
                    </div>
                  ))}
                  <br />
                </Row>
              )}
              <br />
            </div>
          )}
        </Content>

        <Footer style={styles.footer}>
          Origami - Created by Team CloudCV
        </Footer>
          <SocialDialog 
          shareModalOpen={this.state.shareModalOpen} 
          handleShareModal={this.handleShareModal.bind(this)}
          demoBeingShown={this.state.demoBeingShown} 
        />

      </Layout>
    );
  }
}

ShareProfileComponent.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

const ShareProfile = Radium(ShareProfileComponent);

export default withRouter(ShareProfile);
