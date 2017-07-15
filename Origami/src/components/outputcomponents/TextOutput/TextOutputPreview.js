import React, { PropTypes } from "react";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import TextOutput from "./TextOutput";
import OutputPreview from "../BaseOutputComponent/OutputPreview.js";

class TextOutputPreview extends OutputPreview {
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
        title="Preview Text Output Component"
        actions={actions}
        modal
        autoScrollBodyContent
        open={this.state.open}
      >
        <TextOutput
          headers={this.state.headers}
          calling_context="demo"
          data={new Array(this.state.headers.length).fill(
            "Text Output sent from your code!"
          )}
        />
      </Dialog>
    );
  }
}

TextOutputPreview.propTypes = {
  functions: PropTypes.object.isRequired
};

export default TextOutputPreview;
