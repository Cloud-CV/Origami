import React, { PropTypes } from "react";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import TextInput from "./TextInput";
import InputPreview from "../BaseInputComponent/InputPreview.js";

class TextInputPreview extends InputPreview {
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
        title="Preview Text Input Component"
        actions={actions}
        modal
        autoScrollBodyContent
        open={this.state.open}
      >
        <TextInput
          calling_context="preview"
          labels={this.state.labels}
          sendAddr=""
        />
      </Dialog>
    );
  }
}

TextInputPreview.propTypes = {
  functions: PropTypes.object.isRequired
};

export default TextInputPreview;
