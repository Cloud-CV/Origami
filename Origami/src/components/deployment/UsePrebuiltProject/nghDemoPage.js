import React from "react";
import { PropTypes } from "prop-types";
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

class NGHDemoPage extends React.Component {
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
      resetBorder: false
    };
    this.socket = this.context.socket;
    this.socketId = this.context.socketId;
    this.toggleShowTerminal = this.toggleShowTerminal.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
    this.updateFormData = this.updateFormData.bind(this);
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

  render() {
    const mainClassName = this.state.showTerminal
      ? "ui twelve wide column grid"
      : "ui sixteen wide column grid";

    return (
      <div>
        <div className="ui relaxed stackable grid fluid">

          {this.state.demoModel &&
            <div
              className={mainClassName}
              style={{ visibility: this.state.showOutput }}
            >
              {" "}{!this.props.login &&
                <Header id="layout-header">
                  <Row>
                    <Col span={3} offset={1}>
                      <h2 id="logo">
                        <a href="/">
                          <img src="/static/img/origami.png" width="180" />
                        </a>
                      </h2>
                    </Col>
                  </Row>
                </Header>}
              <div
                className="sixteen wide column stretched centered row"
                id="output-outer"
                style={{
                  maxHeight: "90vh",
                  overflowY: "scroll",
                  overflowX: "hidden",
                  whiteSpace: "nowrap"
                }}
              >
                {!this.state.showTerminal &&
                  this.state.demoModel.terminal &&
                  <div className="row">
                    <Button
                      type="primary"
                      shape="circle"
                      icon="arrow-left"
                      size="large"
                      style={{ float: "right", marginRight: "15px" }}
                      ghost
                      onClick={() => this.toggleShowTerminal()}
                    />
                    <br />
                    <br />
                  </div>}
                <div className="row">
                  <h1>{this.state.demoModel.name}</h1>
                  <i>{this.state.demoModel.description}</i>
                </div>
                {this.state.isCreator &&
                  <SampleInput demo_id={this.state.demoModel.id} />}
                {this.state.sampleinput.length > 0 &&
                  <Row>
                    <h3>Sample Inputs</h3>
                    <br />
                    {this.state.sampleinput.map(row => (
                      <div>
                        <Row>
                          {row.map(input => (
                            <SampleImage
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
                <div className="ui horizontal divider row">
                  <span><hr /></span>
                </div>

                <div className="row">
                  <div className="ui relaxed stackable grid container">
                    <div className="column row">

                      <div className="center aligned column">
                        <h2 className="ui row">
                          Input
                        </h2>
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
                  </div>
                </div>

                <div className="ui horizontal divider row">
                  <span><hr /></span>
                </div>

                <div
                  id="appbar-progress"
                  className="ui bottom attached indicating progress"
                  style={{ visibility: "hidden" }}
                >
                  <div className="bar" />
                </div>

                <div className="row" id="output-div">
                  <div className="ui relaxed stackable grid container">
                    <div className="column row">

                      <div className="center aligned column">
                        <h2 className="ui row">
                          Output
                        </h2>
                        {Object.keys(this.state.demoModel).length &&
                          Object.keys(this.state.outputModel).length > 0 &&
                          getOutputComponentById(
                            this.state.outputModel.base_component_id,
                            this.state.outputModel.props,
                            "demo",
                            this.state.outputData
                          )}

                        {this.state.demoModel.footer_message &&
                          <div
                            className="ui fluid centered row"
                            style={{ maxWidth: "100vw", overflowX: "auto" }}
                          >
                            <h4>
                              {this.state.demoModel.footer_message}
                            </h4>
                          </div>}

                        <div
                          className="ui fluid centered row"
                          style={{ minHeight: "5vh" }}
                        />

                        <div className="ui fluid centered row">
                          © CloudCV, 2017
                        </div>

                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>}

          {this.state.showTerminal &&
            <div className="ui four wide column">
              <h2 className="ui header grid" style={{ marginTop: "1vh" }}>
                <div className="ui twelve wide column">
                  <div className="content">
                    Terminal
                  </div>
                </div>
                <div className="ui four wide column">
                  <Button
                    type="danger"
                    shape="circle"
                    icon="close"
                    size="large"
                    ghost
                    onClick={() => this.toggleShowTerminal()}
                  />
                </div>
              </h2>
              <div
                className="ui padded segment"
                style={{
                  minHeight: "80vh",
                  maxHeight: "80vh",
                  backgroundColor: "black",
                  color: "white",
                  overflowY: "scroll",
                  wordWrap: "break-word"
                }}
              >
                {this.state.terminalData.map(data => (
                  <p key={Math.random()}>{data}</p>
                ))}
              </div>
            </div>}
        </div>
        <br />
        <br />
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
          <br />
          <br />
          <br />
        </Footer>
      </div>
    );
  }
}

NGHDemoPage.propTypes = {
  login: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  nonghDemoModel: PropTypes.object.isRequired,
  outputComponentDemoModel: PropTypes.object.isRequired,
  inputComponentDemoModel: PropTypes.object.isRequired
};

NGHDemoPage.contextTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(NGHDemoPage);
