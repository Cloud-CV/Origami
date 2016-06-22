import React, { PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getRepo, checkDockerfile } from '../../../api/Github/getOneRepo';
import CircularProgress from 'material-ui/CircularProgress';
import * as githubDemoModelActions from '../../../actions/githubDemoModelActions';
import { getDeployed } from '../../../api/GithubLocal/getDeployed';
import { getWebAppStatus } from '../../../api/Generic/getWebAppStatus';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import toastr from 'toastr';

toastr.options.closeButton = true;

class RegisterPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      showOutput: 'hidden',
      currentRepo: {},
      showDockerModalState: false,
      showSideHelp: true,
      dockerModalError: '',
      githubDemoModel: {},
      description: '',
      freePortForCode: '',
      currentRepoFromDB: {},
      currentPort: '',
      webappaddress: '',
      tempwebaddress: '',
      deploymentBoxSelectedStatus: false,
      webappUnreachableErrorText: '',
      webappLocalUnreachableErrorText: '',
      showLocalDeploymentCheckBox: false,
      dockercomposeFile: '',
      temptoken: '',
      returning: false,
      saveButton: true
    };
    this.socket = this.context.socket;
    this.toggleShow = this.toggleShow.bind(this);
    this.toggleDockerModalShow = this.toggleDockerModalShow.bind(this);
    this.goBack = this.goBack.bind(this);
    this.onLocalDeploymentCheckBoxCheck = this.onLocalDeploymentCheckBoxCheck.bind(this);
    this.saveGithubDemoModelData = this.saveGithubDemoModelData.bind(this);
    this.updateDescription = this.updateDescription.bind(this);
  }

  componentWillMount() {
    getRepo(this.props.params.repoName)
      .then(currentRepo => {
        this.setState({currentRepo: JSON.parse(currentRepo)});
      })
      .then(() => {
        getDeployed(this.state.currentRepo.id).then(singleRepo => {
          if (JSON.parse(singleRepo).length > 0) {
            this.setState({returning: true});
            this.setState({tempwebaddress: JSON.parse(singleRepo)[0].token.split(':')[1]});
            if (JSON.parse(singleRepo)[0].token.split(':')[1] === '0.0.0.0') {
              this.setState({showLocalDeploymentCheckBox: true});
            }
            this.setState({temptoken: JSON.parse(singleRepo)[0].token});
            this.setState({description: JSON.parse(singleRepo)[0].description});
          }
        });
      })
      .then(() => {
        this.socket.emit('fetchfreeport');
        this.socket.emit('fetchcurrentport');
        this.socket.emit('getpublicipaddress');
        this.socket.on('fetchedport', (port) => {
          this.setState({freePortForCode: port});
        });
        this.socket.on('fetchedcurrentport', (port) => {
          this.setState({currentPort: port});
        });
        this.socket.on('gotpublicip', (ip) => {
          this.setState({webappaddress: ip}, () => {
            if (this.state.tempwebaddress.length == 0) {
              this.setState({tempwebaddress: this.state.webappaddress});
            }
          });
          getWebAppStatus(ip).then(() => {
          }).catch(err => {
            this.setState({webappUnreachableErrorText: 'This WebApp cannot be reached on its public IP'});
            this.setState({showLocalDeploymentCheckBox: true});
          });
          this.toggleShow();
        });
        this.socket.on('erroringettingpublicip', err => {
          toastr.error('Error in getting public IP :(');
        });
      })
      .then(() => {
        checkDockerfile(this.props.params.repoName).then(status => {
            if (!this.state.returning) {
              toastr.success('docker-compose.yml found');
            }
            this.setState({saveButton: false});
            this.setState({dockercomposeFile: status[3]});
            this.setState({showSideHelp: false});
          })
          .catch(err => {
            if (err == 'Error: Not Found') {
              toastr.error("Coudn't fetch repository contents");
              browserHistory.push('/user');
            } else {
              this.setState({saveButton: false});
              this.setState({dockerModalError: err});
            }
          });
      })
      .catch(err => {
        toastr.error(err);
      });
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.currentRepo != nextProps.currentRepo) {
      this.setState({currentRepo: nextProps.currentRepo});
    }
    if (this.state.githubDemoModel != nextProps.githubDemoModel) {
      this.setState({githubDemoModel: nextProps.githubDemoModel});
    }
  }

  onLocalDeploymentCheckBoxCheck(e) {
    if (!this.state.deploymentBoxSelectedStatus) {
      getWebAppStatus('0.0.0.0').then(() => {
        })
        .catch(err => {
          this.setState({webappLocalUnreachableErrorText: "This WebApp cannot be reached locally on 0.0.0.0"});
        });
    }
    let selectionPool = ['0.0.0.0', this.state.webappaddress];
    this.setState({tempwebaddress: selectionPool[this.state.deploymentBoxSelectedStatus ? 1 : 0]});
    this.setState({deploymentBoxSelectedStatus: !this.state.deploymentBoxSelectedStatus});
  }

  saveGithubDemoModelData() {
    if(this.state.dockerModalError) {
      this.toggleDockerModalShow();
    } else {
      let dataToUpdate = {
        name: this.state.currentRepo.name,
        id: this.state.currentRepo.id,
        description: this.state.description,
        timestamp: Date.now(),
        token: `gh:${this.state.tempwebaddress}:${this.state.currentRepo.id}:${this.state.currentPort}:${this.state.freePortForCode}`,
        dockercomposeFile: this.state.dockercomposeFile,
        status: 'input'
      };
      this.props.githubModelActions.addToDBGithubDemoModel(dataToUpdate).then(() => {
        this.props.githubModelActions.updateGithubDemoModel(dataToUpdate).then(() => {
          browserHistory.push(`/user/repo/${this.props.params.repoName}/${this.props.params.repoId}/inputcomponent`);
        });
      });
    }
  }

  updateDescription(e) {
    this.setState({description: e.target.value});
  }

  toggleShow() {
    this.setState({showOutput: this.state.showOutput == 'visible' ? 'hidden' : 'visible'});
  }

  toggleDockerModalShow() {
    this.setState({showDockerModalState: !this.state.showDockerModalState});
  }

  goBack() {
    browserHistory.push('/user');
  }

  render() {
    const action = [
      <FlatButton
        label="Go Back"
        key="1"
        primary
        keyboardFocused
        onTouchTap={this.goBack}
      />
    ];
    return (
      <div className="ui relaxed stackable grid fluid container">

        {this.state.showOutput == 'hidden' &&
        <div className="centered row" style={{marginTop: "30vh"}}>
          <CircularProgress size={1.5} />
        </div>}

        {this.state.currentRepo &&
        <div className="sixteen wide column stretched row" style={{visibility: this.state.showOutput}}>
          <div className="row" >
            <h1>{this.state.currentRepo.name}</h1>
            <h5>{this.state.currentRepo.description}</h5>
          </div>

          <div className="ui horizontal divider row" >
            <span><hr /></span>
          </div>

          <div className="row">
            <div className="ui relaxed stackable grid container">
              <div className="two column row">
                <div className="column centered center aligned">

                  <TextField
                    disabled
                    hintText="Appname"
                    defaultValue={this.state.currentRepo.name}
                    floatingLabelText={this.state.currentRepo.name}
                  /><br />
                  <TextField
                    hintText="Demo description"
                    value={this.state.description}
                    onChange={this.updateDescription}
                    multiLine
                    rows={2}
                    rowsMax={8}
                  /><br />
                  {this.state.webappUnreachableErrorText.length > 0 &&
                  <div className="ui raised compact centered red segment" style={{color: 'red', marginLeft: '20%'}}>
                    {this.state.webappUnreachableErrorText}<br />
                  </div>
                  }
                  {this.state.webappLocalUnreachableErrorText.length > 0 &&
                  <div className="ui raised compact centered red segment" style={{color: 'red', marginLeft: '20%'}}>
                    {this.state.webappLocalUnreachableErrorText}<br />
                  </div>
                  }
                  {this.state.showLocalDeploymentCheckBox &&
                  <div className="" style={{marginLeft: '27%', maxWidth: '45%'}}>
                    <Checkbox
                      checked={this.state.deploymentBoxSelectedStatus}
                      disabled={this.state.returning}
                      onCheck={this.onLocalDeploymentCheckBoxCheck}
                      label="WebApp is running locally"
                    />
                  </div>
                  }
                  <br />
                  <RaisedButton label="Save"
                                disabled={this.state.saveButton}
                                primary style={{marginLeft: "30%"}}
                                onClick={this.saveGithubDemoModelData}/>
                </div>

                <div className="ui vertical internal divider">
                  <hr /></div>
                <div className="column">

                  {this.state.dockerModalError &&
                  <div className="ui raise fluid very padded container text">
                    <br />
                    <div className="ui container segment">
                      Token: &nbsp;&nbsp;&nbsp;
                      <b>{`gh:${this.state.tempwebaddress}:${this.state.currentRepo.id}:${this.state.currentPort}:${this.state.freePortForCode}`}</b><br />
                      Insert help text here
                    </div>
                  </div>}

                  {!this.state.dockerModalError && !this.state.showSideHelp &&
                  <div className="ui raise fluid very padded container text">
                    <br />
                    <div className="ui container segment">
                      Token: &nbsp;&nbsp;&nbsp;
                      {this.state.returning ?
                        <b>{this.state.temptoken}</b>
                        :
                        <b>{`gh:${this.state.tempwebaddress}:${this.state.currentRepo.id}:${this.state.currentPort}:${this.state.freePortForCode}`}</b>
                      }
                      <br />
                      Insert info about how to proceed with the deployment
                    </div>
                  </div>}

                </div>
              </div>
            </div>
          </div>

        </div>}

        <Dialog
          title={this.state.dockerModalError}
          actions={action}
          modal
          open={this.state.showDockerModalState}
          onRequestClose={this.goBack}>
          We require docker-compose.yml to proceed with the deployment.
          Please see <Link to="/about">documentation</Link>.
        </Dialog>
      </div>
    );
  }
}

RegisterPage.propTypes = {
  login: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  githubModelActions: PropTypes.object.isRequired
};

RegisterPage.contextTypes = {
  socket: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    login: state.login,
    user: state.user,
    githubDemoModel: state.githubDemoModel
  };
}

function mapDispatchToProps(dispatch) {
  return {
    githubModelActions: bindActionCreators(githubDemoModelActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
