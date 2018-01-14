import React from "react";
import { PropTypes } from "prop-types";
import { grey700, cyan100 } from "material-ui/styles/colors";

const CustomCard = (
  {
    header,
    heading,
    width,
    centeredParent,
    centeredSegment,
    displayData,
    buttonData,
    selected,
    context
  }
) => {
  const parentClass = `${width ? width : "four"} wide stackable ${centeredParent ? "" : "centered"} column`;
  const cardClass = `ui card blue segment ${centeredSegment ? "centered" : ""}`;
  const headerToPut = selected ? `${header} - (In Use)` : header;

  return (
    <div className={parentClass}>
      <div className={cardClass}>
        {selected &&
          <div className="ui blue right corner label">
            <h1>*</h1>
          </div>}
        <div className="content" style={{ backgroundColor: cyan100 }}>
          {context === "profile" &&
            <i
              className="right floated large red circular remove icon"
              style={{ cursor: "pointer" }}
              onClick={() =>
                buttonData
                  .filter(button => button.label === "Delete")[0]
                  .onDeployClick()}
            />}
          <div className="header">{headerToPut}</div>
        </div>
        {heading &&
          <div className="content">
            <div className="heading">{heading}</div>
          </div>}
        <div className="content">
          <div className="ui small feed">
            <div className="event">
              <div className="content">
                <div
                  className="summary"
                  style={{ fontWeight: "initial", color: grey700 }}
                >
                  {displayData.map((data, index) => (
                    <div key={index}>{data}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="extra content">
          {buttonData
            .filter(button => button.label !== "Delete")
            .map((button, index) => (
              <button
                key={index}
                style={{ display: button.display, marginTop: "2%" }}
                className="ui basic stackable blue button"
                onClick={button.onDeployClick}
              >
                {button.label}
              </button>
            ))}
        </div>
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
  displayData: PropTypes.array.isRequired,
  buttonData: PropTypes.array.isRequired,
  selected: PropTypes.bool
};

export default CustomCard;
