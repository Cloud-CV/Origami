/*eslint-disable react/forbid-prop-types */
import React from "react";
import { PropTypes } from "prop-types";

const singleOutput = props => {
  return (
    <div
      className="ui card centered origami-demo-output-text-component"
      id={`output-text-${props.index}`}
    >
      <div className="content">
        <div className="header">
          {typeof props.header == "object"
            ? props.header["label"]
            : props.header}
        </div>
      </div>
      <div className="content">
        <div className="ui small feed">
          <div className="event">
            <div className="content">
              <div className="summary">{props.data}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

singleOutput.propTypes = {
  header: PropTypes.string.isRequired,
  data: PropTypes.any,
  index: PropTypes.number.isRequired
};

export default singleOutput;
