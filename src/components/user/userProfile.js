import React, { PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as loginActions from '../../actions/loginActions';
import * as userActions from '../../actions/userActions';
import Toggle from 'material-ui/Toggle';
import CircularProgress from 'material-ui/CircularProgress';
import RepoCard from '../stateless/cards';
import userRepos from '../../api/Github/userRepos';
import toastr from 'toastr';

toastr.options.closeButton = true;

class UserProfile extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      user: {},
      userRepos: [],
      showOutput: 'hidden',
      allRepoShow: false
    };
    this.toggleShow = this.toggleShow.bind(this);
    this.makeCardRepo = this.makeCardRepo.bind(this);
    this.toggleAllRepoButton = this.toggleAllRepoButton.bind(this);
    this.getAccessType = this.getAccessType.bind(this);
    this.getLanguage = this.getLanguage.bind(this);
    this.goToDeployPage = this.goToDeployPage.bind(this);
  }

  componentWillMount() {
    !this.props.login && browserHistory.push('/');
    this.props.useractions.LoadUser()
      .catch(err => {
        toastr.error("Error: " + err);
    });
    this.makeCardRepo(this.state.allRepoShow);
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.user != nextProps.user) {
      this.setState({user: nextProps.user});
    }
  }

  makeCardRepo(allRepoShow) {
    let repoType = allRepoShow ? 'all' : 'owner';
    userRepos(repoType)
      .then(repos => {
        this.setState({userRepos: JSON.parse(repos)});
      })
      .catch(err => {
        toastr.error("Error: " + err);
      });
  }

  toggleAllRepoButton() {
    this.setState({allRepoShow: !this.state.allRepoShow}, function() {
      this.makeCardRepo(this.state.allRepoShow);
    });
  }

  goToDeployPage(repo) {
    browserHistory.push('/user/repo/' + repo.name);
  }

  getAccessType(repo) {
    let accesstype = repo.private ? 'Private' : 'Public';
    return "Access Type: " + accesstype;
  }

  getLanguage(repo) {
    return "Language: " + repo.language;
  }



  toggleShow() {
    this.setState({showOutput: this.state.showOutput == 'visible' ? 'hidden' : 'visible'});
  }

  render() {
    return (
      <div className="ui relaxed stackable grid fluid container">


        {this.state.showOutput == 'hidden' &&
          <div className="centered row" style={{marginTop: "30vh"}}>
            <CircularProgress size={1.5} />
          </div>}


        {this.state.user &&
        <div className="sixteen column stretched row" style={{visibility: this.state.showOutput}}>

          <div className="four wide column ui raised segment" >
            <img className="ui fluid bottom aligned medium image" onLoad={this.toggleShow}
                 src={this.state.user.avatar_url} />
          </div>

          <div className="seven wide column" >
            <div>
              <div className="row" ><br /><br /><br /><br /><br /></div>
              <div className="row" ><br /><br /><br /><br /></div>
              <h1 className="row">{this.state.user.name}</h1>
              <h3 className="row">{this.state.user.login}</h3>
            </div>
          </div>

          <span className="ui horizontal divider row"><hr /></span>

          <Toggle
            label="All"
            defaultToggled={this.state.allRepoShow}
            labelPosition="right"
            onToggle={this.toggleAllRepoButton}/>
          <br /><br />

          {this.state.userRepos &&
            <div className="center aligned row">
              <div className="ui twelve column grid centered">
                {this.state.userRepos.map(repo =>
                  <RepoCard
                    header={repo.name}
                    key={repo.id}
                    heading="Information"
                    accessType={this.getAccessType(repo)}
                    Language={this.getLanguage(repo)}
                    button_label="Deploy"
                    onDeployClick={() => this.goToDeployPage(repo)}/>
                )}
              </div>
            </div>
          }

        </div>}
      </div>
    );
  }
}

UserProfile.propTypes = {
  login: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  loginactions: PropTypes.object.isRequired,
  useractions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    login: state.login,
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loginactions: bindActionCreators(loginActions, dispatch),
    useractions: bindActionCreators(userActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
