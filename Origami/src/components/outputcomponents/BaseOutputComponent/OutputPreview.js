import React, { PropTypes } from "react";

class OutputPreview extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      headers: props.functions.getHeaders(),
      open: true
    };
    this.hidePreviewDialog = props.functions.hidePreviewDialog;
    this.handleOk = this.handleOk.bind(this);
  }

  handleOk() {
    this.hidePreviewDialog();
  }
}

export default OutputPreview;
