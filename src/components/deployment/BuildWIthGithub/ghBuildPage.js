import React, { PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { checkDockerfile } from '../../../api/Github/getOneRepo';
import RaisedButton from 'material-ui/RaisedButton';
import toastr from 'toastr';

toastr.options.closeButton = true;

class GHBuildPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      data: [],
      demoPageButtonEnable: true
    };
    this.socket = this.context.socket;
    this.goToDemoPage = this.goToDemoPage.bind(this);
  }

  componentWillMount() {
    checkDockerfile(this.props.githubDemoModel.name, this.props.githubDemoModel.id).then(clone_data => {
      return clone_data;
      })
      .then(clone_data => {
        this.socket.emit('startdeployment', clone_data.toString());

        this.socket.on('datafromterminal', (data) => {
          this.setState({data: [...this.state.data, data]});
        });

        this.socket.on('errorfromterminal', (err) => {
          this.setState({data: [...this.state.data, err]});
        });

        this.socket.on('cloningcomplete', (statusCode) => {
          if (statusCode == '0') {
            toastr.success('Git clone successful');
          } else {
            toastr.error('Git clone failed');
          }
        });

        this.socket.on('deploymentcomplete', (status) => {
          if (status == '0') {
            toastr.success('Deployment successfull');
            this.setState({demoPageButtonEnable: false});
          } else {
            toastr.error('Deployment failed');
          }
        });
      });
  }

  goToDemoPage() {
    browserHistory.push(`/user/repo/${this.props.params.repoName}/demo`);
  }

  render() {
    return (
      <div className="ui relaxed stackable grid fluid container">

        <div className="sixteen wide column stretched row" style={{visibility: this.state.showOutput}}>
          <div className="row" >
            <h1>Build</h1>
          </div>

          <div className="ui horizontal divider row" >
            <span><hr /></span>
          </div>

          <div className="row">
            <div className="ui relaxed stackable grid container">
              <div className="two column row">
                <div className="column">
                  <div className="ui card" style={{width: "100%"}}>
                    <div className="content">
                      <div className="ui padded raised segment container"
                           style={{height: "52vh", backgroundColor: "black",
                           color: "white", overflowY: "scroll"}}>
                        {this.state.data.map((data) =>
                          <p key={Math.random()}>{data}</p>
                        )}
                      </div>
                    </div>
                    <div className="extra content">
                        <b>{"Running on port: " +
                        this.props.githubDemoModel.token.split(':')[4]
                        }</b>
                      <RaisedButton
                        label="Go To Demo"
                        primary
                        disabled={this.state.demoPageButtonEnable}
                        onClick={this.goToDemoPage}
                        style={{float: "right"}} />
                    </div>
                  </div>
                </div>

                <div className="ui vertical internal divider"
                     style={{height: "75%", marginTop: "10%"}}>
                  <hr /></div>

                <div className="column">
                  <div className="ui raise fluid very padded container text">
                    <br />
                    <div className="ui container segment">
                      Insert help text here
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

GHBuildPage.propTypes = {
  login: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  githubDemoModel: PropTypes.object.isRequired,
  outputComponentDemoModel: PropTypes.object.isRequired,
  inputComponentDemoModel: PropTypes.object.isRequired
};

GHBuildPage.contextTypes = {
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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GHBuildPage);
