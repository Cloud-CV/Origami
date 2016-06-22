import React, { PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CircularProgress from 'material-ui/CircularProgress';
import * as nonghDemoModelActions from '../../../actions/nonghDemoModelActions';
import rangeCheck from 'range_check';
import { getDeployed } from '../../../api/Nongh/getDeployed';
import { getWebAppStatus } from '../../../api/Generic/getWebAppStatus';
import RaisedButton from 'material-ui/RaisedButton';
import StopNow from 'material-ui/svg-icons/action/pan-tool';
import Checkbox from 'material-ui/Checkbox';
import GoAhead from 'material-ui/svg-icons/action/check-circle';
import { red500, green500 } from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
import toastr from 'toastr';

toastr.options.closeButton = true;

class RegisterPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      showOutput: 'hidden',
      id: Math.floor(Math.random()*10000000).toString(),
      currentProject: {},
      nonghDemoModel: {},
      name: '',
      description: '',
      nameErrorText: '',
      addressErrorText: '',
      portErrorText: '',
      address: '',
      port: '',
      currentPort: '',
      webappaddress: '',
      tempwebaddress: '',
      deploymentBoxSelectedStatus: false,
      status: '',
      webappUnreachableErrorText: '',
      webappLocalUnreachableErrorText: '',
      showLocalDeploymentCheckBox: false,
      returning: false
    };
    this.socket = this.context.socket;
    this.toggleShow = this.toggleShow.bind(this);
    this.updateDemoModelData = this.updateDemoModelData.bind(this);
    this.onLocalDeploymentCheckBoxCheck = this.onLocalDeploymentCheckBoxCheck.bind(this);
    this.updateDescription = this.updateDescription.bind(this);
    this.updateAddress = this.updateAddress.bind(this);
    this.updateName = this.updateName.bind(this);
    this.updatePort = this.updatePort.bind(this);
    this.validateTempwebaddress = this.validateTempwebaddress.bind(this);
    this.validateIP = this.validateIP.bind(this);
    this.validatePort= this.validatePort.bind(this);
  }

  componentWillMount() {
    getDeployed(this.props.params.repoId).then(singleRepo => {
      if (this.props.params.repoId) {
        if (JSON.parse(singleRepo).length != 0) {
          this.setState({returning: true});
          this.setState({tempwebaddress: JSON.parse(singleRepo)[0].token.split(':')[1]});
          if (JSON.parse(singleRepo)[0].token.split(':')[1] === '0.0.0.0') {
            this.setState({showLocalDeploymentCheckBox: true});
          }
          this.setState({id: JSON.parse(singleRepo)[0].id});
          this.setState({name: JSON.parse(singleRepo)[0].name});
          this.setState({status: JSON.parse(singleRepo)[0].status});
          this.setState({address: JSON.parse(singleRepo)[0].token.split(':')[1]});
          this.setState({tempwebaddress: JSON.parse(singleRepo)[0].token.split(':')[5]});
          this.setState({port: JSON.parse(singleRepo)[0].token.split(':')[4]});
          this.setState({description: JSON.parse(singleRepo)[0].description});
          if (JSON.parse(singleRepo)[0].token.split(':')[5] === '0.0.0.0') {
            this.setState({deploymentBoxSelectedStatus: true});
          }
      }
      }
    }).then(() => {
      this.socket.emit('fetchcurrentport');
      this.socket.emit('getpublicipaddress');
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
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.nonghDemoModel != nextProps.nonghDemoModel) {
      this.setState({nonghDemoModel: nextProps.nonghDemoModel});
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

  updateDemoModelData() {
    if (!this.validateIP()) {
      this.setState({addressErrorText: "Invalid IP address"});
    } else {
      this.setState({addressErrorText: ""});
    }
    if (!this.validatePort(this.state.port)) {
      this.setState({portErrorText: "Invalid port number"});
    } else {
      this.setState({portErrorText: ""});
    }
    if (this.state.name.length == 0) {
      this.setState({nameErrorText: "Invalid Project Name"});
    } else {
      this.setState({nameErrorText: ""});
    }
    if (this.state.name.length > 0 && this.validateIP() && this.validatePort(this.state.port)) {
      let dataToPut = {
        name: this.state.name,
        id: this.state.id,
        address: this.state.address,
        description: this.state.description,
        timestamp: Date.now(),
        token: `nongh:${this.state.address}:${this.state.id}:${this.state.currentPort}:${this.state.port}:${this.state.tempwebaddress}`,
        status: this.state.status || 'input'
      };
      this.props.nonghModelActions.addToDBNonGHDemoModel(dataToPut).then(() => {
        this.props.nonghModelActions.updateNonGHDemoModel(dataToPut).then(() => {
          browserHistory.push(`/ngh/user/${this.state.name}/${this.state.id}/inputcomponent`);
        });
      });
    }
  }

  updateDescription(e) {
    this.setState({description: e.target.value});
  }

  updateAddress(e) {
    this.setState({address: e.target.value});
  }

  updatePort(e) {
    this.setState({port: e.target.value});
  }

  updateName(e) {
    this.setState({name: e.target.value});
  }

  validateTempwebaddress() {
    if (this.state.webappUnreachableErrorText.length > 0 && this.state.tempwebaddress === this.state.webappaddress) {
      return false;
    }
    if (this.state.webappLocalUnreachableErrorText.length > 0 && this.state.tempwebaddress === '0.0.0.0') {
      return false;
    }
    return true;
  }

  validateIP() {
    if (this.state.address.split('.').length <= 2) {
      return false;
    } else {
      return rangeCheck.validIp(this.state.address);
    }
  }

  validatePort(port) {

    function isNumeric(value) {
      return /^\d+$/.test(value);
    }

    if (isNumeric(port)) {
      const portNumber = parseInt(port);
      return !!(portNumber >= 1024 && portNumber <= 65535);
    } else {
      return false;
    }
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

        <div className="sixteen wide column stretched row" style={{visibility: this.state.showOutput}}>
          <div className="row" >
            <h1>Register Application</h1>
          </div>

          <div className="ui horizontal divider row" >
            <span><hr /></span>
          </div>

          <div className="row">
            <div className="ui relaxed stackable grid container">
              <div className="two column row">
                <div className="column center aligned">

                  <TextField
                    hintText="MyApp"
                    floatingLabelText="Appname"
                    value={this.state.name}
                    errorText={this.state.nameErrorText}
                    onChange={this.updateName}
                  /><br />
                  <TextField
                    hintText="0.0.0.0"
                    errorText={this.state.addressErrorText}
                    floatingLabelText="IP of service (no http://)"
                    value={this.state.address}
                    onChange={this.updateAddress}
                  /><br />
                  <TextField
                    hintText="8000"
                    errorText={this.state.portErrorText}
                    floatingLabelText="Port for service"
                    value={this.state.port}
                    onChange={this.updatePort}
                  /><br />
                  <TextField
                    hintText="Description"
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
                                primary style={{marginLeft: "30%"}}
                                onClick={this.updateDemoModelData}/>
                </div>

                <div className="ui vertical internal divider">
                  <hr /></div>
                <div className="column">

                  <div className="ui raise fluid very padded container text">
                    <br />
                    <div className="ui relaxed grid container segment">
                      <div className="two column row">
                        <div className="thirteen wide column">
                          <u>Token:</u>
                          <h4>{`nongh:${this.state.address}:${this.state.id}:${this.state.currentPort}:${this.state.port}:${this.state.tempwebaddress}`}</h4>
                        </div>
                        <div className="three wide column">
                          {this.validateTempwebaddress() && this.validateIP() && this.validatePort(this.state.port) ? <GoAhead style={{height: '', width: ''}} color={green500} /> : <StopNow style={{height: '', width: ''}} color={red500} />}
                        </div>
                      </div>
                      <div className="one column row">
                        <div className="sixteen wide column">
                          Insert info about how to proceed with deployment
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    );
  }
}

RegisterPage.propTypes = {
  login: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  nonghModelActions: PropTypes.object.isRequired
};

RegisterPage.contextTypes = {
  socket: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    login: state.login,
    user: state.user,
    nonghDemoModel: state.nonghDemoModel
  };
}

function mapDispatchToProps(dispatch) {
  return {
    nonghModelActions: bindActionCreators(nonghDemoModelActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
