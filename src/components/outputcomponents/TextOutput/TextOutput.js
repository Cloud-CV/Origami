import React, { PropTypes } from 'react';
import SingleOutput from './SingleOutput';
import LinearProgress from 'material-ui/LinearProgress';

const TextOutput = ({headers, context, data}) => {
  return (
    <div>
      <div key={Math.random()} className="six wide stackable stretched grid container">
        <br /><br />
        {headers.map((header, index) =>
          [<SingleOutput
              key={Math.random()}
              context={context}
              index={index}
              header={header}
              data={data[index] || <LinearProgress mode="indeterminate" />} />,
            <br key={Math.random()} />,
            <br key={Math.random()} />]
        )}
      </div>
    </div>
  );
};

TextOutput.propTypes = {
  headers: PropTypes.array.isRequired,
  data: PropTypes.array
};

export default TextOutput;
