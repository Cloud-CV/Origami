import React from 'react';

import img from '../assets/wireframe.png';

const Cards = ({ header, choice }) => {
  return (
    <div className="ui special cards">
      <div className="card">
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
