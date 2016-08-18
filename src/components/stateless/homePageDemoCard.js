import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { Card, CardActions, CardHeader, CardMedia, CardText } from 'material-ui/Card';
import { blue100 } from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';

function HomePageDemoCard(props) {
  return (
    <div className="ui four wide stackable column">
      <Card>
        <CardHeader
          title={props.name}
          subtitle="CloudCV"
          avatar={require('../assets/cloudcv_logo.png')}
        />
        {props.coverImage &&
        <CardMedia className="ui medium image">
          <img src={props.coverImage} />
        </CardMedia>
        }
        {props.description &&
        <CardText>
          {props.description}
        </CardText>
        }
        <CardActions>
          <RaisedButton backgroundColor={blue100}
                        label="Launch"
                        onClick={() => browserHistory.push(props.permalink)}
          />
          <RaisedButton backgroundColor={blue100}
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
  coverImage: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  permalink: PropTypes.string.isRequired,
  handleShareModal: PropTypes.func.isRequired
};


export default HomePageDemoCard;
