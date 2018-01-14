import React from "react";
import { PropTypes } from "prop-types";

const singleInput = props => {
  return (
    <input
      className="origami-demo-input-text-component"
      placeholder={props.label}
      name={`input-text-${props.index}`}
      type="text"
      style={{ width: "25vw" }}
    />
  );
};

singleInput.propTypes = {
  label: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired
};

export default singleInput;
