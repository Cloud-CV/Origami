import React, { PropTypes } from "react";

class OutputShowcaseCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headers: [""],
      modifyDialogDisplay: false,
      previewDialogDisplay: false
    };
    this.demoModel = props.demoProps.demoModel;
    this.user = props.demoProps.user;
    this.outputComponentDemoModel = props.demoProps.outputComponentDemoModel;
    this.outputComponentDemoModelActions = props.demoProps.outputComponentDemoModelActions;
    this.forwardAddress = props.demoProps.forwardAddress;
    this.forwardAddressAlternate = props.demoProps.forwardAddressAlternate;
    this.showModifyDialog = this.showModifyDialog.bind(this);
    this.getHeaderRealLength = this.getHeaderRealLength.bind(this);
    this.showPreviewDialog = this.showPreviewDialog.bind(this);
    this.updateOutputComponentModel = this.updateOutputComponentModel.bind(
      this
    );
    this.updateHeaders = this.updateHeaders.bind(this);
    this.getHeaders = this.getHeaders.bind(this);
    this.hideModifyDialog = this.hideModifyDialog.bind(this);
    this.hidePreviewDialog = this.hidePreviewDialog.bind(this);
  }

  showModifyDialog() {
    this.setState({ modifyDialogDisplay: true });
  }

  hideModifyDialog() {
    this.setState({ modifyDialogDisplay: false });
  }

  showPreviewDialog() {
    this.setState({ previewDialogDisplay: true });
  }

  hidePreviewDialog() {
    this.setState({ previewDialogDisplay: false });
  }

  updateHeaders(data) {
    let dataToUpdate = [];
    data.map(value => {
      dataToUpdate.push(value);
    });
    this.setState({ headers: dataToUpdate });
  }

  getHeaderRealLength() {
    let counter = 0;
    this.state.headers.map(() => {
      counter += 1;
    });
    return counter;
  }

  getHeaders() {
    let headers = [];
    this.state.headers.map((header, index) => {
      if (typeof header === "object") {
        header = "";
      }
      headers[index] = header;
    });
    return headers;
  }
}

OutputShowcaseCard.propTypes = {
  demoProps: PropTypes.object.isRequired
};

export default OutputShowcaseCard;
