import React, { PropTypes } from "react";

class InputShowcaseCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: [""],
      modifyDialogDisplay: false,
      previewDialogDisplay: false
    };
    this.demoModel = props.demoProps.demoModel;
    this.user = props.demoProps.user;
    this.inputComponentDemoModel = props.demoProps.inputComponentDemoModel;
    this.inputComponentModelActions = props.demoProps.inputComponentModelActions;
    this.forwardAddress = props.demoProps.forwardAddress;
    this.showModifyDialog = this.showModifyDialog.bind(this);
    this.getLabelRealLength = this.getLabelRealLength.bind(this);
    this.showPreviewDialog = this.showPreviewDialog.bind(this);
    this.updateInputComponentModel = this.updateInputComponentModel.bind(this);
    this.updateLabels = this.updateLabels.bind(this);
    this.getLabels = this.getLabels.bind(this);
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

  updateLabels(data) {
    let dataToUpdate = [];
    data.map(value => {
      dataToUpdate.push(value);
    });
    this.setState({ labels: dataToUpdate });
  }

  getLabelRealLength() {
    let counter = 0;
    this.state.labels.map(() => {
      counter += 1;
    });
    return counter;
  }

  getLabels() {
    let labels = [];
    this.state.labels.map((label, index) => {
      if (typeof label === "object") {
        label = "";
      }
      labels[index] = label;
    });
    return labels;
  }
}

InputShowcaseCard.propTypes = {
  demoProps: PropTypes.object.isRequired
};

export default InputShowcaseCard;
