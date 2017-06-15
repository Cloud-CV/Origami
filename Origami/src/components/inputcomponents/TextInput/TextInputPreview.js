import React, { PropTypes } from "react";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import TextInput from "./TextInput";

class TextInputPreview extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      labels: props.functions.getLabels(),
      open: true
    };
    this.hidePreviewDialog = props.functions.hidePreviewDialog;
    this.handleOk = this.handleOk.bind(this);
  }

  handleOk() {
    this.hidePreviewDialog();
  }

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
