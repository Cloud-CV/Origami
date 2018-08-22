import React from "react";
import { PropTypes } from "prop-types";
import SingleOutput from "./SingleOutput";

const ImageOutput = ({ headers, calling_context, data }) => {
  return (
    <div
      key={Math.random()}
      className="four wide stackable stretched grid container origami-demo-output-components"
    >
      <br />
      <br />
      
        <SingleOutput
          data={data}
        />,
        <br key={Math.random()} />,
        <br key={Math.random()} />
     
    </div>
  );
};

ImageOutput.propTypes = {

  data: PropTypes.array
};

export default ImageOutput;
