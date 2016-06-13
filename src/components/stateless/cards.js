import React, { PropTypes } from 'react';
import { grey700 } from 'material-ui/styles/colors';

const CustomCard = ({header, heading, displayData, buttonData}) => {

  return (
    <div className="four wide stackable centered column">
      <div className="ui card segment">
        <div className="content">
          <div className="header">{header}</div>
        </div>
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
  displayData: PropTypes.array.isRequired,
  buttonData: PropTypes.array.isRequired
};

export default CustomCard;
