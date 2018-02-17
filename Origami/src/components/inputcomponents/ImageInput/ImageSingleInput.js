import React from 'react';
import { PropTypes } from 'prop-types';
import Dropzone from 'react-dropzone';
import DropboxChooser from '../../imports/DropboxChooser';
import request from 'superagent';

const appConfig = require('../../../../outCalls/config');

const singleInput = props => {
  function updateImage(index, file) {
    document.getElementById(
      `input-image-preview-${index}`
    ).src = window.URL.createObjectURL(file);
  }

  function onDrop(files) {
    props.updateFormData(files[0], `input-image-${props.index}`);
    updateImage(props.index, files[0]);
  }

  function onSelect(files) {
    let url = files[0].link.replace(
      'www.dropbox.com',
      'dl.dropboxusercontent.com'
    );
    request
      .get(url)
      .responseType('blob')
      .end((err, res) => {
        if (!err) {
          let blob = new Blob([res.body], {
            type: 'image/png',
          });
          props.updateFormData(blob, `input-image-${props.index}`);
          updateImage(props.index, blob);
        }
      });
  }
  const cl1 =
    props.calling_context == 'demo2'
      ? null
      : 'ui container grid origami-demo-input-image-component';
  const cl2 =
    'centered center aligned stretched row origami-demo-input-image-label-container';
  const cl3 = 'ui blue segment origami-demo-input-image-label';
  const height = props.calling_context == 'demo2' ? '50%' : '100%';
  const width = props.calling_context == 'demo2' ? '50%' : '75%';
  return (
    <div className={cl1} style={{ width: 'fit-content' }}>
      <div className={cl2}>
        <div className={cl3}>{props.label}</div>
      </div>
      <div className="centered row">
        <div className="" style={{ height: height, cursor: 'pointer' }}>
          <Dropzone
            onDrop={onDrop}
            multiple={false}
            style={{ height: 'inherit' }}
          >
            <div className="ui card">
              <div className="ui fluid image">
                <img
                  className="ui fluid medium bordered image"
                  src="/static/img/wireframe.png"
                  id={`input-image-preview-${props.index}`}
                  style={{ width: width }}
                />
              </div>
              <div className="content origami-demo-input-image-component-desc">
                Drag and Drop or Click to upload
              </div>
            </div>
          </Dropzone>
        </div>
      </div>
      {appConfig.DROPBOX_API_KEY !== 'API_KEY' && (
        <div>
          <div className="ui horizontal divider">Or</div>
          <div className="centered row">
            <div className="" style={{ height: '100%', cursor: 'pointer' }}>
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
  index: PropTypes.number.isRequired,
  updateFormData: PropTypes.func.isRequired,
};

export default singleInput;
