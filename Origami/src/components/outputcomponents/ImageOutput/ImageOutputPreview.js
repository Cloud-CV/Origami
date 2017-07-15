import React, { PropTypes } from "react";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import ImageOutput from "./ImageOutput";
import OutputPreview from "../BaseOutputComponent/OutputPreview.js";

class ImageOutputPreview extends OutputPreview {
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
        title="Preview Image Output Component"
        actions={actions}
        modal
        autoScrollBodyContent
        open={this.state.open}
      >
        <ImageOutput
          headers={this.state.headers}
          calling_context="demo"
          data={new Array(this.state.headers.length).fill(
            require("../../assets/wireframe.png")
          )}
        />
      </Dialog>
    );
  }
}

ImageOutputPreview.propTypes = {
  functions: PropTypes.object.isRequired
};

export default ImageOutputPreview;
