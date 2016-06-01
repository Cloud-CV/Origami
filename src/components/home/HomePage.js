import React from 'react';
import {Link} from 'react-router';

class HomePage extends React.Component {
    render() {
        return (
            <div className="jumbotron">
                <h1>CloudCVfy Your Code!</h1>
                <p>React, Redux and React Router for super responsive web app</p>
                <Link to="about" className="ui button">
                  <i className="info circle icon"></i>
                  Learn more
                </Link>
            </div>
        );
    }
}

export default HomePage;

