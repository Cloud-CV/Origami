import React from "react";
import { PropTypes } from "prop-types";
import Dropzone from "react-dropzone";
import DropboxChooser from "../../imports/DropboxChooser";
import request from "superagent";

const appConfig = require("../../../../outCalls/config");

const singleInput = props => {



  function onDrop(files) {
    props.updateFormData(files[0], `input-image-1`);
    
  }

  function onSelect(files) {
    let url = files[0].link.replace(
      "www.dropbox.com",
      "dl.dropboxusercontent.com"
    );
    request
      .get(url)
      .responseType("blob")
      .end((err, res) => {
        if (!err) {
          let blob = new Blob([res.body], {
            type: "image/png"
          });
          props.updateFormData(blob, `input-image-${props.index}`);
          updateImage(props.index, blob);
        }
      });
  }

  return (
    <div>
      <div>
        <div className="" style={{ height: "100%", cursor: "pointer"}}>
          <Dropzone
            onDrop={onDrop}
            multiple={false}
            style={{ height: "100%" }}
          >
            <div className="ui card" style={{width:'90%'}}>
              <div className="ui fluid image">
                <img
                  className="ui fluid medium image"
                  src={props.src||"/static/img/placeholder.jpg"}
                  id={'input-image-preview-1'}
                  style={{ width: "100%",borderWidth:'0px' }}
                />
              </div>
              <div className="content origami-demo-input-image-component-desc">
                Drag and Drop or Click to upload
              </div>
            </div>
          </Dropzone>
        </div>
      </div>
      {appConfig.DROPBOX_API_KEY !== "API_KEY" && (
        <div>
          <div className="ui horizontal divider">Or</div>
          <div className="centered row">
            <div className="" style={{ height: "100%", cursor: "pointer" }}>
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

singleInput.propTypes = {
  label: PropTypes.string.isRequired,
  index: PropTypes.number,
  updateFormData: PropTypes.func.isRequired,
  src:PropTypes.string.isRequired
};

export default singleInput;
