import React, { PropTypes } from "react";
import { browserHistory } from "react-router";
import { connect } from "react-redux";
import { getInputComponentById } from "../../inputcomponents";
import { getOutputComponentById } from "../../outputcomponents";
import { getDeployed } from "../../../api/Nongh/getDeployed";
import { modifyDeployed } from "../../../api/Nongh/modifyDeployed";
import {
  getComponentDeployed
} from "../../../api/CommonLocal/getComponentDeployed";
import SampleInput from "../../sampleinput";
import SampleImage from "../../sampleinput/SampleImage";
import toastr from "toastr";
import { Layout, Icon, Button, Card, Row, Col, Input, Select } from "antd";
const { Header, Content, Footer } = Layout;
import request from "superagent";

toastr.options.closeButton = true;

class NGHDemoFramePage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      demo_creator_id: 0,
      user_id: 0,
      outputData: [],
      showTerminal: false,
      terminalData: [],
      inputModel: {},
      outputModel: {},
      demoModel: {},
      isCreator: false,
      sampleinput: [],
      imageInputCount: 0,
      files: [],
      index: 0,
      resetBorder: false,
      iframe: this.isIframe(),
      styles: {}
    };
    this.socket = this.context.socket;
    this.socketId = this.context.socketId;
    this.toggleShowTerminal = this.toggleShowTerminal.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
    this.updateFormData = this.updateFormData.bind(this);
    setTimeout(() => {
      var hs = document.getElementsByTagName('style');
      var link = document.getElementsByTagName('link');
      for (var i=0, max = hs.length; i < max; i++) {
        if (hs[i])  
          hs[i].parentNode.removeChild(hs[i]);
      }
      for (var i=0, max = link.length; i < max; i++) {
        if (link[i])  
          link[i].parentNode.removeChild(link[i]);
      }
    }, 1000);
    if (this.state.iframe) this.parentWindow = window.parent;
    this.receiveMessage = this.receiveMessage.bind(this);
    this.addStylesheet = this.addStylesheet.bind(this);
    this.inputSubmitted = this.inputSubmitted.bind(this);
    this.outputInjected = this.outputInjected.bind(this);
    window.addEventListener("message", this.receiveMessage, false);
  }

  componentWillMount() {
    $("body").css("overflow", "hidden");

    let socket = this.socket;
    socket.onmessage = function(response) {
      let data = JSON.parse(response.data);
      const event = data["event"];
      data = data["data"];
      if (event == "injectOutputData") {
        if (data.data) {
          this.outputInjected(data.data);
          this.setState({
            outputData: Object.assign(
              Object.assign([], this.state.outputData),
              data.data
            )
          });
          $("#appbar-progress").progress({
            percent: "100%"
          });
          setTimeout(
            () => {
              $("#appbar-progress").css("visibility", "hidden");
              $("#appbar-progress").progress({
                percent: "0%"
              });
            },
            1000
          );
        }
        if (data.terminalData) {
          this.setState({
            terminalData: [...data.terminalData, ...this.state.terminalData]
          });
        }
      }
    }.bind(this);
    this.setState(
      { demo_creator_id: parseInt(this.props.params.user_id, 10) },
      () => {
        this.setState(
          { user_id: parseInt(localStorage.getItem("user_id")) },
          () => {
            if (this.state.user_id === this.state.demo_creator_id) {
              this.setState({ isCreator: true });
            }
          }
        );
        getDeployed(
          this.state.demo_creator_id,
          this.props.params.repoId
        ).then(data => {
          this.setState({ demoModel: JSON.parse(data)[0] }, () => {
            if (this.state.demoModel.terminal) {
              this.setState({ showTerminal: true });
            }
            if (this.state.demoModel.sampleinput !== undefined) {
              let tmp = this.state.demoModel.sampleinput;
              let sampleinputs = [];
              while (tmp.length) {
                sampleinputs.push(tmp.splice(0, 4));
              }
              this.setState({ sampleinput: sampleinputs });
            }
          });
          if (JSON.parse(data)[0].status === "input") {
            modifyDeployed(
              this.state.demo_creator_id,
              Object.assign({}, JSON.parse(data)[0], { status: "demo" })
            ).then();
          }
        });
        getComponentDeployed(
          this.state.demo_creator_id,
          this.props.params.repoId,
          "input"
        ).then(data => {
          if (Object.keys(JSON.parse(data)).length) {
            this.setState({ inputModel: JSON.parse(data)[0] }, () => {
              let val = 0;
              this.state.inputModel.props.map((prop, index) => {
                if (prop["id"] === "3") {
                  val += 1;
                }
              });
              this.setState({ imageInputCount: val });
            });
          }
        });
        getComponentDeployed(
          this.state.demo_creator_id,
          this.props.params.repoId,
          "output"
        ).then(data => {
          if (Object.keys(JSON.parse(data)).length) {
            this.setState({ outputModel: JSON.parse(data)[0] });
          }
        });
      }
    );
  }

  componentWillUnmount() {
    $("body").css("overflow", "auto");
  }

  toggleShowTerminal() {
    this.setState({ showTerminal: !this.state.showTerminal });
  }

  sendRequest(sendAddr) {
    this.setState({ resetBorder: true });
    $("#output-outer").animate(
      {
        scrollTop: $("#output-div").offset().top
      },
      1000
    );
    let formData = new FormData();
    formData.set("socket-id", this.socketId);
    this.state.files.map(file => {
      formData.set(file.newfilename, file.newfile, file.newfilename);
    });
    this.setState({ files: [] }, () => {
      this.setState({ index: 0 });
    });
    let timeout1 = "";
    let timeout2 = "";
    let timeout3 = "";
    $("#appbar-progress").css("visibility", "visible").promise().done(() => {
      $("#appbar-progress").progress({
        percent: "33%"
      });
      timeout1 = setTimeout(
        () => {
          $("#appbar-progress").progress({
            percent: "50%"
          });
        },
        300
      );
      timeout2 = setTimeout(
        () => {
          $("#appbar-progress").progress({
            percent: "65%"
          });
        },
        600
      );
      timeout3 = setTimeout(
        () => {
          $("#appbar-progress").progress({
            percent: "85%"
          });
        },
        1000
      );
    });
    this.inputSubmitted(formData);

    $.ajax({
      type: "POST",
      url: sendAddr,
      data: formData,
      contentType: false,
      cache: false,
      processData: false,
      async: true,
      success: data => {
        $("#appbar-progress").progress({
          percent: "100%"
        });
        clearTimeout(timeout1);
        clearTimeout(timeout2);
        clearTimeout(timeout3);
        setTimeout(
          () => {
            $("#appbar-progress").css("visibility", "hidden");
            $("#appbar-progress").progress({
              percent: "0%"
            });
          },
          1000
        );
      },
      error: (xhr, textStatus, errorThrown) => {
        $("#appbar-progress").css("visibility", "hidden");
        $("#appbar-progress").progress({
          percent: "0%"
        });
        toastr.error("Error occurred!");
      }
    });
  }

  updateFormData(newfile, newfilename) {
    this.setState({
      files: [...this.state.files, { newfilename, newfile }]
    });
    this.setState(
      {
        index: this.state.index + 1
      },
      () => {
        if (this.state.index == this.state.imageInputCount) {
          let sendAddr = `http://${this.state.demoModel.token.split(":")[1]}:${this.state.demoModel.token.split(":")[4]}/event`;
          this.sendRequest(sendAddr);
        }
      }
    );
  }

  onSelect(path) {
    if (this.state.resetBorder) {
      this.setState({ resetBorder: false });
    }
    let url = window.location.origin + path;
    request.get(url).responseType("blob").end((err, res) => {
      if (!err) {
        let file = new File([res.body], `input-image-${this.state.index}`, {
          type: "image/png",
          lastModified: Date.now()
        });
        this.updateFormData(file, `input-image-${this.state.index}`);
      }
    });
  }


  componentDidMount() {
    let onLoad = {
      action: "DEMO_ONLOAD"
    };
    if (this.state.iframe) this.parentWindow.postMessage(onLoad, "*");
  }

  addStylesheet(data) {
    let head = document.head || document.getElementsByTagName("head")[0];
    let style = document.createElement("style");
    style.type = "text/css";
    if (style.styleSheet) {
      style.styleSheet.cssText = data.styles;
    } else {
      style.appendChild(document.createTextNode(data.styles));
    }
    head.appendChild(style);
  }

  inputSubmitted(data) {
    let inputSubmitData = {
      action: "INPUT_SUBMITTED",
      payload: data
    };
    if (this.state.iframe) this.parentWindow.postMessage(inputSubmitData, '*');
  }

  outputInjected(data) {
    let outputSubmitData = {
      action: "OUTPUT_SUBMITTED",
      payload: data
    };
    if (this.state.iframe) this.parentWindow.postMessage(outputSubmitData, '*');
  }

  receiveMessage(message) {
    console.log(message.data.action);
    switch (message.data.action) {
      case "STYLESHEET_SEND":
        this.addStylesheet(message.data);
        break;
      default:
    }
  }

  isIframe() {
    let parentWindow = window.parent;
    if (parentWindow === window) return false;
    else return true;
  }

  render() {

    return (
      <div className="origami-demo-wrapper">
        {this.state.demoModel &&
        <div
          className="origami-demo-container"
          style={{ visibility: this.state.showOutput }}
        >
          <div
            className="origami-demo"
            id="output-outer"
          >
            <div className="origami-demo-header">
              <h1 className="origami-demo-heading">{this.state.demoModel.name}</h1>
              <i className="origami-demo-description">{this.state.demoModel.description}</i>
            </div>
            {this.state.sampleinput.length > 0 &&
              <Row>
                <h3 className="origami-demo-output-heading">Sample Inputs</h3>
                <br />
                {this.state.sampleinput.map((row, index) => (
                  <div key={index}>
                    <Row>
                      {row.map((input, index) => (
                        <SampleImage
                          key={index}
                          onSelect={this.onSelect}
                          value={input.value}
                          resetBorder={this.state.resetBorder}
                        />
                      ))}
                    </Row>
                    <br />
                  </div>
                ))}
              </Row>}

            <div className="origami-demo-input">
              <h3 className="origami-demo-input-heading">
                Input
              </h3>
              <div>  
                {Object.keys(this.state.demoModel).length &&
                Object.keys(this.state.inputModel).length > 0 &&
                getInputComponentById(
                  this.state.inputModel.base_component_id,
                  this.state.inputModel.props,
                  "demoiframe",
                  this.socketId,
                  `http://${this.state.demoModel.token.split(":")[1]}:${this.state.demoModel.token.split(":")[4]}/event`
                )}
              </div>  
            </div>

            <div className="origami-demo-output" id="output-div">
              <h3 className="origami-demo-output-heading">
                Output
              </h3>
                {Object.keys(this.state.demoModel).length &&
                  Object.keys(this.state.outputModel).length > 0 &&
                  getOutputComponentById(
                    this.state.outputModel.base_component_id,
                    this.state.outputModel.props,
                    "demo",
                    this.state.outputData
                  )}
            </div>
          </div>
        </div>}
      </div>
    );
  }
}

NGHDemoFramePage.propTypes = {
  login: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  nonghDemoModel: PropTypes.object.isRequired,
  outputComponentDemoModel: PropTypes.object.isRequired,
  inputComponentDemoModel: PropTypes.object.isRequired
};

NGHDemoFramePage.contextTypes = {
  socket: PropTypes.object.isRequired,
  socketId: PropTypes.string.isRequired
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
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(NGHDemoFramePage);
