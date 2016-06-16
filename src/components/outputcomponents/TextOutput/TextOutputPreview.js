import React, { PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextOutput from './TextOutput';


class TextOutputPreview extends React.Component {
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
    return(<Dialog
      title="Preview Text Output Component"
      actions={actions}
      modal
      autoScrollBodyContent
      open={this.state.open}>
      <TextOutput
        headers={this.state.headers}
        context="demo"
        data={
          Array(this.state.headers.length).fill(
            "Text Output sent from your code!"
          )
        }/>
    </Dialog>);
  }
}

TextOutputPreview.propTypes = {
  functions: PropTypes.object.isRequired
};

export default TextOutputPreview;
