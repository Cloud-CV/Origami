import React, { PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CircularProgress from 'material-ui/CircularProgress';
import * as nonghDemoModelActions from '../../../actions/nonghDemoModelActions';
import rangeCheck from 'range_check';
import { getDeployed } from '../../../api/Nongh/getDeployed';
import RaisedButton from 'material-ui/RaisedButton';
import StopNow from 'material-ui/svg-icons/action/pan-tool';
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
      currentPort: ''
    };
    this.socket = this.context.socket;
    this.toggleShow = this.toggleShow.bind(this);
    this.updateDemoModelData = this.updateDemoModelData.bind(this);
    this.updateDescription = this.updateDescription.bind(this);
    this.updateAddress = this.updateAddress.bind(this);
    this.updateName = this.updateName.bind(this);
    this.updatePort = this.updatePort.bind(this);
    this.validateIP = this.validateIP.bind(this);
    this.validatePort= this.validatePort.bind(this);
  }

  componentWillMount() {
    getDeployed(this.props.params.repoId).then(singleRepo => {
      if (JSON.parse(singleRepo).length != 0) {
        this.setState({id: JSON.parse(singleRepo)[0].id});
        this.setState({name: JSON.parse(singleRepo)[0].name});
        this.setState({address: JSON.parse(singleRepo)[0].address});
        this.setState({description: JSON.parse(singleRepo)[0].description});
      }
    }).then(() => {
      this.socket.emit('fetchcurrentport');
      this.socket.on('fetchedcurrentport', (port) => {
        this.setState({currentPort: port});
        this.toggleShow();
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.nonghDemoModel != nextProps.nonghDemoModel) {
      this.setState({nonghDemoModel: nextProps.nonghDemoModel});
    }
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
        token: `nongh:${this.state.address}:${this.state.id}:${this.state.currentPort}:${this.state.port}`,
        status: 'input'
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
      return !!(portNumber >= 0 && portNumber <= 65535);
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
                          Token: &nbsp;&nbsp;&nbsp;
                          <b>{`nongh:${this.state.address}:${this.state.id}:${this.state.currentPort}:${this.state.port}`}</b>
                          <br />Your code will run on port: {this.state.port}
                        </div>
                        <div className="three wide column">
                          {this.validateIP() && this.validatePort(this.state.port) ? <GoAhead style={{height: '', width: ''}} color={green500} /> : <StopNow style={{height: '', width: ''}} color={red500} />}
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
