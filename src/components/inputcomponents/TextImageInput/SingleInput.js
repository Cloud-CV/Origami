import React, { PropTypes } from 'react';
import Dropzone from 'react-dropzone';

const singleInput = (props) => {

  function updateImage(index, file) {
    document.getElementById(`input-image-preview-${index}`).src =
      window.URL.createObjectURL(file);
  }

  function onDrop(files) {
    props.updateFormData(files[0], `input-image-${props.index}`);
    updateImage(props.index, files[0]);
  }

  return (
    <div className="ui container grid">
      <div className="centered row">
        <div className="" style={{ height: '100%', cursor: 'pointer' }}>
          <Dropzone onDrop={onDrop} multiple={false} style={{ height: 'inherit' }}>
            <div className="ui card">
              <div className="ui fluid image">
                <img className="ui fluid medium bordered image"
                     src={require('../../assets/wireframe.png')}
                     id={`input-image-preview-${props.index}`}
                />
              </div>
              <div className="content">
                Drag and Drop or Click to upload
              </div>
            </div>
          </Dropzone>
        </div>
      </div>
      <div className="centered row">
        <div className="centered center aligned stretched row">
            <input placeholder={props.label}
                   name={`input-text-${props.index}`}
                   type="text"
                   style={{ width: '25vw' }}
            />
        </div>
      </div>
    </div>
  );
};

singleInput.propTypes = {
  label: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  updateFormData: PropTypes.func.isRequired
};

export default singleInput;
