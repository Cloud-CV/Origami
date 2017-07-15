import React, { PropTypes } from "react";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import ImageInput from "./ImageInput";
import InputPreview from "../BaseInputComponent/InputPreview.js";

class ImageInputPreview extends InputPreview {
  render() {
    const actions = [
      <FlatButton
        key={0}
        label="Ok"
        primary
        keyboardFocused
        onTouchTap={this.handleOk}
      />
    ];
    return (
      <Dialog
        title="Preview Image Input Component"
        actions={actions}
        modal
        autoScrollBodyContent
        open={this.state.open}
      >
        <ImageInput
          calling_context="preview"
          labels={this.state.labels}
          sendAddr=""
        />
      </Dialog>
    );
  }
}

ImageInputPreview.propTypes = {
  functions: PropTypes.object.isRequired
};

export default ImageInputPreview;
