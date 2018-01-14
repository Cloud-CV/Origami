import React from "react";
import { PropTypes } from "prop-types";
import { Link, browserHistory } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import CircularProgress from "material-ui/CircularProgress";
import * as nonghDemoModelActions from "../../../actions/nonghDemoModelActions";
import rangeCheck from "range_check";
import { getDeployed } from "../../../api/Nongh/getDeployed";
import {
  getComponentDeployed
} from "../../../api/CommonLocal/getComponentDeployed";
import {
  getSinglePermalink,
  getAllPermalink,
  addPermalink,
  modifyPermalink
} from "../../../api/Nongh/permalink";
import { getWebAppStatus } from "../../../api/Generic/getWebAppStatus";
import RaisedButton from "material-ui/RaisedButton";
import StopNow from "material-ui/svg-icons/action/pan-tool";
import Dropzone from "react-dropzone";
import Checkbox from "material-ui/Checkbox";
import GoAhead from "material-ui/svg-icons/action/check-circle";
import { red500, green500, grey900 } from "material-ui/styles/colors";
import TextField from "material-ui/TextField";
import request from "superagent";
import { Step, Stepper, StepLabel } from "material-ui/Stepper";
import toastr from "toastr";

toastr.options.closeButton = true;

class RegisterPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      showOutput: "hidden",
      id: Math.floor(Math.random() * 10000000).toString(),
      user_id: parseInt(localStorage.getItem("user_id"), 10),
      currentProject: {},
      nonghDemoModel: {},
      name: "",
      description: "",
      nameErrorText: "",
      addressErrorText: "",
      portErrorText: "",
      address: "",
      port: "",
      currentPort: "",
      webappaddress: "",
      tempwebaddress: "",
      footer_message: "",
      cover_image: "",
      deploymentBoxSelectedStatus: false,
      status: "",
      webappUnreachableErrorText: "",
      webappLocalUnreachableErrorText: "",
      showLocalDeploymentCheckBox: true,
      showTerminal: false,
      returning: false,
      inputComponentStepperHighlight: false,
      outputComponentStepperHighlight: false,
      permalinkObject: {}
    };
    this.socket = this.context.socket;
    this.toggleShow = this.toggleShow.bind(this);
    this.updateDemoModelData = this.updateDemoModelData.bind(this);
    this.onLocalDeploymentCheckBoxCheck = this.onLocalDeploymentCheckBoxCheck.bind(
      this
    );
    this.updateDescription = this.updateDescription.bind(this);
    this.updateAddress = this.updateAddress.bind(this);
    this.updateName = this.updateName.bind(this);
    this.updatePort = this.updatePort.bind(this);
    this.updatefooter_message = this.updatefooter_message.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.toggleTerminal = this.toggleTerminal.bind(this);
    this.validateTempwebaddress = this.validateTempwebaddress.bind(this);
    this.validateIP = this.validateIP.bind(this);
    this.validatePort = this.validatePort.bind(this);
  }

  componentWillMount() {
    getDeployed(this.state.user_id, this.props.params.repoId)
      .then(singleRepo => {
        if (this.props.params.repoId) {
          if (JSON.parse(singleRepo).length !== 0) {
            this.setState({ returning: true });
            this.setState({
              tempwebaddress: JSON.parse(singleRepo)[0].token.split(":")[1]
            });
            if (JSON.parse(singleRepo)[0].token.split(":")[1] === "0.0.0.0") {
              this.setState({ showLocalDeploymentCheckBox: true });
            }
            this.setState({ id: JSON.parse(singleRepo)[0].id });
            this.setState({ name: JSON.parse(singleRepo)[0].name });
            this.setState({ status: JSON.parse(singleRepo)[0].status });
            this.setState({
              address: JSON.parse(singleRepo)[0].token.split(":")[1]
            });
            this.setState({
              tempwebaddress: JSON.parse(singleRepo)[0].token.split(":")[5]
            });
            this.setState({
              port: JSON.parse(singleRepo)[0].token.split(":")[4]
            });
            this.setState({
              description: JSON.parse(singleRepo)[0].description
            });
            this.setState({
              footer_message: JSON.parse(singleRepo)[0].footer_message
            });
            this.setState({
              cover_image: JSON.parse(singleRepo)[0].cover_image
            });
            this.setState({ showTerminal: JSON.parse(singleRepo)[0].terminal });
            if (JSON.parse(singleRepo)[0].token.split(":")[5] === "0.0.0.0") {
              this.setState({ deploymentBoxSelectedStatus: true });
            }
          }
        }
      })
      .then(() => {
        if (this.props.params.repoId) {
          getComponentDeployed(
            this.state.user_id,
            this.props.params.repoId,
            "input"
          ).then(inputComponentSeedData => {
            if (JSON.parse(inputComponentSeedData).length !== 0) {
              this.setState({ inputComponentStepperHighlight: true });
            }
          });
        }
      })
      .then(() => {
        if (this.props.params.repoId) {
          getComponentDeployed(
            this.state.user_id,
            this.props.params.repoId,
            "output"
          ).then(outputComponentSeedData => {
            if (JSON.parse(outputComponentSeedData).length !== 0) {
              this.setState({ outputComponentStepperHighlight: true });
            }
          });
        }
      })
      .then(() => {
        if (this.props.params.repoId) {
          getSinglePermalink(
            this.state.user_id,
            this.props.params.repoId
          ).then(data => {
            if (JSON.parse(data).text !== "Not Found") {
              this.setState({ permalinkObject: JSON.parse(data) });
            }
          });
        }
        let socket = this.socket;
        socket.send(
          JSON.stringify({
            event: "fetchCurrentPort"
          })
        );
        socket.send(
          JSON.stringify({
            event: "getPublicIPaddress"
          })
        );
        socket.onmessage = function(response) {
          let data = JSON.parse(response.data);
          const event = data["event"];
          data = data["data"];
          if (event === "fetchedCurrentPort") {
            this.setState({ currentPort: data });
          } else if (event === "gotPublicIP") {
            this.setState({ webappaddress: data }, () => {
              if (this.state.tempwebaddress.length === 0) {
                this.setState({ tempwebaddress: this.state.webappaddress });
              }
            });
            getWebAppStatus(data).then(() => {}).catch(err => {
              this.setState({
                webappUnreachableErrorText: "This WebApp cannot be reached on it's public IP"
              });
            });
            this.toggleShow();
          }
        }.bind(this);
        this.setState({ showLocalDeploymentCheckBox: true });
      });
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.nonghDemoModel !== nextProps.nonghDemoModel) {
      this.setState({ nonghDemoModel: nextProps.nonghDemoModel });
    }
  }

  onLocalDeploymentCheckBoxCheck(e) {
    if (!this.state.deploymentBoxSelectedStatus) {
      getWebAppStatus(window.location.hostname).then(() => {}).catch(err => {
        this.setState({
          webappLocalUnreachableErrorText: `This WebApp cannot be reached on ${window.location.host}`
        });
      });
    }
    let selectionPool = [window.location.host, this.state.webappaddress];
    this.setState({
      tempwebaddress: selectionPool[
        this.state.deploymentBoxSelectedStatus ? 1 : 0
      ]
    });
    this.setState({
      deploymentBoxSelectedStatus: !this.state.deploymentBoxSelectedStatus
    });
  }

  updateDemoModelData() {
    if (!this.validateIP()) {
      this.setState({ addressErrorText: "Invalid IP address" });
    } else {
      this.setState({ addressErrorText: "" });
    }
    if (!this.validatePort(this.state.port)) {
      this.setState({ portErrorText: "Invalid port number" });
    } else {
      this.setState({ portErrorText: "" });
    }
    if (
      this.state.name.length === 0 ||
      /[~`!#$%\^&*+=\-\[\]\\';,/{}|":<>\?]/g.test(this.state.name)
    ) {
      this.setState({ nameErrorText: "Invalid Project Name" });
    } else {
      this.setState({ nameErrorText: "" });
    }
    if (
      this.state.name.length > 0 &&
      !/[~`!#$%\^&*+=\-\[\]\\';,/{}|":<>\?]/g.test(this.state.name) &&
      this.validateIP() &&
      this.validatePort(this.state.port)
    ) {
      let dataToPut = {
        name: this.state.name,
        id: this.state.id,
        user_id: this.state.user_id,
        address: this.state.address,
        description: this.state.description,
        footer_message: this.state.footer_message,
        cover_image: this.state.cover_image,
        terminal: this.state.showTerminal,
        timestamp: Date.now(),
        token: `nongh:${this.state.address}:${this.state.id}:${this.state.currentPort}:${this.state.port}:${this.state.tempwebaddress}`,
        status: this.state.status || "input"
      };
      this.props.nonghModelActions.addToDBNonGHDemoModel(dataToPut).then(() => {
        this.props.nonghModelActions
          .updateNonGHDemoModel(dataToPut)
          .then(() => {
            if (Object.keys(this.state.permalinkObject).length > 0) {
              const permaLinkDataToPut = Object.assign(
                {},
                this.state.permalinkObject,
                {
                  full_relative_url: `/ngh/user/${dataToPut.user_id}/${dataToPut.name}/${dataToPut.id}/demo`
                }
              );

              modifyPermalink(permaLinkDataToPut)
                .then(() => {
                  if (this.props.params.type === "modify") {
                    browserHistory.push("/ngh/user");
                  } else {
                    browserHistory.push(
                      `/ngh/user/${this.state.name}/${this.state.id}/inputcomponent`
                    );
                  }
                })
                .catch(err => {
                  toastr.error(
                    `Error occured in creating shortened URL: ${permaLinkDataToPut}`
                  );
                });
            } else {
              const permaLinkDataToPut = {
                short_relative_url: `/p/${Math.random()
                  .toString(36)
                  .substring(2, 11)}`,
                full_relative_url: `/ngh/user/${dataToPut.user_id}/${dataToPut.name}/${dataToPut.id}/demo`,
                user_id: dataToPut.user_id,
                project_id: dataToPut.id
              };

              addPermalink(permaLinkDataToPut)
                .then(() => {
                  if (this.props.params.type === "modify") {
                    browserHistory.push("/ngh/user");
                  } else {
                    browserHistory.push(
                      `/ngh/user/${this.state.name}/${this.state.id}/inputcomponent`
                    );
                  }
                })
                .catch(err => {
                  toastr.error(
                    `Error occured in creating shortened URL: ${permaLinkDataToPut}`
                  );
                });
            }
          });
      });
    }
  }

  updateDescription(e) {
    this.setState({ description: e.target.value });
  }

  updatefooter_message(e) {
    this.setState({ footer_message: e.target.value });
  }

  updateAddress(e) {
    this.setState({ address: e.target.value });
  }

  updatePort(e) {
    this.setState({ port: e.target.value });
  }

  updateName(e) {
    this.setState({ name: e.target.value });
  }

  onDrop(files) {
    if (files[0].size > 5242880) {
      alert("File size should be < 5MB");
    } else {
      document.getElementById(
        "input-image-preview"
      ).src = window.URL.createObjectURL(files[0]);
      const reader = new FileReader();
      reader.onload = () => {
        const dataURI = reader.result;
        this.setState({ cover_image: dataURI });
      };
      reader.readAsDataURL(files[0]);
    }
  }

  toggleTerminal() {
    this.setState({ showTerminal: !this.state.showTerminal });
  }

  validateTempwebaddress() {
    if (
      this.state.webappUnreachableErrorText.length > 0 &&
      this.state.tempwebaddress === this.state.webappaddress
    ) {
      return false;
    }
    if (
      this.state.webappLocalUnreachableErrorText.length > 0 &&
      this.state.tempwebaddress === "0.0.0.0"
    ) {
      return false;
    }

    return true;
  }

  validateIP() {
    if (this.state.address.split(".").length <= 2) {
      return false;
    } else {
      return rangeCheck.validIp(this.state.address);
    }
  }

  validatePort(port) {
    function isNumeric(value) {
      return /^\d+$/.test(value);
    }

    if (isNumeric(port)) {
      const portNumber = parseInt(port);
      return !!(portNumber >= 1024 && portNumber <= 65535);
    } else {
      return false;
    }
  }

  toggleShow() {
    this.setState({
      showOutput: this.state.showOutput === "visible" ? "hidden" : "visible"
    });
  }

  render() {
    let tokenClassName = this.validateTempwebaddress() &&
      this.validateIP() &&
      this.validatePort(this.state.port)
      ? "ui positive message"
      : "ui negative message";
    return (
      <div className="ui relaxed stackable grid fluid">

        <div className="ui relaxed stackable grid fluid container">
          {this.state.showOutput === "hidden" &&
            <div className="centered row" style={{ marginTop: "30vh" }}>
              <CircularProgress size={89.25} />
            </div>}

          <div
            style={{
              visibility: this.state.showOutput,
              width: "100%",
              maxWidth: 700,
              margin: "auto"
            }}
          >
            <Stepper linear={false}>
              <Step active>
                <StepLabel>
                  <b style={{ fontSize: "large" }}>Register Application</b>
                </StepLabel>
              </Step>
              <Step active={this.state.inputComponentStepperHighlight}>
                <StepLabel>Select Input Component</StepLabel>
              </Step>
              <Step active={this.state.outputComponentStepperHighlight}>
                <StepLabel>Select Output Component</StepLabel>
              </Step>
            </Stepper>
          </div>

          <div
            className="sixteen wide column stretched row"
            style={{ visibility: this.state.showOutput }}
          >
            <div className="row">
              <h1>Register Application</h1>
            </div>

            <div className="ui horizontal divider row">
              <span><hr /></span>
            </div>

            <div className="row">
              <div className="ui relaxed stackable grid container">
                <div className="two column row">
                  <div className="column aligned">

                    <TextField
                      hintText="MyApp"
                      floatingLabelText="Appname"
                      value={this.state.name}
                      errorText={this.state.nameErrorText}
                      onChange={this.updateName}
                    />&nbsp;&nbsp;&nbsp;&nbsp;
                    <TextField
                      hintText="0.0.0.0"
                      errorText={this.state.addressErrorText}
                      floatingLabelText="IP of service (no http://)"
                      value={this.state.address}
                      onChange={this.updateAddress}
                    />
                    <br />
                    <TextField
                      hintText="Description"
                      floatingLabelText="Description"
                      value={this.state.description}
                      onChange={this.updateDescription}
                      multiLine
                      rows={2}
                      rowsMax={8}
                    />&nbsp;&nbsp;&nbsp;&nbsp;
                    <TextField
                      hintText="Footer Message"
                      floatingLabelText="Footer Message"
                      value={this.state.footer_message}
                      onChange={this.updatefooter_message}
                      multiLine
                      rows={2}
                      rowsMax={8}
                    />
                    <br />
                    <TextField
                      hintText="8000"
                      errorText={this.state.portErrorText}
                      floatingLabelText="Port for service"
                      value={this.state.port}
                      onChange={this.updatePort}
                    />
                    <br />
                    <br />
                    <div
                      className=""
                      style={{ cursor: "pointer", maxWidth: "50%" }}
                    >
                      <Dropzone
                        onDrop={this.onDrop}
                        multiple={false}
                        style={{ height: "inherit" }}
                      >
                        <div className="ui card">
                          <div className="ui fluid image">
                            <img
                              className="ui fluid medium bordered image"
                              src={
                                this.state.cover_image ||
                                  "/static/img/wireframe.png"
                              }
                              id={"input-image-preview"}
                            />
                          </div>
                          <div className="content">
                            Drag and Drop or Click to upload cover image
                          </div>
                        </div>
                      </Dropzone>
                    </div>
                    <div className="" style={{ maxWidth: "50%" }}>
                      <Checkbox
                        checked={this.state.showTerminal}
                        onCheck={this.toggleTerminal}
                        label="Show Terminal on demo page"
                      />
                      <br />
                    </div>
                    {this.state.webappUnreachableErrorText.length > 0 &&
                      <div
                        className="ui raised compact centered red segment"
                        style={{ color: "red" }}
                      >
                        {this.state.webappUnreachableErrorText}<br />
                      </div>}
                    {this.state.webappLocalUnreachableErrorText.length > 0 &&
                      <div
                        className="ui raised compact centered red segment"
                        style={{ color: "red" }}
                      >
                        {this.state.webappLocalUnreachableErrorText}<br />
                      </div>}
                    {this.state.showLocalDeploymentCheckBox &&
                      <div className="" style={{ maxWidth: "45%" }}>
                        <Checkbox
                          checked={this.state.deploymentBoxSelectedStatus}
                          disabled={this.state.returning}
                          onCheck={this.onLocalDeploymentCheckBoxCheck}
                          label="WebApp is running locally"
                        />
                      </div>}
                    <br />
                    <RaisedButton
                      label="Save"
                      primary
                      onClick={this.updateDemoModelData}
                    />
                  </div>

                  <div className="ui vertical internal divider">
                    <hr />
                  </div>
                  <div className="column">

                    <div className="ui raise fluid very padded container text">
                      <br />
                      <div className="ui relaxed grid container segment">
                        <div className="two column row">
                          <div className="thirteen wide column">
                            <div
                              className={tokenClassName}
                              style={{ wordWrap: "break-word" }}
                            >
                              <u>Token:</u>
                              <b>
                                <p style={{ fontSize: "90%" }}>
                                  {`nongh:${this.state.address}:${this.state.id}:${this.state.currentPort}:` +
                                    `${this.state.port}:${this.state.tempwebaddress}`}
                                </p>
                              </b>
                            </div>
                          </div>
                          <div className="three wide column">
                            {this.validateTempwebaddress() &&
                              this.validateIP() &&
                              this.validatePort(this.state.port)
                              ? <GoAhead
                                  style={{ height: "", width: "" }}
                                  color={green500}
                                />
                              : <StopNow
                                  style={{ height: "", width: "" }}
                                  color={red500}
                                />}
                          </div>
                        </div>
                        <div className="one column row">
                          <div className="sixteen wide column">
                            <div className="ui info message">
                              <div className="header">
                                Steps
                              </div>
                              <ul className="list">
                                <li>
                                  "IP of service" is the public IP address of the machine where the
                                  ML evaluation code is running (or will be run) with the help of cvfy lib.
                                </li>
                                <li>
                                  "Port of service" is the port of the above mentioned service.
                                </li>
                                <li>
                                  Enter the application details and copy the Token.
                                </li>
                                <li>
                                  Use this Token to do registration with the cvfy lib.
                                  See
                                  <Link to="/gettingstarted">
                                    Getting Started
                                  </Link>
                                  .
                                </li>
                              </ul>
                            </div>
                            {(this.state.webappUnreachableErrorText.length >
                              0 ||
                              this.state.webappLocalUnreachableErrorText.length >
                                0) &&
                              <div className="ui orange message">
                                <p>
                                  If this is a local deployment (your machine is not reachable on it's public IP),
                                  you must select the "Webapp is running locally" option.
                                </p>
                              </div>}
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div
          className="ui fluid centered row"
          style={{ minHeight: "10vh", minWidth: "100vw" }}
        />

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

RegisterPage.propTypes = {
  login: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  nonghDemoModel: PropTypes.object.isRequired,
  nonghModelActions: PropTypes.object.isRequired
};

RegisterPage.contextTypes = {
  socket: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    login: state.login,
    user: state.user,
    nonghDemoModel: state.nonghDemoModel
  };
}

function mapDispatchToProps(dispatch) {
  return {
    nonghModelActions: bindActionCreators(nonghDemoModelActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
