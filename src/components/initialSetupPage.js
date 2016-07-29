import React from 'react';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import InfoIcon from 'material-ui/svg-icons/action/info-outline';
import { green500 } from 'material-ui/styles/colors';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';

class InitialSetup extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      showRootUserHelpModal: false,
      showClientIdHelpModal: false,
      showClientSecretHelpModal: false,
      showAppIpHelpModal: false,
      root: '',
      clientid: '',
      clientsecret: '',
      appsecret: Math.random().toString(20),
      appip: window.location.hostname,
      port: window.location.port,
      allowNewUsers: false
    };
    this.toggleHelpModal = this.toggleHelpModal.bind(this);
    this.updateFields = this.updateFields.bind(this);
    this.updateCheck = this.updateCheck.bind(this);
  }

  toggleHelpModal(modalType) {
    switch (modalType) {
    case 'root':
      this.setState({ showRootUserHelpModal: !this.state.showRootUserHelpModal });
      break;
    case 'clientid':
      this.setState({ showClientIdHelpModal: !this.state.showClientIdHelpModal });
      break;
    case 'clientsecret':
      this.setState({ showClientSecretHelpModal: !this.state.showClientSecretHelpModal });
      break;
    case 'appip':
      this.setState({ showAppIpHelpModal: !this.state.showAppIpHelpModal });
      break;
    }
  }

  updateFields(fieldToUpdate, value) {
    this.setState({
      [fieldToUpdate]: value
    });
  }

  updateCheck() {
    this.setState({
      allowNewUsers: !this.state.allowNewUsers
    });
  }

  render() {
    return (
      <div className="ui fluid container blue segment grid">
        <div className="centered row">
          <div className="ui very padded text">
            <h2>FIRST RUN SETUP</h2>
          </div>
        </div>
        <div className="centered row">
          <TextField
            hintText="Root user's github username"
            floatingLabelText="Root user's github username"
            onChange={(e) => this.updateFields('root', e.target.value)}
          />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <InfoIcon color={green500}
                    style={{ postion: 'absolute', marginTop: '3%', cursor: 'pointer' }}
                    onClick={() => this.toggleHelpModal('root')}
          />
        </div>
        <div className="centered row">
          <TextField
            hintText="Github Client ID"
            floatingLabelText="Github Client ID"
            onChange={(e) => this.updateFields('clientid', e.target.value)}
          />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <InfoIcon color={green500}
                    style={{ postion: 'absolute', marginTop: '3%', cursor: 'pointer' }}
                    onClick={() => this.toggleHelpModal('clientid')}
          />
        </div>
        <div className="centered row">
          <TextField
            hintText="Github Client Secret"
            floatingLabelText="Github Client Secret"
            onChange={(e) => this.updateFields('clientsecret', e.target.value)}
          />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <InfoIcon color={green500}
                    style={{ postion: 'absolute', marginTop: '3%', cursor: 'pointer' }}
                    onClick={() => this.toggleHelpModal('clientsecret')}
          />
        </div>
        <div className="centered row">
          <TextField
            defaultValue={this.state.appip}
            hintText="Enter this application's IP address"
            floatingLabelText="Application IP address"
            onChange={(e) => this.updateFields('clientip', e.target.value)}
          />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <InfoIcon color={green500}
                    style={{ postion: 'absolute', marginTop: '3%', cursor: 'pointer' }}
                    onClick={() => this.toggleHelpModal('appip')}
          />
        </div>
        <div className="centered row">
          <Checkbox
            label="Allow new users"
            style={{ maxWidth: 200 }}
            checked={this.state.allowNewUsers}
            onCheck={this.updateCheck}
          /><br />
        </div>
        <div className="centered row">
          <RaisedButton label="Save" primary />
        </div>



        <Dialog
          open={this.state.showRootUserHelpModal}
          onRequestClose={() => this.toggleHelpModal('root')}
        >
          Some root help
        </Dialog>
        <Dialog
          open={this.state.showClientIdHelpModal}
          onRequestClose={() => this.toggleHelpModal('clientid')}
        >
          Some client id help
        </Dialog>
        <Dialog
          open={this.state.showClientSecretHelpModal}
          onRequestClose={() => this.toggleHelpModal('clientsecret')}
        >
          Some client secret help
        </Dialog>
        <Dialog
          open={this.state.showAppIpHelpModal}
          onRequestClose={() => this.toggleHelpModal('appip')}
        >
          Some application IP help
        </Dialog>
      </div>
    );
  }
}

export default InitialSetup;
