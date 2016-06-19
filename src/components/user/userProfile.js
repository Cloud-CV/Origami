import React, { PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../actions/userActions';
import * as githubDemoModelActions from '../../actions/githubDemoModelActions';
import * as inputComponentDemoModelActions from '../../actions/inputComponentDemoModelActions';
import * as outputComponentDemoModelActions from '../../actions/outputComponentDemoModelActions';
import Toggle from 'material-ui/Toggle';
import CircularProgress from 'material-ui/CircularProgress';
import CustomCard from '../stateless/cards';
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
    this.socket = this.context.socket;
    this.toggleShow = this.toggleShow.bind(this);
    this.makeCardRepo = this.makeCardRepo.bind(this);
    this.toggleAllRepoButton = this.toggleAllRepoButton.bind(this);
    this.getLanguage = this.getLanguage.bind(this);
    this.killDemo = this.killDemo.bind(this);
    this.goToDeployPage = this.goToDeployPage.bind(this);
    this.goToDemoPage = this.goToDemoPage.bind(this);
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

  killDemo() {
    toastr.success(`initiated kill, for application: <h1>${this.props.githubDemoModel.name}</h1>`);
    this.socket.emit('startkillprocedure', this.state.user.login,
      this.props.githubDemoModel.id,
      this.props.githubDemoModel.dockercomposeFile);
    this.socket.on('killstatus', (status) => {
      if (status == '0') {
        toastr.success(`Killed: <h1>${this.props.githubDemoModel.name}</h1>`);
        this.props.githubModelActions.killGithubDemoModel();
        this.props.inputComponentModelActions.killInputComponentModel();
        this.props.outputComponentDemoModelActions.killOutputComponentModel();
      } else {
        toastr.error(`Failed killing: <h1>${this.props.githubDemoModel.name}</h1>`);
      }
    });
  }

  goToDeployPage(repo) {
    browserHistory.push('/user/repo/' + repo.name);
  }

  goToDemoPage(repo) {
    browserHistory.push(`user/repo/${this.props.githubDemoModel.name}/demo`);
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
                  <CustomCard
                    header={repo.name}
                    width="five"
                    key={repo.id}
                    displayData={[
                      repo.private ? 'Private' : 'Public',
                      this.getLanguage(repo)
                    ]}
                    buttonData={[
                      {
                        label: "Kill",
                        onDeployClick: () => this.killDemo(),
                        display: this.props.githubDemoModel.name === repo.name ?
                          "" : "None"
                      },
                      {
                        label: "Modify",
                        onDeployClick: () => alert('to be implemented, yo!'),
                        display: this.props.githubDemoModel.name === repo.name ?
                          "" : "None"
                      },
                      {
                        label: this.props.githubDemoModel.name === repo.name ?
                         "Demo" : "Deploy",
                        onDeployClick: () => this.props.githubDemoModel.name === repo.name ?
                         this.goToDemoPage() : this.goToDeployPage(repo)
                      }
                    ]}
                  />
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
  githubDemoModel: PropTypes.object.isRequired,
  inputComponentDemoModel: PropTypes.object.isRequired,
  outputComponentDemoModel: PropTypes.object.isRequired,
  useractions: PropTypes.object.isRequired,
  githubModelActions: PropTypes.object.isRequired,
  inputComponentModelActions: PropTypes.object.isRequired,
  outputComponentDemoModelActions: PropTypes.object.isRequired
};

UserProfile.contextTypes = {
  socket: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    login: state.login,
    user: state.user,
    githubDemoModel: state.githubDemoModel,
    inputComponentDemoModel: state.inputComponentDemoModel,
    outputComponentDemoModel: state.outputComponentDemoModel
  };
}

function mapDispatchToProps(dispatch) {
  return {
    useractions: bindActionCreators(userActions, dispatch),
    githubModelActions: bindActionCreators(githubDemoModelActions, dispatch),
    inputComponentModelActions: bindActionCreators(inputComponentDemoModelActions, dispatch),
    outputComponentDemoModelActions: bindActionCreators(outputComponentDemoModelActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
