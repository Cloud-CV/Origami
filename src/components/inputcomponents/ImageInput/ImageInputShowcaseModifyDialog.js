import React, { PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import OverloadedImageField from './OverloadedImageField';

class ImageInputShowcaseModifyDialog extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      textFields: this.makeTextFieldsFromParentLabels(props.functions.getLabels()),
      labels: props.functions.getLabels(),
      open: true
    };
    this.updateLabelsInParent = props.functions.updateLabels;
    this.getLabelsFromParent = props.functions.getLabels;
    this.hideModifyDialog = props.functions.hideModifyDialog;
    this.makeTextFieldsFromParentLabels = this.makeTextFieldsFromParentLabels.bind(this);
    this.addLocalLabels = this.addLocalLabels.bind(this);
    this.deleteLocalLabels = this.deleteLocalLabels.bind(this);
    this.addMoreTextFields = this.addMoreTextFields.bind(this);
    this.getNewField = this.getNewField.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  makeTextFieldsFromParentLabels(allLabels) {
    let tempText = [];
    allLabels.map((label, index) => {
      let currentIndex = allLabels.findIndex(x => x == label);
      tempText[currentIndex] =(
        <div>
          <TextField
            key={Math.random()}
            hintText="Label"
            defaultValue={label}
            onChange={(e) => this.addLocalLabels(currentIndex, e.target.value)}
          />
          &nbsp;&nbsp;&nbsp;
          <RaisedButton
            label="Delete"
            primary
            onMouseDown={() => this.deleteLocalLabels(currentIndex)}
          />
        </div>
      );
    });
    return tempText;
  }

  addLocalLabels(index, data) {
    let templabels = Object.assign([], this.state.labels);
    templabels[index] = data;
    this.setState({labels: templabels});
  }

  deleteLocalLabels(elementId) {
    let templabels = Object.assign([], this.state.labels);
    let temptextfield = Object.assign([], this.state.textFields);
    delete templabels[elementId];
    delete temptextfield[elementId];
    this.setState({labels: templabels});
    this.setState({textFields: temptextfield});
  }

  getNewField() {
    return (
      <OverloadedImageField
        data={{
        labelLength: this.state.labels.length,
        addLocalLabels: this.addLocalLabels,
        deleteLocalLabels: this.deleteLocalLabels
        }} />
    );
  }

  addMoreTextFields() {
    let tempstate = Object.assign([], this.state.textFields);
    tempstate.push(this.getNewField());
    this.setState({textFields: tempstate});
  }

  handleOk() {
    this.hideModifyDialog();
    this.updateLabelsInParent(this.state.labels);
  }

  handleCancel() {
    this.hideModifyDialog();
  }

  render() {
    const actions = [
      <FlatButton
        key={0}
        label="Ok"
        primary
        keyboardFocused
        onTouchTap={this.handleOk}
      />,
      <FlatButton
        key={1}
        label="Cancel"
        primary
        onTouchTap={this.handleCancel}
      />
    ];
    return(<Dialog
            title="Modify Image Input Component"
            actions={actions}
            modal
            autoScrollBodyContent
            open={this.state.open}>
            {this.state.textFields.map(field =>
              [field, <br key={Math.random()} />]
            )}
            <RaisedButton key={Math.random()} label="Add Field" primary onClick={() => this.addMoreTextFields()}
              style={{marginTop: "2%"}}/>
          </Dialog>);
  }
}

ImageInputShowcaseModifyDialog.propTypes = {
  functions: PropTypes.object.isRequired
};

export default ImageInputShowcaseModifyDialog;
