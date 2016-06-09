import React, {PropTypes} from 'react';

const RepoCard = ({header, heading, accessType, Language, button_label, onDeployClick}) => {
  return (
    <div className="four wide stackable centered column">
      <div className="ui card segment">
        <div className="content">
          <div className="header">{header}</div>
        </div>
        <div className="content">
          <h4 className="ui sub header">{heading}</h4>
          <div className="ui small feed">
            <div className="event">
              <div className="content">
                <div className="summary">
                  {accessType}<br />
                  {Language}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="extra content">
          <button className="ui button" onClick={onDeployClick}>{button_label}</button>
        </div>
      </div>
    </div>
  );
};

RepoCard.propTypes = {
  header: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  accessType: PropTypes.string.isRequired,
  Language: PropTypes.string.isRequired,
  button_label: PropTypes.string.isRequired,
  onDeployClick: PropTypes.func.isRequired
};

export default RepoCard;
