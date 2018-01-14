import React from "react";
import { PropTypes } from "prop-types";
import BarGraphOutput from "./BarGraphOutput";
import OutputPreview from "../BaseOutputComponent/OutputPreview.js";

class BarGraphOutputPreview extends OutputPreview {
  render() {
    return (
      <BarGraphOutput
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
    );
  }
}

BarGraphOutputPreview.propTypes = {
  functions: PropTypes.object.isRequired
};

export default BarGraphOutputPreview;
