import React, { PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import ScatterGraphOutput from './ScatterGraphOutput';


class ScatterGraphOutputPreview extends React.Component {
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
    return (<Dialog
      title="Preview Scatter Graph Output Component"
      actions={actions}
      modal
      autoScrollBodyContent
      open={this.state.open}
            >
      <ScatterGraphOutput
        headers={this.state.headers}
        calling_context="demo"
        data={
          new Array(this.state.headers.length).fill(
            [
              { x: 1, y: 2 },
              { x: 2, y: 5 },
              { x: 3, y: 8 },
              { x: 4, y: 9 },
              { x: 5, y: 13 }
            ]
          )
        }
      />
    </Dialog>);
  }
}

ScatterGraphOutputPreview.propTypes = {
  functions: PropTypes.object.isRequired
};

export default ScatterGraphOutputPreview;
