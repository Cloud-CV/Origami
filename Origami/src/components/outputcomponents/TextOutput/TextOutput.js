import React from "react";
import { PropTypes } from "prop-types";
import SingleOutput from "./SingleOutput";
import LinearProgress from "material-ui/LinearProgress";

const TextOutput = ({ headers, calling_context, data }) => {
  return (
  <div className="ui centered center aligned grid">
    <div
      key={Math.random()}
      className="six wide stackable stretched grid container origami-demo-output-components"
    >
      <br /><br />
        <SingleOutput
          key={Math.random()}
          calling_context={calling_context}
          header={headers}
          data={data || <LinearProgress mode="indeterminate" />}
        />
        <br key={Math.random()} />
        <br key={Math.random()} />
    </div>
  </div>
  );
};

TextOutput.propTypes = {
  headers: PropTypes.string.isRequired,
  calling_context: PropTypes.string.isRequired,
  data: PropTypes.array
};

export default TextOutput;
