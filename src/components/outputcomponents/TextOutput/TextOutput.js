import React, { PropTypes } from 'react';
import SingleOutput from './SingleOutput';

const TextOutput = ({headers, data}) => {
  return (
    <div>
      <div key={Math.random()} className="six wide stackable stretched grid container">
        <br /><br />
        {headers.map((header, index) =>
          [<SingleOutput
              key={Math.random()}
              index={index}
              header={header}
              data={data[index]} />,
            <br key={Math.random()} />,
            <br key={Math.random()} />]
        )}
      </div>
    </div>
  );
};

TextOutput.propTypes = {
  headers: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired
};

export default TextOutput;
