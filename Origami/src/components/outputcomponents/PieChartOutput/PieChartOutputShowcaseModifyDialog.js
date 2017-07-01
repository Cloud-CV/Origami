import React, { PropTypes } from "react";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import OverloadedPieChartHeader from "./OverloadedPieChartHeader";

class PieChartOutputShowcaseModifyDialog extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      textFields: this.makeTextFieldsFromParentHeaders(
        props.functions.getHeaders()
      ),
      headers: props.functions.getHeaders(),
      open: true
    };
    this.updateHeadersInParent = props.functions.updateHeaders;
    this.getLabelsFromParent = props.functions.getLabels;
    this.hideModifyDialog = props.functions.hideModifyDialog;
    this.makeTextFieldsFromParentHeaders = this.makeTextFieldsFromParentHeaders.bind(
      this
    );
    this.addLocalHeaders = this.addLocalHeaders.bind(this);
    this.deleteLocalHeaders = this.deleteLocalHeaders.bind(this);
    this.addMoreTextFields = this.addMoreTextFields.bind(this);
    this.getNewField = this.getNewField.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  makeTextFieldsFromParentHeaders(allHeaders) {
    let tempText = [];
    allHeaders.map((header, index) => {
      let currentIndex = allHeaders.findIndex(x => x === header);
      if (typeof header === "object") {
        header = "";
      }
      tempText[currentIndex] = (
        <div>
          <TextField
            key={Math.random()}
            hintText="Header"
            defaultValue={header}
            onChange={e => this.addLocalHeaders(currentIndex, e.target.value)}
          />
          &nbsp;&nbsp;&nbsp;
          <RaisedButton
            label="Delete"
            primary
            onMouseDown={() => this.deleteLocalHeaders(currentIndex)}
          />
        </div>
      );
    });
    return tempText;
  }

  addLocalHeaders(index, data) {
    let temptext = Object.assign([], this.state.headers);
    temptext[index] = data;
    this.setState({ headers: temptext });
  }

  deleteLocalHeaders(elementId) {
    let temptext = Object.assign([], this.state.headers);
    let temptextfield = Object.assign([], this.state.textFields);
    delete temptext[elementId];
    delete temptextfield[elementId];
    this.setState({ headers: temptext });
    this.setState({ textFields: temptextfield });
  }

  getNewField() {
    return (
      <OverloadedPieChartHeader
        data={{
          headerLength: this.state.headers.length,
          addLocalHeaders: this.addLocalHeaders,
          deleteLocalHeaders: this.deleteLocalHeaders
        }}
      />
    );
  }

  addMoreTextFields() {
    let tempstate = Object.assign([], this.state.textFields);
    tempstate.push(this.getNewField());
    this.setState({ textFields: tempstate });
  }

  handleOk() {
    this.hideModifyDialog();
    this.updateHeadersInParent(this.state.headers);
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
    return (
      <Dialog
        title="Modify Pie Chart Output Component"
        actions={actions}
        modal
        autoScrollBodyContent
        open={this.state.open}
      >
        {this.state.textFields.map(field => [
          field,
          <br key={Math.random()} />
        ])}
        <RaisedButton
          key={Math.random()}
          label="Add Output Field"
          primary
          onClick={() => this.addMoreTextFields()}
          style={{ marginTop: "2%" }}
        />
      </Dialog>
    );
  }
}

PieChartOutputShowcaseModifyDialog.propTypes = {
  functions: PropTypes.object.isRequired
};

export default PieChartOutputShowcaseModifyDialog;
