import React from "react";
import { PropTypes } from "prop-types";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import PieChartOutput from "./PieChartOutput";
import OutputPreview from "../BaseOutputComponent/OutputPreview.js";

class PieChartOutputPreview extends OutputPreview {
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
        title="Preview Pie Chart Output Component"
        actions={actions}
        modal
        autoScrollBodyContent
        open={this.state.open}
      >
        <PieChartOutput
          headers={this.state.headers}
          calling_context="demo"
          data={new Array(this.state.headers.length).fill([
            { x: 1, y: 2 },
            { x: 2, y: 5 },
            { x: 3, y: 8 },
            { x: 4, y: 9 },
            { x: 5, y: 13 }
          ])}
        />
      </Dialog>
    );
  }
}

PieChartOutputPreview.propTypes = {
  functions: PropTypes.object.isRequired
};

export default PieChartOutputPreview;
