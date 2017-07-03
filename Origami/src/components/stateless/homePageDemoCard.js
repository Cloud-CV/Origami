/* eslint-disable no-useless-escape */

import React, { PropTypes } from "react";
import { browserHistory } from "react-router";
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardText
} from "material-ui/Card";
import { blue100 } from "material-ui/styles/colors";
import RaisedButton from "material-ui/RaisedButton";

function HomePageDemoCard(props) {
  const reg = /.+?\:\/\/.+?(\/.+?)(?:#|\?|$)/;

  return (
    <div className="ui four wide stackable column">
      <Card>
        <CardHeader
          title={props.name}
          subtitle="CloudCV"
          avatar={require("../assets/cloudcv_logo.png")}
        />
        {props.cover_image &&
          <CardMedia className="ui medium image">
            <img src={props.cover_image} />
          </CardMedia>}
        {props.description &&
          <CardText style={{ wordWrap: "break-word" }}>
            {props.description}
          </CardText>}
        <CardActions>
          <RaisedButton
            backgroundColor={blue100}
            label="Launch"
            onClick={() => browserHistory.push(reg.exec(props.permalink)[1])}
          />
          <RaisedButton
            backgroundColor={blue100}
            label="Share"
            onClick={() => props.handleShareModal(props)}
          />
        </CardActions>
      </Card>
    </div>
  );
}

HomePageDemoCard.propTypes = {
  name: PropTypes.string.isRequired,
  cover_image: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  permalink: PropTypes.string.isRequired,
  handleShareModal: PropTypes.func.isRequired
};

export default HomePageDemoCard;
