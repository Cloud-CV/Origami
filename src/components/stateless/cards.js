import React, { PropTypes } from 'react';
import { grey700, cyan100 } from 'material-ui/styles/colors';

const CustomCard = ({header, heading, width, centeredParent, centeredSegment, displayData, buttonData}) => {

  const parentClass = `${width ? width : "four"} wide stackable ${centeredParent ? "" : "centered"} column`;
  const cardClass = `ui card segment ${centeredSegment ? "centered" : ""}`;

  return (
    <div className={parentClass}>
      <div className={cardClass}>
        <div className="content" style={{backgroundColor: cyan100}}>
          <div className="header">{header}</div>
        </div>
        {heading &&
          <div className="content">
            <div className="heading">{heading}</div>
          </div>
        }
        <div className="content">
          <div className="ui small feed">
            <div className="event">
              <div className="content">
                <div className="summary"
                     style={{fontWeight: "initial", color: grey700}}>
                  {displayData.map((data, index) =>
                    <div key={index}>{data}</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="extra content">
          {buttonData.map((button, index) =>
            <button key={index}
                    style={{display: button.display}}
                    className="ui button"
                    onClick={button.onDeployClick}>
              {button.label}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

CustomCard.propTypes = {
  header: PropTypes.string.isRequired,
  heading: PropTypes.string,
  width: PropTypes.string,
  centeredParent: PropTypes.bool,
  centeredSegment: PropTypes.bool,
  displayData: PropTypes.array.isRequired,
  buttonData: PropTypes.array.isRequired
};

export default CustomCard;
