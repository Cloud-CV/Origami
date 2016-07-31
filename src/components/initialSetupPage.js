import React from 'react';
import { browserHistory } from 'react-router';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import InfoIcon from 'material-ui/svg-icons/action/info-outline';
import { green500 } from 'material-ui/styles/colors';
import Dialog from 'material-ui/Dialog';
import * as rootApi from '../api/CommonLocal/rootSettingsApi';
import RaisedButton from 'material-ui/RaisedButton';
import toastr from 'toastr';

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
      appip: window.location.hostname,
      port: window.location.port,
      rootError: '',
      clientidError: '',
      clientsecretError: '',
      appipError: '',
      allowNewUsers: false
    };
    this.toggleHelpModal = this.toggleHelpModal.bind(this);
    this.updateFields = this.updateFields.bind(this);
    this.updateCheck = this.updateCheck.bind(this);
    this.save = this.save.bind(this);
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

  save() {
    if (this.state.root.length === 0) {
      this.setState({ rootError: 'Required' });
    } else {
      this.setState({ rootError: '' });
    }
    if (this.state.clientid.length === 0) {
      this.setState({ clientidError: 'Required' });
    } else {
      this.setState({ clientidError: '' });
    }
    if (this.state.clientsecret.length === 0) {
      this.setState({ clientsecretError: 'Required' });
    } else {
      this.setState({ clientsecretError: '' });
    }
    if (this.state.appip.length === 0) {
      this.setState({ appipError: 'Required' });
    } else {
      this.setState({ appipError: '' });
    }

    if (this.state.root.length !== 0 && this.state.clientid.length !== 0
      && this.state.clientsecret.length !== 0 && this.state.appip.length !== 0) {

      let timeout = '';

      $('#appbar-progress').css('visibility', 'visible')
        .promise()
        .done(() => {
          $('#appbar-progress').progress({
            percent: '33%'
          });
          timeout = setTimeout(() => {
            $('#appbar-progress').progress({
              percent: '65%'
            });
          }, 300);
        });

      const toPut = {
        rootUserGithubLoginName: this.state.root,
        clientid: this.state.clientid,
        clientsecret: this.state.clientsecret,
        allowNewLogins: this.state.allowNewUsers,
        appip: this.state.appip,
        port: this.state.port
      };
      rootApi.getIDByName(this.state.root)
        .then((data) => {
          toPut.rootUserGithubLoginId = JSON.parse(data).id;
        })
        .then(() => {
          rootApi.addRootSettings(toPut)
            .then(() => {
              $('#appbar-progress').progress({
                percent: '100%'
              });
              setTimeout(() => {
                $('#appbar-progress').css('visibility', 'hidden');
                $('#appbar-progress').progress({
                  percent: '0%'
                });
              }, 600);
              browserHistory.push('/');
              toastr.success('Added root user');
            })
            .catch((err) => {
              toastr.error('Unauthorized');
              setTimeout(() => {
                $('#appbar-progress').css('visibility', 'hidden');
                $('#appbar-progress').progress({
                  percent: '0%'
                });
              }, 600);
            });
        })
        .catch((err) => {
          setTimeout(() => {
            $('#appbar-progress').css('visibility', 'hidden');
            $('#appbar-progress').progress({
              percent: '0%'
            });
          }, 600);
          this.setState({ rootError: 'This user does not exist' });
        });
    }
  }

  render() {
    return (
      <div className="ui relaxed stackable grid fluid container">


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
              errorText={this.state.rootError}
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
              errorText={this.state.clientidError}
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
              errorText={this.state.clientsecretError}
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
              errorText={this.state.appipError}
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
            <RaisedButton label="Save"
                          primary
                          onClick={this.save}
            />
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
      </div>
    );
  }
}

export default InitialSetup;
