import React, { PropTypes } from "react";

class InputPreview extends React.Component {
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
}

export default InputPreview;
