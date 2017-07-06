import React, { PropTypes } from "react";
import SingleOutput from "./SingleOutput";

const GraphOutput = ({ headers, calling_context, data }) => {
  return (
    <div>
      <div
        key={Math.random()}
        className="six wide stackable stretched grid container"
      >
        <br /><br />
        {headers.map((header, index) => [
          <SingleOutput
            key={Math.random()}
            calling_context={calling_context}
            index={index}
            header={header}
            data={data[index]}
          />,
          <br key={Math.random()} />,
          <br key={Math.random()} />
        ])}
      </div>
    </div>
  );
};

GraphOutput.propTypes = {
  headers: PropTypes.array.isRequired,
  calling_context: PropTypes.string.isRequired,
  data: PropTypes.array
};

export default GraphOutput;
