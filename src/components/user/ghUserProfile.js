import React, { PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../actions/userActions';
import * as githubDemoModelActions from '../../actions/githubDemoModelActions';
import * as inputComponentDemoModelActions from '../../actions/inputComponentDemoModelActions';
import * as outputComponentDemoModelActions from '../../actions/outputComponentDemoModelActions';
import { getDeployed } from '../../api/GithubLocal/getDeployed';
import Toggle from 'material-ui/Toggle';
import CircularProgress from 'material-ui/CircularProgress';
import CustomCard from '../stateless/cards';
import userRepos from '../../api/Github/userRepos';
import toastr from 'toastr';

toastr.options.closeButton = true;

class GHUserProfile extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      user: {},
      userRepos: [],
      showOutput: 'hidden',
      allRepoShow: false,
      allDeployed: []
    };
    this.socket = this.context.socket;
    this.toggleShow = this.toggleShow.bind(this);
    this.makeCardRepo = this.makeCardRepo.bind(this);
    this.toggleAllRepoButton = this.toggleAllRepoButton.bind(this);
    this.getLanguage = this.getLanguage.bind(this);
    this.killDemo = this.killDemo.bind(this);
    this.goToDeployPage = this.goToDeployPage.bind(this);
    this.goToDemoPage = this.goToDemoPage.bind(this);
    this.findDeployedRepoById = this.findDeployedRepoById.bind(this);
    this.removefromallDeployed = this.removefromallDeployed.bind(this);
    this.modifyGithubDemo = this.modifyGithubDemo.bind(this);
    this.getDisplayForDemoButton = this.getDisplayForDemoButton.bind(this);
  }

  componentWillMount() {
    !this.props.login && browserHistory.push('/');
    this.props.useractions.LoadUser()
      .then(() => {
        getDeployed().then((alldeployedRepos) => {
          this.setState({allDeployed: JSON.parse((alldeployedRepos))});
        }).catch(err => {
          toastr.error(err);
        });
      })
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

  findDeployedRepoById(repoId) {
    return this.state.allDeployed.find(x => x.id === repoId.toString());
  }

  modifyGithubDemo(repoId) {
    let currentSelectedRepo = this.findDeployedRepoById(repoId);
    let dataToUpdate = {
      name: currentSelectedRepo.name,
      id: currentSelectedRepo.id,
      description: currentSelectedRepo.description,
      timestamp: currentSelectedRepo.timestamp,
      token: currentSelectedRepo.token,
      dockercomposeFile: currentSelectedRepo.dockercomposeFile,
      status: currentSelectedRepo.status
    };
    this.props.githubModelActions.updateGithubDemoModel(dataToUpdate).then(() => {
      browserHistory.push(`/user/repo/${currentSelectedRepo.name}/${currentSelectedRepo.id}/`);
    });
  }

  removefromallDeployed(repoId) {
    let tempallDeployed = Object.assign([], this.state.allDeployed);
    tempallDeployed.splice(tempallDeployed.findIndex(x => x.id === repoId.toString()), 1);
    this.setState({allDeployed: tempallDeployed});
  }

  killDemo(repoId) {
    let currentSelectedRepo = this.findDeployedRepoById(repoId);
    this.props.githubModelActions.killGithubDemoModel(repoId).then(() => {
      toastr.success(`initiated kill, for application: <h1>${currentSelectedRepo.name}</h1>`);
      this.socket.emit('startkillprocedure', this.state.user.login,
        currentSelectedRepo.id,
        currentSelectedRepo.dockercomposeFile);
      this.socket.on('killstatus', (status) => {
        if (status == '0') {
          this.removefromallDeployed(repoId);
          this.props.inputComponentModelActions.killInputComponentModel(repoId);
          this.props.outputComponentDemoModelActions.killOutputComponentModel(repoId);
        } else {
          toastr.error(`Failed killing: <h1>${currentSelectedRepo.name}</h1>`);
        }
      });
    }).catch(err => {
      toastr.error(err);
    });
  }

  goToDeployPage(repo) {
    browserHistory.push(`/user/repo/${repo.name}/${repo.id}`);
  }

  goToDemoPage(repo) {
    browserHistory.push(`user/repo/${repo.name}/${repo.id}/demo`);
  }

  getLanguage(repo) {
    return "Language: " + repo.language;
  }

  getDisplayForDemoButton(repoId) {
    let currentSelectedRepo = this.findDeployedRepoById(repoId);
    if (currentSelectedRepo) {
      return currentSelectedRepo.status === 'input' ? "None" : "";
    }
    return "";
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
              <div className="row" ><br /><br /></div>
              <h1 className="row">{this.state.user.name}</h1>
              <h3 className="row">{this.state.user.login}</h3>
              <h4 className="row">Build from Github</h4>
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
          <div className="fifteen wide column stretched stackable centered row">
            <div className="ui three padded column stackable grid">
              {this.state.userRepos.map(repo =>
                <CustomCard
                  header={repo.name}
                  width="five"
                  centeredParent
                  key={repo.id}
                  displayData={[
                      repo.private ? 'Private' : 'Public',
                      this.getLanguage(repo)
                    ]}
                  buttonData={[
                      {
                        label: "Kill",
                        onDeployClick: () => this.killDemo(repo.id),
                        display: this.findDeployedRepoById(repo.id) ?
                          "" : "None"
                      },
                      {
                        label: "Modify",
                        onDeployClick: () => this.modifyGithubDemo(repo.id),
                        display: this.findDeployedRepoById(repo.id) ?
                          "" : "None"
                      },
                      {
                        label: this.findDeployedRepoById(repo.id) ?
                         "Demo" : "Deploy",
                        onDeployClick: () => this.findDeployedRepoById(repo.id) ?
                         this.goToDemoPage(repo) : this.goToDeployPage(repo),
                         display: this.getDisplayForDemoButton(repo.id)
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

GHUserProfile.propTypes = {
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

GHUserProfile.contextTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(GHUserProfile);
