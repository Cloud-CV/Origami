import React from 'react';
import { PropTypes } from 'prop-types';
import { grey700, cyan100 } from 'material-ui/styles/colors';

const CustomCard = ({
  header,
  heading,
  width,
  centeredParent,
  centeredSegment,
  selected,
  context,
}) => {
  const parentClass = `${width ? width : 'four'} wide stackable ${
    centeredParent ? '' : 'centered'
  } column`;
  const cardClass = `ui card blue segment ${centeredSegment ? 'centered' : ''}`;
  const headerToPut = header;
  return (
    <div className={parentClass}>
      <div className={cardClass}>
        <div className="content" style={{ backgroundColor: cyan100 }}>
          <div className="header">{headerToPut}</div>
        </div>
        {heading && (
          <div className="content">
            <div className="heading">{heading}</div>
          </div>
        )}
      </div>
    </div>
  );
};

CustomCard.propTypes = {
  header: PropTypes.string.isRequired,
  heading: PropTypes.string,
  width: PropTypes.string,
  context: PropTypes.string.isRequired,
  centeredParent: PropTypes.bool,
  centeredSegment: PropTypes.bool,
  selected: PropTypes.bool,
};

export default CustomCard;
