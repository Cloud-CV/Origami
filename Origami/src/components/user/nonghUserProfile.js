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
import { Layout, Icon, Button, Card, Row, Col, Input, Modal } from "antd";
import Radium from "radium";
import { trimAndPad } from "../../utils/generalUtils";
import { DEMO_CARD_DESCRIP_MAX_LEN } from "../../constants";
import isUrl from "is-url-superb";
import { BounceLoader } from "react-spinners";
import { modifyDeployed } from "../../api/Nongh/modifyDeployed";
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
      demoLoading: true,


      modifiedDemoName: "",
      modifiedDemoDescription: "",
      modifiedDemoPython: "1",
      modifiedDemoCuda: "1",
      modifiedDemoOS: "1",
      modifiedDemoSourceCode: "",

      nameWasChanged: false,
      descriptionWasChanged: false,
      linkWasChanged: false

    };

    this.socket = this.context.socket;
    this.success = this.success.bind(this);
    this.initiateLogin = this.initiateLogin.bind(this);
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


    this.modifyDemoName = this.modifyDemoName.bind(this);
    this.modifyDemoDescription = this.modifyDemoDescription.bind(this);
    this.modifyDemoPython = this.modifyDemoPython.bind(this);
    this.modifyDemoCuda = this.modifyDemoCuda.bind(this);
    this.modifyDemoOS = this.modifyDemoOS.bind(this);
    this.modifyDemoSourceCode = this.modifyDemoSourceCode.bind(this);
  }

  componentWillMount() {
    this.initiateLogin();

    if (this.props.login) {
      this.props.useractions
        .LoadUser()
        .then(() => {
          getDeployed(this.props.user.id)
            .then(alldeployedRepos => {
              let tmp = JSON.parse(alldeployedRepos);
              let allDeployed = [];
              while (tmp.length) {
                allDeployed.push(tmp.splice(0, 3));
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
    if (!this.props.login) {
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
              allDeployed.push(tmp.splice(0, 3));
            }
            this.setState({ allDeployed });
          })
          .catch(err => {
            toastr.error(err);
          });
      });
  }
  validated(stateObj){

    if((stateObj.modifiedDemoName==="") && (stateObj.nameWasChanged)){
      alert('Name cannot be empty!');
      return false;
    }
    if((stateObj.modifiedDemoDescription==="") && (stateObj.descriptionWasChanged)){
      alert('Description cannot be empty!');
      return false;
    }
    if((stateObj.modifiedDemoSourceCode==="") && (stateObj.linkWasChanged)){
      alert('Link cannot be empty!');
      return false;
    }
    if(!isUrl(stateObj.modifiedDemoSourceCode) && (stateObj.linkWasChanged)) {
      alert('Please use a valid URL as the link of the source code of the demo.');
      return false;
    }

    return true;
  }

  modifyProject() {
    if (this.validated(this.state)===true){
    let dataToUpdate = this.state.projectBeingEdited;
    dataToUpdate.name = (this.state.modifiedDemoName===""?dataToUpdate.name:this.state.modifiedDemoName);
    dataToUpdate.description = (this.state.modifiedDemoDescription===""?dataToUpdate.description:this.state.modifiedDemoDescription);
    dataToUpdate.python =(this.state.modifiedDemoPython==="1"?1:2);
    dataToUpdate.cuda = (this.state.modifiedDemoCuda.includes("1")?1:2);
    dataToUpdate.os=(this.state.modifiedDemoOS.includes("1")?1:2);
    dataToUpdate.source_code= (this.state.modifiedDemoSourceCode===""?dataToUpdate.source_code:this.state.modifiedDemoSourceCode);
    console.log('this is the updated object now', dataToUpdate);
    //this.props.nonghModelActions.addToDBNonGHDemoModel(dataToUpdate)
    //.then(() => this.props.nonghModelActions.updateNonGHDemoModel(dataToUpdate))
    modifyDeployed(dataToUpdate.user_id, dataToUpdate)
    .then(() => {
        this.toggleModifyDialog();
        this.props.history.push(
          `/instructions/${dataToUpdate.user_id}/${dataToUpdate.id}/bundle`
        );
    });
  }
}

  toggleModifyDialog(demoBeingModified) {
    if(demoBeingModified){

      demoBeingModified.python = (demoBeingModified.python.includes("1")?"1":"2");
      demoBeingModified.cuda = (demoBeingModified.cuda.includes("1")?"1":"2");
      demoBeingModified.os = (demoBeingModified.os.includes("1")?"1":"2");

      this.setState({projectBeingEdited: demoBeingModified});


    } else {
      this.setState({projectBeingEdited: {}})
    }


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

  clicked(id, user_id) {
    this.props.history.push(`/demo/${user_id}/${id}/page`);
  }

  getStyles() {
    return {
      layout: {
        backgroundColor: "#FFFFFF"
      },
      content: {
        margin: "24px 16px 0",
        overflow: "initial",
        backgroundColor: "#FFFFFF"
      },
      contentDiv: {
        padding: 16,
        textAlign: "center",
        backgroundColor: "#FFFFFF"
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


  modifyDemoName(e){
    this.setState({nameWasChanged: true});
    this.setState({modifiedDemoName: e.target.value});
  }


  modifyDemoDescription(e){
    this.setState({descriptionWasChanged: true});
    this.setState({modifiedDemoDescription: e.target.value});
  }



  modifyDemoPython(e){
    this.setState({modifiedDemoPython: e.target.value});
  }

  modifyDemoCuda(e){
    this.setState({modifiedDemoCuda: e.target.value});
  }

  modifyDemoOS(e){
    this.setState({modifiedDemoOS: e.target.value});
  }

  modifyDemoSourceCode(e){
    this.setState({linkWasChanged: true});
    this.setState({modifiedDemoSourceCode: e.target.value});
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
        onClick={this.toggleDeleteConfirmationDialog}
      />,
      <span key="2">&nbsp;</span>,
      <RaisedButton label="Delete" key="3" primary onClick={this.deleteDemo} />
    ];

    return (
      <Layout>
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
          <Content style={{ paddingTop: "5px" }}>
            {this.state.user && (
              <div style={styles.contentDiv}>
                <Row>
                  {this.state.allDeployed.map(row => (
                    <div key={Math.random()}>
                      <Row>
                        {row.map(demo => (
                          <Col span={6} offset={2} key={demo.id}>
                            <div
                              className="ui card"
                              style={{
                                width: "80%",
                                borderWidth: "0px",
                                borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
                                boxShadow: "0 1px 5px rgba(0, 0, 0, 0.15)"
                              }}
                            >
                              <div
                                className="content"
                                style={{ color: "#323643" }}
                              >
                                <span
                                  style={{
                                    paddingLeft: "5px",
                                    fontSize: "17px",
                                    fontWeight: "Bold"
                                  }}
                                >
                                  {" "}
                                  {demo.name}{" "}
                                </span>
                              </div>
                              <div className="small image">
                                <img
                                  src={demo.cover_image}
                                  style={{ height: "24vh" }}
                                />
                              </div>
                              <div>
                                <div
                                  className="ui buttons"
                                  style={{ width: "100%" }}
                                >
                                  <button
                                    className="ui button"
                                    style={{
                                      color: "#323643",
                                      backgroundColor: "White"
                                    }}
                                    onClick={() =>

                                      {
                                        console.log('this is the unaltered demo obj', demo);
                                        this.toggleModifyDialog(demo);}
                                    }
                                  >
                                    Modify <br/>

                                  </button>


                                  <button
                                    className="ui button"
                                    style={{
                                      color: "#323643",
                                      backgroundColor: "White"
                                    }}
                                    onClick={() =>
                                      this.toggleDeleteConfirmationDialog(
                                        demo.id
                                      )
                                    }
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                              <div
                                className="extra content"
                                style={{
                                  backgroundColor: "#606470",
                                  color: "White",
                                  borderWidth: "0px"
                                }}
                                onClick={this.clicked.bind(
                                  this,
                                  demo.id,
                                  demo.user_id
                                )}
                              >
                                <span>Demo</span> <Icon type="rocket" />
                              </div>
                            </div>
                          </Col>
                        ))}
                      </Row>
                      <br />
                      <br />
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
        >
          <div>
              Task type is: {this.state.projectBeingEdited.task} and cannot be edited <br/>
              <table>
              <tr><th>Data Type</th><th>Data</th></tr>
              <tr><td>Appname</td>
              <td><input type = "text" defaultValue = {this.state.projectBeingEdited.name} onChange={this.modifyDemoName}/> <br/></td></tr>
              <tr><td>Description</td>
              <td><input type = "text" defaultValue = {this.state.projectBeingEdited.description} onChange={this.modifyDemoDescription} /> <br/></td></tr>

               <tr><td>Python</td><td>
              <select defaultValue={this.state.projectBeingEdited.python} onChange={this.modifyDemoPython}>
                <option value="1">Python 2.7</option>
                <option value="2">Python 3.5</option>
              </select>
              <br/></td></tr>
<tr><td>CUDA</td><td>
              <select defaultValue={this.state.projectBeingEdited.cuda} onChange={this.modifyDemoCuda}>
                <option value="1">CUDA 7.0</option>
                <option value="2">CUDA 8.0</option>
              </select>
              <br/></td></tr>
<tr><td>Ubuntu</td><td>
              <select defaultValue={this.state.projectBeingEdited.os} onChange={this.modifyDemoOS}>
                <option value="1">Ubuntu 14.04</option>
                <option value="2">Ubuntu 16.04</option>
              </select>
              <br/>
              </td></tr><tr><td>Source code</td><td>
              <input type = "text" defaultValue = {this.state.projectBeingEdited.source_code} onChange = {this.modifyDemoSourceCode}/><br/>
              </td></tr>
              </table>



                <button type="button" onClick={() =>
                   {
                  this.modifyProject();
                }
                }>Click Me to modify!</button>
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
