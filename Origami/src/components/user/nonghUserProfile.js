import React, { PropTypes } from "react";
import { Link, browserHistory } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from "../../actions/userActions";
import * as nonghDemoModelActions from "../../actions/nonghDemoModelActions";
import * as inputComponentDemoModelActions
  from "../../actions/inputComponentDemoModelActions";
import * as outputComponentDemoModelActions
  from "../../actions/outputComponentDemoModelActions";
import { getDeployed } from "../../api/Nongh/getDeployed";
import { getAllPermalink, deletePermalink } from "../../api/Nongh/permalink";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import CircularProgress from "material-ui/CircularProgress";
import CustomCard from "../stateless/cards";
import Dialog from "material-ui/Dialog";
import RaisedButton from "material-ui/RaisedButton";
import { List, ListItem } from "material-ui/List";
import { grey900 } from "material-ui/styles/colors";
import Divider from "material-ui/Divider";
import DescriptionIcon from "material-ui/svg-icons/action/description";
import PublicProfileIcon from "material-ui/svg-icons/action/face";
import toastr from "toastr";

toastr.options.closeButton = true;

class NonGHUserProfile extends React.Component {
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
      projectBeingDeletedId: ""
    };
    this.socket = this.context.socket;
    this.toggleShow = this.toggleShow.bind(this);
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
  }

  componentWillMount() {
    !this.props.login && browserHistory.push("/");
    this.props.useractions
      .LoadUser()
      .then(() => {
        getDeployed(this.props.user.id)
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
            this.setState({ allDeployed: JSON.parse(alldeployedRepos) }, () => {
              deletePermalink({ user_id: this.props.user.id, project_id }).then();
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
    browserHistory.push(
      `/ngh/user/${this.props.user.id}/${project.name}/${project.id}/demo`
    );
  }

  goToRegisterPage() {
    browserHistory.push("/ngh/user/register");
  }

  toggleShow() {
    this.setState({
      showOutput: this.state.showOutput === "visible" ? "hidden" : "visible"
    });
  }

  render() {
    document.body.scrollTop = (document.documentElement.scrollTop = 0);

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
      <div className="ui relaxed stackable grid fluid">

        <div
          className="ui three wide segment column"
          style={{ minHeight: "100vh" }}
        >
          {this.state.user &&
            <List>
              <ListItem
                primaryText="Docs"
                leftIcon={<DescriptionIcon />}
                onTouchTap={() => window.location = "http://cloudcv-origami.readthedocs.io/en/latest/web-app.html"}
              />
              <Divider />
              <ListItem
                primaryText="CVFY-Lib Docs"
                leftIcon={<DescriptionIcon />}
                onTouchTap={() => window.location = "http://cloudcv-origami.readthedocs.io/en/latest/library.html"}
              />
              <Divider />
              <ListItem
                primaryText="Public Profile"
                leftIcon={<PublicProfileIcon />}
                onTouchTap={() =>
                  browserHistory.push(
                    `/u/${this.state.user.login}/${this.state.user.id}`
                  )}
              />
              <Divider />
            </List>}
        </div>

        <div className="ui thirteen wide column grid">

          {this.state.showOutput === "hidden" &&
            <div className="centered row" style={{ marginTop: "30vh" }}>
              <CircularProgress size={89.25} />
            </div>}

          {this.state.user &&
            <div
              className="sixteen column stretched row"
              style={{ visibility: this.state.showOutput }}
            >

              <div
                className="four wide column ui raised rounded"
                style={{ minHeight: "15vh", marginTop: "1vh" }}
              >
                <div className="ui fluid bottom aligned medium rounded image">
                  <div className="ui medium ribbon black label">
                    @{this.state.user.login}
                  </div>
                  <img
                    className=""
                    onLoad={this.toggleShow}
                    src={this.state.user.avatar_url}
                  />
                </div>
              </div>

              <div className="seven wide column">
                <div>
                  <div className="row" style={{}} />
                  <h1 className="row"><u>{this.state.user.name}</u></h1>
                  {this.state.user.company &&
                    <h3 className="row">{this.state.user.company}</h3>}
                  {this.state.user.blog &&
                    <a href={this.state.user.blog}>
                      {" "}<h3 className="row">{this.state.user.blog}</h3>
                    </a>}
                  <h3 className="row">
                    Github Follower Count: {this.state.user.followers}
                  </h3>
                  <h3 className="row">
                    Number of Apps: {this.state.allDeployed.length}
                  </h3>
                </div>
              </div>

              <span className="ui horizontal divider row"><hr /></span>

              <div className="sixteen wide column">
                <div>
                  <div className="row" style={{}} />
                  <FloatingActionButton
                    style={{ float: "right" }}
                    onMouseDown={this.goToRegisterPage}
                  >
                    <ContentAdd />
                  </FloatingActionButton>
                </div>
              </div>

              {this.state.allDeployed &&
                <div
                  className="fifteen wide column stretched stackable centered row"
                >
                  <div className="ui three padded column stackable grid">
                    {this.state.allDeployed.map(project => (
                      <CustomCard
                        header={project.name}
                        width="five"
                        context="profile"
                        centeredParent
                        key={project.id}
                        displayData={[
                          `IP: ${project.token.split(":")[1]}`,
                          `Port: ${project.token.split(":")[4]}`
                        ]}
                        buttonData={[
                          {
                            label: "Delete",
                            onDeployClick: () =>
                              this.toggleDeleteConfirmationDialog(project.id)
                          },
                          {
                            label: "Modify",
                            onDeployClick: () => this.modifyProject(project)
                          },
                          {
                            label: "Get Permalink",
                            onDeployClick: () => {
                              this.toggleShowDataDialog({
                                type: "permalink",
                                content: `${window.location.protocol}//${window.location.host}${this.state.permalinkHolder[this.state.user.id][project.id].short_relative_url}`
                              });
                            }
                          },
                          {
                            label: "Get Token",
                            onDeployClick: () =>
                              this.toggleShowDataDialog({
                                type: "token",
                                content: project.token
                              })
                          },
                          {
                            label: "Demo",
                            onDeployClick: () => this.goToDemoPage(project),
                            display: this.getDisplayForDemoButton(project)
                          }
                        ]}
                      />
                    ))}
                  </div>
                </div>}

            </div>}

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
                      browserHistory.push(
                        `/ngh/user/${this.state.projectBeingEdited.name}/${this.state.projectBeingEdited.id}/register/modify`
                      )}
                  />
                </div>
                <div className="center aligned five wide column">
                  <RaisedButton
                    label="Input"
                    primary
                    onTouchTap={() =>
                      browserHistory.push(
                        `/ngh/user/${this.state.projectBeingEdited.name}/${this.state.projectBeingEdited.id}/inputcomponent/modify`
                      )}
                  />
                </div>
                <div className="center aligned five wide column">
                  <RaisedButton
                    label="Output"
                    primary
                    onTouchTap={() =>
                      browserHistory.push(
                        `/ngh/user/${this.state.projectBeingEdited.name}/${this.state.projectBeingEdited.id}/outputcomponent/modify`
                      )}
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

        </div>

        <div
          className="ui fluid centered row"
          style={{
            minHeight: "5vh",
            backgroundColor: grey900,
            color: "white",
            minWidth: "100vw"
          }}
        >
          © CloudCV, 2016
        </div>

      </div>
    );
  }
}

NonGHUserProfile.propTypes = {
  login: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  inputComponentDemoModel: PropTypes.object.isRequired,
  outputComponentDemoModel: PropTypes.object.isRequired,
  useractions: PropTypes.object.isRequired,
  nonghModelActions: PropTypes.object.isRequired,
  inputComponentModelActions: PropTypes.object.isRequired,
  outputComponentDemoModelActions: PropTypes.object.isRequired
};

NonGHUserProfile.contextTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(NonGHUserProfile);
