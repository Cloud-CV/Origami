import React, { PropTypes } from 'react';

const singleInput = (props) => {
  return (
    <input placeholder={props.label}
           name={`input-text-${props.index}`}
           type="text"
           style={{ width: '25vw' }}
    />
  );
};

singleInput.propTypes = {
  label: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired
};

export default singleInput;
