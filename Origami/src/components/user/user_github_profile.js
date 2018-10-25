import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import userApi from '../../api/Github/userApi';
import { BounceLoader } from 'react-spinners';
import { Link, withRouter } from 'react-router-dom';
import pic from '../assets/profile.png';

class Profile extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      username: 'username',
      name: 'name',
      email: 'email.com',
      bio: 'bio',
      company: 'company',
      avatar: pic,
      github: '',
    };
  }

  componentWillMount() {
    console.log('components mount');
    userApi.userProfile().then(user => {
      console.log('user ==', user);
      user = JSON.parse(user);
      let username = user['login'];
      let name = user['name'];
      let email = user['email'];
      let bio = user['bio'];
      let company = user['company'];
      let avatar = user['avatar_url'];
      let github = user['html_url'];
      this.setState({
        username: username,
        name: name,
        email: email,
        bio: bio,
        company: company,
        avatar: avatar,
        github: github
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ demoLoading: true });
    let uname = nextProps.user;
    userApi.userProfileFromName(uname).then(user => {
      user = JSON.parse(user);
      let username = user['login'];
      let name = user['name'];
      let email = user['email'];
      let bio = user['bio'];
      let company = user['company'];
      let avatar = user['avatar_url'];
      let github = user['html_url'];
      this.setState({
        username: username,
        name: name,
        email: email,
        bio: bio,
        company: company,
        avatar: avatar,
        github: github,
      });
    });
  }

  render() {

    return (
      <div className="container">
        <div className="profile-sidebar">
          <div>
            <div className="profile-userpic">
              <img src={this.state.avatar} className="img-responsive" alt="" />
            </div>
            <div className="profile-usertitle">
              <div className="profile-usertitle-name">{this.state.name}</div>
              <div className="profile-usertitle-job">{this.state.username}</div>
            </div>

            <div className="btn-group" style={{ marginLeft: 30 }}>
              <a href="#" className="btn btn-primary">
                Demo Count
              </a>
              <a href="#" className="btn btn-success">
                42
              </a>
            </div>

            <div className="profile-usermenu">
              <ul className="nav">
                <li>
                  <a href="#">
                    <i className="glyphicon glyphicon-envelope" />
                    <span style={{ float: 'right' }}>{this.state.email}</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="glyphicon glyphicon-user" />
                    {this.state.company}{' '}
                  </a>
                </li>
                <li>
                  <a href={this.state.github}>
                    <i className="fab fa-github" />
                    Github Profile{' '}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.activeUser,
  };
}

export default connect(mapStateToProps)(Profile);
