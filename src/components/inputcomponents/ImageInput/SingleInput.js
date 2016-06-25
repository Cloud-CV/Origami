import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const singleInput = (props) => {

  function updateImage(index, file) {
    document.getElementById('input-image-preview-' + index).src =
      window.URL.createObjectURL(file);
  }

  function uploadButtonClicked(index) {
    document.getElementById('input-image-' + index).click();
  }

  return (
    <div className="ui container grid">
      <div className="centered center aligned stretched row">
        <div className="ui blue segment">
          {props.label}
        </div>
      </div>
      <div className="centered row">
        <div className="ui three wide column">
          <img className="ui fluid medium bordered image"
               id={"input-image-preview-" + props.index} />
        </div>
        <div>
          <RaisedButton label="Choose file" primary
                        onClick={() => uploadButtonClicked(props.index)}/>
        </div>
      </div>
      <div>
        <input placeholder={props.label}
               name={"input-image-" + props.index}
               id={"input-image-" + props.index}
               type="file"
               onChange={(e) => updateImage(props.index, e.target.files[0])}
               style={{width: "25vw", display: "None"}}/>
      </div>
    </div>
  );
};

singleInput.propTypes = {
  label: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired
};

export default singleInput;
