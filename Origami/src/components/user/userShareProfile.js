import React from "react";
import { PropTypes } from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from "../../actions/userActions";
import * as nonghDemoModelActions from "../../actions/nonghDemoModelActions";
import * as inputComponentDemoModelActions from "../../actions/inputComponentDemoModelActions";
import * as outputComponentDemoModelActions from "../../actions/outputComponentDemoModelActions";
import { getDeployed } from "../../api/Nongh/getDeployed";
import { getAllPermalink, deletePermalink } from "../../api/Nongh/permalink";
import Dialog from "material-ui/Dialog";
import RaisedButton from "material-ui/RaisedButton";
import toastr from "toastr";
import { Layout, Icon, Button, Card, Row, Col, Input,Modal } from "antd";
import Radium from "radium";
import { trimAndPad } from "../../utils/generalUtils";
import { DEMO_CARD_DESCRIP_MAX_LEN } from "../../constants";
import { BounceLoader } from "react-spinners";


const { Header, Content, Footer, Sider } = Layout;
const Search = Input.Search;

toastr.options.closeButton = true;

class NonGHUserProfileComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      user: {},
      showOutput: "hidden",
      allDeployed: [],
      projectBeingEdited: {},
      showModifyModal: false,
      showDeleteConfirmationModal: false,
      showDemo: {},
      appData: { type: "", content: "" },
      showDataModal: false,
      permalinkHolder: {},
      projectBeingDeletedId: "",
      demoLoading: true
    };
    this.socket = this.context.socket;
    this.success = this.success.bind(this);
    this.initiateLogin=this.initiateLogin.bind(this);
    this.deleteDemo = this.deleteDemo.bind(this);
    this.modifyProject = this.modifyProject.bind(this);
    this.getDisplayForDemoButton = this.getDisplayForDemoButton.bind(this);
    this.goToDemoPage = this.goToDemoPage.bind(this);
    this.goToRegisterPage = this.goToRegisterPage.bind(this);
    this.toggleModifyDialog = this.toggleModifyDialog.bind(this);
    this.toggleDeleteConfirmationDialog = this.toggleDeleteConfirmationDialog.bind(
      this
    );
    this.toggleShowDataDialog = this.toggleShowDataDialog.bind(this);
    this.getStyles = this.getStyles.bind(this);
  }

  componentWillMount() {
    this.initiateLogin();

    if(this.props.login)
    {
    this.props.useractions
      .LoadUser()
      .then(() => {
        getDeployed(this.props.user.id)
          .then(alldeployedRepos => {
            let tmp = JSON.parse(alldeployedRepos);
            let allDeployed = [];
            while (tmp.length) {
              allDeployed.push(tmp.splice(0, 4));
            }
            this.setState({ allDeployed });
            this.setState({ demoLoading: false });
          })
          .then(() => {
            const stateToPut = {};
            getAllPermalink().then(data => {
              JSON.parse(data).map(perma => {
                if (!stateToPut[perma.user_id]) {
                  stateToPut[perma.user_id] = {};
                }
                stateToPut[perma.user_id][perma.project_id] = perma;
                this.setState({
                  permalinkHolder: Object.assign({}, stateToPut)
                });
              });
            });
          })
          .catch(err => {
            toastr.error(err);
          });
      })
      .catch(err => {
        toastr.error(`Error: ${err}`);
      });
    }
  }
  success() {
    const modal = Modal.info({
      title: "Logging you in"
    });
    setTimeout(() => modal.destroy(), 2000);
  }

  initiateLogin() {
    if(!this.props.login)
    {
    this.success();
    window.location = "/auth/github/login/";
  }
  }
  componentWillReceiveProps(nextProps) {
    if (this.state.user !== nextProps.user) {
      this.setState({ user: nextProps.user });
    }
  }

  toggleDeleteConfirmationDialog(projectBeingDeletedId) {
    if (projectBeingDeletedId) {
      this.setState({ projectBeingDeletedId });
    }
    this.setState({
      showDeleteConfirmationModal: !this.state.showDeleteConfirmationModal
    });
  }

  deleteDemo() {
    const project_id = this.state.projectBeingDeletedId;
    this.toggleDeleteConfirmationDialog();
    this.props.nonghModelActions
      .killNonGHDemoModel(this.props.user.id, project_id)
      .then(() => {
        getDeployed(this.props.user.id)
          .then(alldeployedRepos => {
            let tmp = JSON.parse(alldeployedRepos);
            let allDeployed = [];
            while (tmp.length) {
              allDeployed.push(tmp.splice(0, 4));
            }
            this.setState({ allDeployed }, () => {
              deletePermalink({
                user_id: this.props.user.id,
                project_id
              }).then();
            });
          })
          .catch(err => {
            toastr.error(err);
          });
      });
  }

  modifyProject(project) {
    let dataToUpdate = {
      name: project.name,
      id: project.id,
      user_id: project.user_id,
      description: project.description,
      timestamp: project.timestamp,
      token: project.token,
      status: project.status,
      appData: {}
    };
    this.props.nonghModelActions.updateNonGHDemoModel(dataToUpdate).then(() => {
      this.setState({ projectBeingEdited: project }, () => {
        this.toggleModifyDialog();
      });
    });
  }

  toggleModifyDialog() {
    this.setState({ showModifyModal: !this.state.showModifyModal });
  }

  toggleShowDataDialog(data) {
    this.setState({ showDataModal: !this.state.showDataModal }, () => {
      if (data) {
        this.setState({ appData: data });
      }
    });
  }

  getDisplayForDemoButton(project) {
    if (project) {
      return "";
    } else {
      return "None";
    }
  }

  goToDemoPage(project) {
    this.props.history.push(
      `/ngh/user/${this.props.user.id}/${project.name}/${project.id}/demo`
    );
  }

  goToRegisterPage() {
    this.props.history.push("/ngh/user/register");
  }

  getStyles() {
    return {
      layout: {
      },
      content: {
        margin: "24px 16px 0",
        overflow: "initial"
      },
      contentDiv: {
        padding: 12,
        textAlign: "center"
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

  render() {
    const demoSpinnerStyle = {
  position: "fixed",
  top: "50%",
  left: "50%"
};
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    const styles = this.getStyles();

    const deletionActions = [
      <RaisedButton
        key="0"
        label="Cancel"
        primary
        onTouchTap={this.toggleDeleteConfirmationDialog}
      />,
      <span key="2">&nbsp;</span>,
      <RaisedButton
        label="Delete"
        key="3"
        primary
        onTouchTap={this.deleteDemo}
      />
    ];

    return (
      <Layout >
        <Header id="layout-header">

          <Row>
            <Col span={18} offset={1}>
              <h1 id="logo-title">
                My Demos - {localStorage.getItem("username")}
              </h1>
            </Col>
          </Row>
        </Header>
                {this.state.demoLoading ? (
              <div className="demoSpinner" style={demoSpinnerStyle}>
                <BounceLoader color={"#33aadd"} size={80} />
              </div>
            ) : (
        <Content >
          {this.state.user && (
            <div style={styles.contentDiv}>
              <Row>
                {this.state.allDeployed.map(row => (
                  <div key={Math.random()}>
                    <Row>
                      {row.map(project => (
                        <Col span={5} offset={1} key={project.id}>
                          <Card
                            style={{ width: "100%" }}
                            bodyStyle={{ padding: 0 }}
                          >
                            <div className="custom-card">
                              <br />
                              <h3>{project.name}</h3>
                            </div>
                            <div className="custom-image">
                              <img width="100%" src={project.cover_image} />
                            </div>
                            <div className="custom-card">
                              <p>
                                {trimAndPad(
                                  project.description,
                                  DEMO_CARD_DESCRIP_MAX_LEN
                                )}
                              </p>
                              <br />
                              IP: {project.token.split(":")[1]} <br />
                              Port: {project.token.split(":")[4]} <br />
                              <br />
                              <Row>
                                <Col span={22} offset={1}>
                                  <Button
                                    type="primary"
                                    style={{ width: "100%" }}
                                    ghost
                                    onClick={() => this.goToDemoPage(project)}
                                  >
                                    Demo<Icon type="rocket" />
                                  </Button>
                                </Col>
                              </Row>
                              <br />
                              <Row>
                                <Col span={11} offset={1}>
                                  <Button
                                    type="primary"
                                    style={{ width: "100%" }}
                                    ghost
                                    onClick={() => this.modifyProject(project)}
                                  >
                                    Modify<Icon type="edit" />
                                  </Button>
                                </Col>
                                <Col span={10} offset={1}>
                                  <Button
                                    type="primary"
                                    style={{ width: "100%" }}
                                    ghost
                                    onClick={() =>
                                      this.toggleShowDataDialog({
                                        type: "token",
                                        content: project.token
                                      })
                                    }
                                  >
                                    Token<Icon type="bars" />
                                  </Button>
                                </Col>
                              </Row>
                              <br />
                              <Row>
                                <Col span={11} offset={1}>
                                  <Button
                                    type="primary"
                                    style={{ width: "100%" }}
                                    ghost
                                    onClick={() =>
                                      this.toggleShowDataDialog({
                                        type: "permalink",
                                        content: `${
                                          window.location.protocol
                                        }//${window.location.host}${
                                          this.state.permalinkHolder[
                                            this.state.user.id
                                          ][project.id].short_relative_url
                                        }`
                                      })
                                    }
                                  >
                                    Permalink<Icon type="link" />
                                  </Button>
                                </Col>
                                <Col span={10} offset={1}>
                                  <Button
                                    type="danger"
                                    style={{ width: "100%" }}
                                    ghost
                                    onClick={() =>
                                      this.toggleDeleteConfirmationDialog(
                                        project.id
                                      )
                                    }
                                  >
                                    Delete <Icon type="delete" />
                                  </Button>
                                </Col>
                              </Row>
                              <br />
                            </div>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  </div>
                ))}
              </Row>
            </div>
          )}
        </Content>

        )}

    


        <Dialog
          title="Modify Application"
          open={this.state.showModifyModal}
          onRequestClose={this.toggleModifyDialog}
          contentStyle={{ width: "30%" }}
        >
          <div className="ui stackable grid">
            <div className="ui stackable row">
              <div className="center aligned six wide column">
                <RaisedButton
                  label="Metadata"
                  primary
                  onTouchTap={() =>
                    this.props.history.push(
                      `/ngh/user/${this.state.projectBeingEdited.name}/${
                        this.state.projectBeingEdited.id
                      }/register/modify`
                    )
                  }
                />
              </div>
              <div className="center aligned five wide column">
                <RaisedButton
                  label="Input"
                  primary
                  onTouchTap={() =>
                    this.props.history.push(
                      `/ngh/user/${this.state.projectBeingEdited.name}/${
                        this.state.projectBeingEdited.id
                      }/inputcomponent/modify`
                    )
                  }
                />
              </div>
              <div className="center aligned five wide column">
                <RaisedButton
                  label="Output"
                  primary
                  onTouchTap={() =>
                    this.props.history.push(
                      `/ngh/user/${this.state.projectBeingEdited.name}/${
                        this.state.projectBeingEdited.id
                      }/outputcomponent/modify`
                    )
                  }
                />
              </div>
            </div>
          </div>
        </Dialog>

        <Dialog
          title={this.state.appData.type === "token" ? "Token" : "Permalink"}
          open={this.state.showDataModal}
          onRequestClose={this.toggleShowDataDialog}
          contentStyle={{ width: "30%" }}
        >
          {this.state.appData.content}
        </Dialog>

        <Dialog
          title="Confirm Deletion"
          actions={deletionActions}
          open={this.state.showDeleteConfirmationModal}
          onRequestClose={this.toggleDeleteConfirmationDialog}
        >
          Are you sure you want to delete this application?
        </Dialog>
      </Layout>
    );
  }
}

NonGHUserProfileComponent.propTypes = {
  history: PropTypes.object.isRequired,
  login: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  inputComponentDemoModel: PropTypes.object.isRequired,
  outputComponentDemoModel: PropTypes.object.isRequired,
  useractions: PropTypes.object.isRequired,
  nonghModelActions: PropTypes.object.isRequired,
  inputComponentModelActions: PropTypes.object.isRequired,
  outputComponentDemoModelActions: PropTypes.object.isRequired
};

NonGHUserProfileComponent.contextTypes = {
  socket: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    login: state.login,
    user: state.user,
    nonghDemoModel: state.nonghDemoModel,
    inputComponentDemoModel: state.inputComponentDemoModel,
    outputComponentDemoModel: state.outputComponentDemoModel
  };
}

function mapDispatchToProps(dispatch) {
  return {
    useractions: bindActionCreators(userActions, dispatch),
    nonghModelActions: bindActionCreators(nonghDemoModelActions, dispatch),
    inputComponentModelActions: bindActionCreators(
      inputComponentDemoModelActions,
      dispatch
    ),
    outputComponentDemoModelActions: bindActionCreators(
      outputComponentDemoModelActions,
      dispatch
    )
  };
}

const NonGHUserProfile = Radium(NonGHUserProfileComponent);

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(NonGHUserProfile)
);
