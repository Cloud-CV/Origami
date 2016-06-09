import React from 'react';
import { Link } from 'react-router';

class HomePage extends React.Component {
  render() {
    return (
      <div className="jumbotron">
        <p>React, Redux and React Router for super responsive web app</p>
        <Link to="/user/123" className="ui button">
          <i className="info circle icon"></i>
          Learn more
        </Link>
      </div>
    );
  }
}

export default HomePage;

