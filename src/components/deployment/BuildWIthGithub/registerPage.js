import React, { PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getRepo, checkDockerfile } from '../../../api/Github/getOneRepo';
import CircularProgress from 'material-ui/CircularProgress';
import * as githubDemoModelActions from '../../../actions/githubDemoModelActions';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
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
      dockerModalError: '',
      githubDemoModel: {},
      description: ''
    };
    this.toggleShow = this.toggleShow.bind(this);
    this.toggleDockerModalShow = this.toggleDockerModalShow.bind(this);
    this.goBack = this.goBack.bind(this);
    this.saveGithubDemoModelData = this.saveGithubDemoModelData.bind(this);
    this.updateDescription = this.updateDescription.bind(this);
  }

  componentWillMount() {
    getRepo(this.props.params.repoId)
      .then(currentRepo => {
        this.setState({currentRepo: JSON.parse(currentRepo)});
      }).then(() => {
      this.toggleShow();
    }).then(() => {
        checkDockerfile(this.props.params.repoId).then(status => {
          toastr.success('docker-compose.yml found');
        }).catch(err => {
          if (err == 'Error: Not Found') {
            toastr.error("Coudn't fetch repository contents");
            browserHistory.push('/user');
          } else {
            this.setState({dockerModalError: err});
            this.toggleDockerModalShow();
          }
        });
      }).catch(err => {
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

  saveGithubDemoModelData() {
    this.props.githubModelActions.updateGithubDemoModel({
      name:  this.state.currentRepo.name,
      id: this.state.currentRepo.id,
      description: this.state.description,
      timestamp:   Date.now()
    }).then(() => {
      browserHistory.push(`/user/repo/${this.props.params.repoId}/inputcomponent`);
    });
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
    browserHistory.push('/');
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
                <div className="column center aligned">

                  <TextField
                    disabled
                    hintText="Appname"
                    defaultValue={this.state.currentRepo.name}
                    floatingLabelText={this.state.currentRepo.name}
                  /><br />
                  <TextField
                    hintText="Demo description"
                    defaultValue={this.state.currentRepo.description}
                    onChange={this.updateDescription}
                    multiLine
                    rows={2}
                    rowsMax={8}
                  /><br />
                  <RaisedButton label="Save"
                                primary style={{marginLeft: "30%"}}
                                onClick={this.saveGithubDemoModelData}/>
                </div>

                <div className="ui vertical internal divider"
                     style={{height: "90%", marginTop: "10%"}}>
                  <hr /></div>
                <div className="column">
                  <div className="ui raise fluid very padded container text">
                    <br /><br /><br /><br /><br />
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                  </div>
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
