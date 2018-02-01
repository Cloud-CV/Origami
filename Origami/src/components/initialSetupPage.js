import React from "react";
import { Link, browserHistory } from "react-router";
import TextField from "material-ui/TextField";
import Checkbox from "material-ui/Checkbox";
import * as rootApi from "../api/CommonLocal/rootSettingsApi";
import RaisedButton from "material-ui/RaisedButton";
import toastr from "toastr";

class InitialSetup extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      root: "",
      client_id: "",
      client_secret: "",
      app_ip: window.location.hostname,
      port: window.location.port,
      rootError: "",
      client_idError: "",
      client_secretError: "",
      app_ipError: "",
      allowNewUsers: false,
      is_cloudcv: false,
      isRoot:false
    };
    this.updateFields = this.updateFields.bind(this);
    this.updateCheck = this.updateCheck.bind(this);
    this.save = this.save.bind(this);
    
  }

  updateFields(fieldToUpdate, value) {
    this.setState({
      [fieldToUpdate]: value
    });
  }

  updateCheck(fieldToUpdate) {
    this.setState({
      [fieldToUpdate]: !this.state[fieldToUpdate]
    });
  }
 
  componentWillMount() {
      rootApi
      .checkRootSettings()
      .then(data => {
         if(JSON.parse(data).root_user_github_login_id === null || JSON.parse(data).root_user_github_login_name==localStorage.getItem("username"))
        {
          this.setState({ isRoot: true });
        }
      })
  
  }
  save() {
    if (this.state.root.length === 0) {
      this.setState({ rootError: "Required" });
    } else {
      this.setState({ rootError: "" });
    }
    if (this.state.client_id.length === 0) {
      this.setState({ client_idError: "Required" });
    } else {
      this.setState({ client_idError: "" });
    }
    if (this.state.client_secret.length === 0) {
      this.setState({ client_secretError: "Required" });
    } else {
      this.setState({ client_secretError: "" });
    }
    if (this.state.app_ip.length === 0) {
      this.setState({ app_ipError: "Required" });
    } else {
      this.setState({ app_ipError: "" });
    }

    if (
      this.state.root.length !== 0 &&
      this.state.client_id.length !== 0 &&
      this.state.client_secret.length !== 0 &&
      this.state.app_ip.length !== 0
    ) {
      let timeout = "";

      $("#appbar-progress").css("visibility", "visible").promise().done(() => {
        $("#appbar-progress").progress({
          percent: "33%"
        });
        timeout = setTimeout(
          () => {
            $("#appbar-progress").progress({
              percent: "65%"
            });
          },
          300
        );
      });

      const toPut = {
        root_user_github_login_name: this.state.root,
        client_id: this.state.client_id,
        client_secret: this.state.client_secret,
        allow_new_logins: this.state.allowNewUsers,
        is_cloudcv: this.state.is_cloudcv,
        app_ip: this.state.app_ip,
        port: this.state.port
      };
      rootApi
        .getIDByName(this.state.root)
        .then(data => {
          toPut.root_user_github_login_id = JSON.parse(data).id;
        })
        .then(() => {
          rootApi
            .addRootSettings(toPut)
            .then(() => {
              $("#appbar-progress").progress({
                percent: "100%"
              });
              setTimeout(
                () => {
                  $("#appbar-progress").css("visibility", "hidden");
                  $("#appbar-progress").progress({
                    percent: "0%"
                  });
                },
                600
              );
              browserHistory.push("/");
              toastr.success("Added root user");
            })
            .catch(err => {
              toastr.error("Unauthorized");
              setTimeout(
                () => {
                  $("#appbar-progress").css("visibility", "hidden");
                  $("#appbar-progress").progress({
                    percent: "0%"
                  });
                },
                600
              );
            });
        })
        .catch(err => {
          setTimeout(
            () => {
              $("#appbar-progress").css("visibility", "hidden");
              $("#appbar-progress").progress({
                percent: "0%"
              });
            },
            600
          );
          this.setState({ rootError: "This user does not exist" });
        });

    }
  }

  render() {
    if(!this.state.isRoot)
    {
      return(
       <div className="ui fluid container blue segment grid">
          <div className="centered row">
            <div className="ui very padded text">
              <h2>
                Not a Root User &nbsp;
              </h2>
            </div>
          </div>
        </div>
        )
    }
    
    else
    {
    return (
      <div className="ui relaxed stackable grid fluid container">

        <div className="ui fluid container blue segment grid">
          <div className="centered row">
            <div className="ui very padded text">
              <h2>
                FIRST RUN SETUP &nbsp;
                <Link to="/gettingstarted">
                  [Help]
                </Link>
              </h2>
            </div>
          </div>
          <div className="centered row">
            <TextField
              hintText="Root user's github username"
              floatingLabelText="Root user's github username"
              errorText={this.state.rootError}
              onChange={e => this.updateFields("root", e.target.value)}
            />
          </div>
          <div className="centered row">
            <TextField
              hintText="Github Client ID"
              floatingLabelText="Github Client ID"
              errorText={this.state.client_idError}
              onChange={e => this.updateFields("client_id", e.target.value)}
            />
          </div>
          <div className="centered row">
            <TextField
              hintText="Github Client Secret"
              floatingLabelText="Github Client Secret"
              errorText={this.state.client_secretError}
              onChange={e => this.updateFields("client_secret", e.target.value)}
            />
          </div>
          <div className="centered row">
            <TextField
              defaultValue={this.state.app_ip}
              hintText="This deployment's IP/Domain"
              floatingLabelText="Application IP/domain"
              errorText={this.state.app_ipError}
              onChange={e => this.updateFields("clientip", e.target.value)}
            />
          </div>
          <div className="centered row">
            <Checkbox
              label="Allow new users"
              style={{ maxWidth: 200 }}
              checked={this.state.allowNewUsers}
              onCheck={() => this.updateCheck("allowNewUsers")}
            />
            <br />
          </div>
          <div className="centered row">
            <Checkbox
              label="Is this deployment by CloudCV?"
              style={{ maxWidth: 200 }}
              checked={this.state.is_cloudcv}
              onCheck={() => this.updateCheck("is_cloudcv")}
            />
            <br />
          </div>
          <div className="centered row">
            <RaisedButton label="Save" primary onClick={this.save} />
          </div>
        </div>
      </div>
    );
  }
}
}

export default InitialSetup;
