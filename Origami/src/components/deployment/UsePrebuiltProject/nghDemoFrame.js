import React, { PropTypes } from "react";
import { Link, browserHistory } from "react-router";
import { connect } from "react-redux";
import { getInputComponentById } from "../../inputcomponents";
import { getOutputComponentById } from "../../outputcomponents";
import { getDeployed } from "../../../api/Nongh/getDeployed";
import { modifyDeployed } from "../../../api/Nongh/modifyDeployed";
import {
  getComponentDeployed
} from "../../../api/CommonLocal/getComponentDeployed";

class NGHDemoFramePage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      user_id: 0,
      outputData: [],
      showTerminal: false,
      terminalData: [],
      inputModel: {},
      outputModel: {},
      demoModel: {},
      iframe: this.isIframe(),
      styles: {}
    };
    this.socket = this.context.socket;
    this.socketId = this.context.socketId;
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

    let socket = this.socket;
    socket.onmessage = function(response) {
      let data = JSON.parse(response.data);
      const event = data["event"];
      data = data["data"];
      if (event == "injectOutputData") {
        if (data.data) {
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
    this.setState({ user_id: parseInt(this.props.params.user_id, 10) }, () => {
      getDeployed(this.state.user_id, this.props.params.repoId).then(data => {
        this.setState({ demoModel: JSON.parse(data)[0] });
        if (JSON.parse(data)[0].status === "input") {
          modifyDeployed(
            this.state.user_id,
            Object.assign({}, JSON.parse(data)[0], { status: "demo" })
          ).then();
        }
      });
      getComponentDeployed(
        this.state.user_id,
        this.props.params.repoId,
        "input"
      ).then(data => {
        if (Object.keys(JSON.parse(data)).length) {
          this.setState({ inputModel: JSON.parse(data)[0] });
        }
      });
      getComponentDeployed(
        this.state.user_id,
        this.props.params.repoId,
        "output"
      ).then(data => {
        if (Object.keys(JSON.parse(data)).length) {
          this.setState({ outputModel: JSON.parse(data)[0] });
        }
      });
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
      data
    };
    if (this.state.iframe) this.parentWindow.postMessage(inputSubmitData, '*');
  }

  outputInjected(data) {
    let outputSubmitData = {
      action: "OUTPUT_SUBMITTED",
      data
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
                    "demo",
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
          </div>
        }
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
