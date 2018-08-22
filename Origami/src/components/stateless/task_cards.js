import React from 'react';

import img from '../assets/wireframe.png';

const Cards = ({ header,count,onClick,clicked }) => {
  console.log("clicked=",clicked)
  let styles={};
  if(clicked == true){
    styles={
      borderStyle:'Solid',
      borderWidth:'2px',
      borderColor:'#606470'
    }
  }
  return (
    <div class="ui special cards" onClick={onClick} >
      <div class="card" style={styles}>
        <div class="blurring dimmable image">
          <div class="ui dimmer">
            <div class="content">
              <div class="center">
                <div class="ui inverted button">Know More</div>
              </div>
            </div>
          </div>
          <img src={img} />
        </div>
        <div class="content">
          <a class="header">{header}</a>
        </div>
      </div>
    </div>
  );
};
export default Cards;
