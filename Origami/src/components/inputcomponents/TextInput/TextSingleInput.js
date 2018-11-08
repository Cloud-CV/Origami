import React from "react";
import { PropTypes } from "prop-types";

const singleInput = props => {
  console.log("proos value=", props.value);
  return (
    <input
      className="origami-demo-input-text-component"
      name={`input-text-${props.index}`}
      type="text"
      style={{ width: "30vw", borderWidth: "1px", borderColor: "#606470" }}
      value={props.value}
      onChange={props.onChange}
    />
  );
};

singleInput.propTypes = {
  label: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired
};

export default singleInput;
