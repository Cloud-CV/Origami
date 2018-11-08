import React from "react";

import img from "../assets/wireframe.png";

const Cards = ({ header, count, onClick, clicked }) => {
  console.log("clicked=", clicked);
  let styles = {};
  if (clicked == true) {
    styles = {
      borderStyle: "Solid",
      borderWidth: "2px",
      borderColor: "#606470"
    };
  }
  return (
    <div className="ui special cards" onClick={onClick}>
      <div className="card" style={styles}>
        <div className="blurring dimmable image">
          <div className="ui dimmer">
            <div className="content">
              <div className="center">
                <div className="ui inverted button">Know More</div>
              </div>
            </div>
          </div>
          <img src={img} />
        </div>
        <div className="content">
          <a className="header">{header}</a>
        </div>
      </div>
    </div>
  );
};
export default Cards;
