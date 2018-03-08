import React from "react";
import { PropTypes } from "prop-types";
import Dropzone from "react-dropzone";
import DropboxChooser from "../imports/DropboxChooser";
import request from "superagent";
import { Layout, Icon, Button, Card, Row, Col, Input, Select } from "antd";
import Cookies from "universal-cookie";
import toastr from "toastr";

const cookies = new Cookies();
const { Header, Content, Footer, Sider } = Layout;

const appConfig = require("../../../outCalls/config");

class SampleInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: []
    };
    this.updateImage = this.updateImage.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
    this.updateFormData = this.updateFormData.bind(this);
    console.log(props.demo_id);
  }

  shouldComponentUpdate() {
    return false;
  }

  sendRequest() {
    let formData = new FormData($("#send-text")[0]);
    this.state.files.map(file => {
      formData.set(file.newfilename, file.newfile, file.newfilename);
    });
    console.log(this.props.demo_id);
    formData.set("demo_id", this.props.demo_id);
    $.ajaxSetup({
      headers: {
        "X-CSRFToken": cookies.get("csrftoken")
      }
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
      url: "/upload_sample_input",
      data: formData,
      contentType: false,
      cache: false,
      processData: false,
      async: true,
      success: data => {
        console.log(data);
        location.reload();
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

  updateImage(file) {
    document.getElementById(
      `sample-image-preview`
    ).src = window.URL.createObjectURL(file);
  }

  onDrop(files) {
    let tmp = [];
    files.forEach((newfile, index) => {
      let newfilename = `sample-image-${index}`;
      tmp.push({ newfilename: newfilename, newfile: newfile });
      this.updateImage(newfile);
      console.log(index);
    });
    this.setState(
      {
        files: tmp
      },
      () => {
        console.log(this.state.files);
      }
    );
  }

  updateFormData(newfile, newfilename) {
    this.setState({
      files: [...this.state.files, { newfilename, newfile }]
    });
  }

  onSelect(files) {
    let url = files[0].link.replace(
      "www.dropbox.com",
      "dl.dropboxusercontent.com"
    );
    request.get(url).responseType("blob").end((err, res) => {
      if (!err) {
        let blob = new Blob([res.body], {
          type: "image/png"
        });
        this.updateFormData(blob, `sample-image-${this.state.index}`);
        this.updateImage(this.state.index, blob);
      }
    });
  }
  render() {
    return (
      <Content>
        <br />
        <Row>
          <h3>Sample Input Uploader</h3>
          <br />
          <Col span={8} offset={4}>
            <Dropzone
              onDrop={this.onDrop}
              multiple={true}
              style={{ height: "inherit" }}
            >
              <Card style={{ width: "100%" }} bodyStyle={{ padding: 0 }}>
                <div className="custom-image">
                  <img
                    className="ui fluid medium bordered image"
                    src="/static/img/wireframe.png"
                    id={`sample-image-preview`}
                  />
                </div>
                <div className="custom-card">
                  Drag and Drop or Click to upload
                </div>
              </Card>
            </Dropzone>
          </Col>
          <Col span={6} offset={1}>
            <br />
            <h4>
              Upload images to serve as sample inputs for the demo.{" "}
            </h4>
            <h5>
              Note: You can press CTRL and select multiple images.
            </h5>
            <br />
            <Row>
              <Col offset={8}>
                <Button
                  type="primary"
                  id="submit"
                  onClick={() => this.sendRequest()}
                >
                  Upload Sample Inputs<Icon type="rocket" />
                </Button>
              </Col>
            </Row>
          </Col>
          <br />
        </Row>
        <br />
        {appConfig.DROPBOX_API_KEY !== "API_KEY" &&
          <div>
            <div className="ui horizontal divider">Or</div>
            <Row>
              <Col style={{ height: "100%", cursor: "pointer" }}>
                <DropboxChooser
                  appKey={appConfig.DROPBOX_API_KEY}
                  success={files => onSelect(files)}
                  multiselect={false}
                >
                  <a className="ui blue button">
                    <span>Upload from dropbox</span>
                  </a>
                  <br />
                </DropboxChooser>
              </Col>
            </Row>
          </div>}
      </Content>
    );
  }
}

SampleInput.propTypes = {
  demo_id: PropTypes.number.isRequired
};

export default SampleInput;
