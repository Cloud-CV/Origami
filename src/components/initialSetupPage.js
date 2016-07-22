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
      showAppSecretHelpModal: false,
      showAppIpHelpModal: false,
      showAppPortHelpModal: false
    };
    this.toggleHelpModal = this.toggleHelpModal.bind(this);
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
    case 'appsecret':
      this.setState({ showAppSecretHelpModal: !this.state.showAppSecretHelpModal });
      break;
    case 'appip':
      this.setState({ showAppIpHelpModal: !this.state.showAppIpHelpModal });
      break;
    case 'appport':
      this.setState({ showAppPortHelpModal: !this.state.showAppPortHelpModal });
      break;
    }
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
          />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <InfoIcon color={green500}
                    style={{ postion: 'absolute', marginTop: '3%', cursor: 'pointer' }}
                    onClick={() => this.toggleHelpModal('clientsecret')}
          />
        </div>
        <div className="centered row">
          <TextField
            hintText="Enter a long random string"
            floatingLabelText="Application Secret"
          />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <InfoIcon color={green500}
                    style={{ postion: 'absolute', marginTop: '3%', cursor: 'pointer' }}
                    onClick={() => this.toggleHelpModal('appsecret')}
          />
        </div>
        <div className="centered row">
          <TextField
            value={window.location.hostname}
            hintText="Enter this application's IP address"
            floatingLabelText="Application IP address"
          />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <InfoIcon color={green500}
                    style={{ postion: 'absolute', marginTop: '3%', cursor: 'pointer' }}
                    onClick={() => this.toggleHelpModal('appip')}
          />
        </div>
        <div className="centered row">
          <TextField
            value={window.location.port}
            hintText="Enter this application's port number"
            floatingLabelText="Application port"
          />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <InfoIcon color={green500}
                    style={{ postion: 'absolute', marginTop: '3%', cursor: 'pointer' }}
                    onClick={() => this.toggleHelpModal('appport')}
          />
        </div>
        <div className="centered row">
          <Checkbox
            label="Allow new users"
            style={{ maxWidth: 200 }}
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
          open={this.state.showAppSecretHelpModal}
          onRequestClose={() => this.toggleHelpModal('appsecret')}
        >
          Some app secret help
        </Dialog>
        <Dialog
          open={this.state.showAppIpHelpModal}
          onRequestClose={() => this.toggleHelpModal('appip')}
        >
          Some application IP help
        </Dialog>
        <Dialog
          open={this.state.showAppPortHelpModal}
          onRequestClose={() => this.toggleHelpModal('appport')}
        >
          Some application port help
        </Dialog>
      </div>
    );
  }
}

export default InitialSetup;
