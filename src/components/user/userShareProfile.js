import React, { PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import HomePageDemoCard from '../stateless/homePageDemoCard';
import { getAllPermalink } from '../../api/Nongh/permalink';
import userApi  from '../../api/Github/userApi';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import { ShareButtons, ShareCounts, generateShareIcon } from 'react-share';

const { FacebookShareButton, GooglePlusShareButton, LinkedinShareButton, TwitterShareButton } = ShareButtons;
const { FacebookShareCount, GooglePlusShareCount, LinkedinShareCount } = ShareCounts;
const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');
const GooglePlusIcon = generateShareIcon('google');
const LinkedinIcon = generateShareIcon('linkedin');

class ShareProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {},
      demoBeingShown: {},
      shareModalOpen: false
    };
  }

  componentWillMount() {
    if (this.props.params.username) {
      userApi.userProfileFromName(this.props.params.username).then((userData) => {
      });
    }
  }

  render() {
    return (
      <div>lol</div>
    );
  }
}


ShareProfile.propTypes = {
  params: PropTypes.object.isRequired
};

export default ShareProfile;
