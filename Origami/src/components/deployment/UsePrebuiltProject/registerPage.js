import React from "react";
import { PropTypes } from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import CircularProgress from "material-ui/CircularProgress";
import rangeCheck from "range_check";
import { getWebAppStatus } from "../../../api/Generic/getWebAppStatus";
import * as nonghDemoModelActions from "../../../actions/nonghDemoModelActions";
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
import { Layout, Row, Col } from "antd";
import { ORIGAMI_READ_THE_DOCS } from "../../../constants";
import { Card, Icon, Image, Button, Dimmer, Header } from "semantic-ui-react";
import Alert from "../../stateless/alert";
import Cards from "../../stateless/task_cards";
import isUrl from "is-url-superb";

const { Content, Footer } = Layout;

toastr.options.closeButton = true;

class RegisterPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      description: "",
      cover_image: "",
      showTerminal: false,
      active: 0,
      btnactive: 0,
      btnclicked: 0,
      subhover: 0,
      python: 0,
      os: 0,
      cuda: 0,
      id: Math.floor(Math.random() * 10000000).toString(),
      user_id: parseInt(localStorage.getItem("user_id"), 10),
      task: 0,
      source: ""
    };
    this.updateName = this.updateName.bind(this);
    this.updateDescription = this.updateDescription.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.toggleTerminal = this.toggleTerminal.bind(this);
    this.getStyles = this.getStyles.bind(this);
    this.hover = this.hover.bind(this);
    this.exit = this.exit.bind(this);
    this.btnEnter = this.btnEnter.bind(this);
    this.updateSource = this.updateSource.bind(this);
    this.alert = React.createRef();
  }

  updateDescription(e) {
    this.setState({ description: e.target.value });
  }

  updateName(e) {
    this.setState({ name: e.target.value });
  }
  updateSource(e) {
    console.log("this source", this.state.source);
    this.setState({ source: e.target.value });
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

  getStyles() {
    return {
      layout: {
        background: "#F7F7F7"
      },
      content: {
        margin: "24px 0 0 12px",
        overflow: "initial"
      },
      contentDiv: {
        padding: "5px 0",
        background: "#F7F7F7"
      },
      tag: {
        color: "#606470",
        paddingTop: "5px",
        fontFamily: '"Open Sans", "Helvetica", sans-serif',
        fontSize: "1.6em"
      },
      tagOs: {
        color: "#606470",
        paddingTop: "5px",
        fontFamily: '"Open Sans", "Helvetica", sans-serif',
        fontSize: "1.6em",
        paddingLeft: "7px"
      },
      btn: {
        borderStyle: "Solid",
        borderColor: "#949494",
        color: "#6C6666",
        width: "100%",
        backgroundColor: "White",
        borderWidth: "2px",
        borderRadius: "30px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.16), 0 1px 3px rgba(0,0,0,0.23)",
        transition: "all 0.3s"
      },
      txt: {
        fontFamily: '"Open Sans", "Helvetica", sans-serif',
        fontSize: "1em"
      },
      active: {
        borderStyle: "Solid",
        borderColor: "#eaeaea",
        borderWidth: "2px",
        transition: ".3s ease",
        backfaceVisibility: "hidden",
        opacity: "0.8",
        boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)"
      },
      btnactive: {
        borderStyle: "Solid",
        width: "100%",
        borderWidth: "2px",
        borderRadius: "30px",
        backgroundColor: "#443E3E",
        color: "White",
        boxShadow: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
        transition: "all 0.3s"
      },

      parentBox: {
        flexGrow: "5.75",
        minWidth: "300px",
        padding: "30px",
        backgroundColor: "#fffff"
      },
      box: {
        border: "1px solid #F3F2F2",
        backgroundColor: "White",
        borderRadius: "10px",
        padding: "10px"
      },

      sub: {
        borderStyle: "Solid",
        width: "100%",
        borderWidth: "2px",
        borderRadius: "30px",
        backgroundColor: "#443E3E",
        color: "White",
        boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
        transition: "all 0.3s"
      },

      subhover: {
        borderStyle: "Solid",
        width: "100%",
        borderWidth: "2px",
        borderRadius: "30px",
        backgroundColor: "#443E3E",
        color: "White",
        boxShadow: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
        transition: "all 0.3s"
      },
      logo: {
        marginRight: "13px"
      }
    };
  }

  hover(e) {
    this.setState({ active: e });
  }
  btnEnter(e) {
    this.setState({ btnactive: e });
  }

  btnclicked(x, y) {
    let python = this.state.python,
      os = this.state.os,
      cuda = this.state.cuda;

    switch (x) {
      case 1:
        os = y;
        break;
      case 2:
        python = y;
        break;
      case 3:
        cuda = y;
        break;
    }
    this.setState({ python, os, cuda });
  }

  exit() {
    this.setState({ active: 0, btnactive: 0, subhover: 0 });
  }
  sub(e) {
    this.setState({ subhover: e });
  }

  helpDirect() {
    window.location = ORIGAMI_READ_THE_DOCS;
  }

  validate(data) {
    const isEmpty = field => !field || field.length === 0;
    const isSelected = field => field && field != 0;

    if (isEmpty(data.name)) {
      return Promise.reject("Please define the demo's name.");
    }

    if (isEmpty(data.description)) {
      return Promise.reject("Please define the demo's description.");
    }

    if (isEmpty(data.task)) {
      return Promise.reject("Please select the demo's task.");
    }

    if (!isSelected(data.os)) {
      return Promise.reject("Please select the OS for the demo.");
    }

    if (!isSelected(data.python)) {
      return Promise.reject(
        "Please select the Python version you'd like to use in the demo."
      );
    }

    if (!isSelected(data.cuda)) {
      return Promise.reject("Please select the CUDA version for the demo.");
    }

    if (isEmpty(data.source_code)) {
      return Promise.reject(
        "Please add a link for the source code of the demo."
      );
    }

    if (!isUrl(data.source_code)) {
      return Promise.reject(
        "Please use a valid URL as the link of the source code of the demo."
      );
    }

    return Promise.resolve();
  }

  submit() {
    let task = this.state.task;
    let task_in = "";
    switch (task) {
      case 1:
        task_in = "VQA";
        break;
      case 2:
        task_in = "Style Transfer";
        break;
      case 3:
        task_in = "Grad Cam";
        break;
      case 4:
        task_in = "Classification";
        break;
    }

    let dataToPut = {
      name: this.state.name,
      id: this.state.id,
      user_id: this.state.user_id,
      description: this.state.description,
      cover_image: this.state.cover_image,
      terminal: this.state.showTerminal,
      task: task_in,
      os: this.state.os,
      python: this.state.python,
      cuda: this.state.cuda,
      source_code: this.state.source
    };

    this.validate(dataToPut)
      .catch(err => {
        const title = "Invalid demo settings";

        this.setState(
          Object.assign({}, this.state, {
            alertContent: err,
            alertTitle: title,
            showAlert: true
          })
        );
        this.alert.current.set(title, err);
        this.alert.current.show();

        return Promise.reject(err);
      })
      .then(() => this.props.nonghModelActions.addToDBNonGHDemoModel(dataToPut))
      .then(() => this.props.nonghModelActions.updateNonGHDemoModel(dataToPut))
      .then(() => {
        console.log("Done");
        this.props.history.push(
          `/instructions/${dataToPut.user_id}/${dataToPut.id}/bundle`
        );
      })
      .catch(err => {
        console.log("error", err);
      });
  }

  checkbox(event) {
    let current = this.state.checked;
    this.setState({ checked: !current });
  }

  tasks(e) {
    console.log("clicked before", e, this.state.task);
    this.setState({ task: e });
  }

  render() {
    const { active } = this.state;
    let styles = this.getStyles();
    const content = (
      <div>
        <Header className="ui small">Know More</Header>
      </div>
    );

    return (
      <div style={{ backgroundColor: "#F7F7F7" }}>
        <Layout style={styles.layout}>
          {this.state.showOutput === "hidden" && (
            <div className="centered row" style={{ marginTop: "30vh" }}>
              <CircularProgress size={89.25} />
            </div>
          )}
          <Content style={styles.content}>
            {this.state.showAlert && (
              <Alert
                ref={this.alert}
                content={this.state.alertContent}
                title={this.state.alertTitle}
              />
            )}

            <div style={styles.contentDiv}>
              <Row>
                <div
                  style={{
                    visibility: this.state.showOutput,
                    width: "100%",
                    maxWidth: 700,
                    margin: "auto",
                    marginTop: "5px"
                  }}
                >
                  <div
                    className="sixteen wide column stretched"
                    style={{ visibility: this.state.showOutput }}
                  >
                    <h1
                      style={{
                        textAlign: "center",
                        fontSize: "20px",
                        fontWeight: "bold"
                      }}
                    >
                      Register Application
                    </h1>
                  </div>
                  <Stepper linear={false}>
                    <Step active>
                      <StepLabel>
                        <b>Register Application</b>
                      </StepLabel>
                    </Step>
                    <Step active={this.state.inputComponentStepperHighlight}>
                      <StepLabel>Configure bundled code </StepLabel>
                    </Step>
                  </Stepper>
                </div>
              </Row>
              <div>
                <div
                  className="ui grid container"
                  style={{ position: "relative" }}
                >
                  <div className="ui grid container">
                    <div className="column aligned" style={styles.parentBox}>
                      <div style={styles.box}>
                        <a style={{ marginLeft: "40%", fontSize: "18px" }}>
                          <span>
                            <a style={styles.logo}>
                              <img src={require("../../assets/details.png")} />
                            </a>
                          </span>{" "}
                          Demo Details
                        </a>
                        <hr
                          style={{ borderTop: "dotted 1px", color: "#aaaaaa" }}
                        />
                        <div className="ui grid">
                          <div className="two wide column" />
                          <div className="four wide column">
                            <TextField
                              hintText="MyApp"
                              floatingLabelText="Appname"
                              value={this.state.name}
                              errorText={this.state.nameErrorText}
                              onChange={this.updateName}
                            />
                          </div>
                          <div className="three wide column" />
                          <div className="four wide column">
                            <TextField
                              hintText="Description"
                              floatingLabelText="Description"
                              value={this.state.description}
                              onChange={this.updateDescription}
                            />
                          </div>
                        </div>
                        <br />
                      </div>
                      <br />
                      <br />

                      <div style={styles.box}>
                        <a style={{ marginLeft: "40%", fontSize: "18px" }}>
                          <span>
                            <a style={styles.logo}>
                              <img src={require("../../assets/task.png")} />
                            </a>
                          </span>Choose your Task
                        </a>
                        <hr
                          style={{ borderTop: "dotted 1px", color: "#aaaaaa" }}
                        />
                        <br />

                        <div className="ui grid">
                          <div className="two wide column" />

                          <div className=" three wide column">
                            <Cards
                              header={"VQA"}
                              count={1}
                              onClick={this.tasks.bind(this, 1)}
                              clicked={this.state.task == 1}
                            />
                          </div>
                          <div className=" three wide column">
                            <Cards
                              header={"Style Transfer"}
                              count={2}
                              onClick={this.tasks.bind(this, 2)}
                              clicked={this.state.task == 2}
                            />
                          </div>
                          <div className=" three wide column">
                            <Cards
                              header={"Grad Cam"}
                              count={2}
                              onClick={this.tasks.bind(this, 3)}
                              clicked={this.state.task == 3}
                            />
                          </div>
                          <div className=" three wide column">
                            <Cards
                              header={"Classification"}
                              count={2}
                              onClick={this.tasks.bind(this, 4)}
                              clicked={this.state.task == 4}
                            />
                          </div>
                        </div>
                        <br />
                        <br />
                      </div>
                      <br />
                      <br />

                      <div style={styles.box}>
                        <a style={{ marginLeft: "35%", fontSize: "18px" }}>
                          <span>
                            <a style={styles.logo}>
                              <img src={require("../../assets/tools.png")} />
                            </a>
                          </span>Select System Configuration
                        </a>
                        <hr
                          style={{ borderTop: "dotted 1px", color: "#aaaaaa" }}
                        />
                        <br />
                        <br />
                        <div className="ui grid">
                          <div className="three wide column" />
                          <div className="one wide column">
                            <span style={styles.tagOs}>OS</span>
                          </div>
                          <div className="one wide column" />
                          <div className="four wide column">
                            <Button
                              onMouseEnter={this.btnEnter.bind(this, 11)}
                              onClick={this.btnclicked.bind(this, 1, 1)}
                              onMouseLeave={this.exit}
                              style={
                                this.state.btnactive == 11 || this.state.os == 1
                                  ? styles.btnactive
                                  : styles.btn
                              }
                            >
                              <span style={styles.txt}>Ubuntu 14.04</span>
                            </Button>
                          </div>
                          <div className="four wide column">
                            <Button
                              onMouseEnter={this.btnEnter.bind(this, 12)}
                              onClick={this.btnclicked.bind(this, 1, 2)}
                              onMouseLeave={this.exit}
                              style={
                                this.state.btnactive == 12 || this.state.os == 2
                                  ? styles.btnactive
                                  : styles.btn
                              }
                            >
                              <span style={styles.txt}>Ubuntu 16.04</span>
                            </Button>
                          </div>
                        </div>

                        <div className="ui grid">
                          <div className="three wide column" />
                          <div className="one wide column">
                            <h2 style={styles.tag}> Python </h2>
                          </div>
                          <div className="one wide column" />
                          <div className="four wide column">
                            <Button
                              onMouseEnter={this.btnEnter.bind(this, 21)}
                              onClick={this.btnclicked.bind(this, 2, 1)}
                              onMouseLeave={this.exit}
                              style={
                                this.state.btnactive == 21 ||
                                this.state.python == 1
                                  ? styles.btnactive
                                  : styles.btn
                              }
                            >
                              <span style={styles.txt}>2.7</span>
                            </Button>
                          </div>
                          <div className="four wide column">
                            <Button
                              onMouseEnter={this.btnEnter.bind(this, 22)}
                              onClick={this.btnclicked.bind(this, 2, 2)}
                              onMouseLeave={this.exit}
                              style={
                                this.state.btnactive == 22 ||
                                this.state.python == 2
                                  ? styles.btnactive
                                  : styles.btn
                              }
                            >
                              <span style={styles.txt}>3.5</span>
                            </Button>
                          </div>
                        </div>

                        <div className="ui grid">
                          <div className="three wide column" />
                          <div className="one wide column">
                            <h2 style={styles.tag}> CUDA </h2>
                          </div>
                          <div className="one wide column" />
                          <div className="four wide column">
                            <Button
                              onMouseEnter={this.btnEnter.bind(this, 31)}
                              onClick={this.btnclicked.bind(this, 3, 1)}
                              onMouseLeave={this.exit}
                              style={
                                this.state.btnactive == 31 ||
                                this.state.cuda == 1
                                  ? styles.btnactive
                                  : styles.btn
                              }
                            >
                              <span style={styles.txt}>7.0 - runtime</span>
                            </Button>
                          </div>
                          <div className="four wide column">
                            <Button
                              onMouseEnter={this.btnEnter.bind(this, 32)}
                              onClick={this.btnclicked.bind(this, 3, 2)}
                              onMouseLeave={this.exit}
                              style={
                                this.state.btnactive == 32 ||
                                this.state.cuda == 2
                                  ? styles.btnactive
                                  : styles.btn
                              }
                            >
                              <span style={styles.txt}>8.0 - runtime</span>
                            </Button>
                          </div>
                        </div>
                        <br />
                        <br />
                      </div>
                      <br />
                      <br />

                      <div style={styles.box}>
                        <a style={{ marginLeft: "35%", fontSize: "18px" }}>
                          <span>
                            <a style={styles.logo}>
                              <img src={require("../../assets/settings.png")} />
                            </a>
                          </span>{" "}
                          Optional configurations{" "}
                        </a>
                        <hr
                          style={{ borderTop: "dotted 1px", color: "#aaaaaa" }}
                        />

                        <br />
                        <div className="ui grid">
                          <div className="two column row">
                            <div
                              className="column"
                              style={{ paddingLeft: "13%" }}
                            >
                              <div
                                className=""
                                style={{ cursor: "pointer", maxWidth: "75%" }}
                              >
                                <Dropzone
                                  accept="image/*"
                                  onDrop={this.onDrop}
                                  multiple={false}
                                  style={{ height: "inherit" }}
                                >
                                  <div className="ui card">
                                    <div className="ui fluid image">
                                      <img
                                        className="ui fluid medium  image"
                                        src={
                                          this.state.cover_image ||
                                          "/static/img/placeholder.jpg"
                                        }
                                        id={"input-image-preview"}
                                      />
                                    </div>
                                    <div
                                      className="content"
                                      style={{
                                        fontSize: "15px",
                                        color: "#323643"
                                      }}
                                    >
                                      Drag and Drop or Click to upload cover
                                      image
                                    </div>
                                  </div>
                                </Dropzone>
                              </div>
                            </div>

                            <div
                              className="column"
                              style={{ paddingLeft: "5%" }}
                            >
                              <br />
                              <div className="row">
                                <Checkbox
                                  checked={this.state.showTerminal}
                                  onCheck={this.toggleTerminal}
                                  label="Show Terminal on demo page"
                                  style={{
                                    fontSize: "15px",
                                    color: "#323643",
                                    fontWeight: "Normal"
                                  }}
                                />
                              </div>
                              <br />
                              <div className="row">
                                <div className="four wide column">
                                  <span>
                                    <a style={styles.logo}>
                                      <img
                                        src={require("../../assets/code .png")}
                                      />
                                    </a>
                                  </span>
                                  <TextField
                                    hintText="https://github.com/"
                                    floatingLabelText="Link to Source Code"
                                    value={this.state.source}
                                    errorText={this.state.nameErrorText}
                                    onChange={this.updateSource}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <br />
                      <br />
                      <div className="ui grid">
                        <div className="three wide column" />
                        <div className="three wide column">
                          <Button
                            onMouseEnter={this.sub.bind(this, 1)}
                            onMouseLeave={this.exit}
                            style={
                              this.state.subhover == 1
                                ? styles.subhover
                                : styles.sub
                            }
                          >
                            <span style={styles.txt}>Reset</span>
                          </Button>
                        </div>

                        <div className="two wide column" />
                        <div className="three wide column">
                          <Button
                            primary
                            onMouseEnter={this.sub.bind(this, 2)}
                            onMouseLeave={this.exit}
                            onClick={this.submit.bind(this)}
                            style={
                              this.state.subhover == 2
                                ? styles.subhover
                                : styles.sub
                            }
                          >
                            <span style={styles.txt}>Submit</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Content>
        </Layout>
      </div>
    );
  }
}

RegisterPage.propTypes = {
  login: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  nonghDemoModel: PropTypes.object.isRequired,
  nonghModelActions: PropTypes.object.isRequired
};

RegisterPage.contextTypes = {
  socket: PropTypes.object.isRequired,
  socketId: PropTypes.string.isRequired
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(RegisterPage)
);
