import React from "react";
import { PropTypes } from "prop-types";
import SingleOutput from "./SingleOutput";

const PieChartOutput = ({ headers, calling_context, data }) => {

  return (
    <div
      key={Math.random()}
      className="six wide stackable stretched grid container"
    >
      <br /><br />
    
      <SingleOutput
        key={Math.random()}
        calling_context={calling_context}
        header={headers}
        data={
          data.length>0
            ? data
            : [{ x: "...", y: 1 }, { x: "...", y: 1 }]
        }
      />,
      <br key={Math.random()} />,
      <br key={Math.random()} />
     
    </div>
  );
};

PieChartOutput.propTypes = {   headers: PropTypes.string.isRequired,
calling_context: PropTypes.string.isRequired,   data: PropTypes.array };

export default PieChartOutput;
