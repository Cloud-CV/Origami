import React, { PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { getInputComponentById } from '../../inputcomponents';
import { getOutputComponentById } from '../../outputcomponents';
import { getDeployed } from '../../../api/GithubLocal/getDeployed';
import { getComponentDeployed } from '../../../api/CommonLocal/getComponentDeployed';
import toastr from 'toastr';

toastr.options.closeButton = true;

class GHDemoPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      outputData: [],
      terminalData: [],
      inputModel: {},
      outputModel: {},
      demoModel: {}
    };
    this.socket = this.context.socket;
    this.socketId = this.context.socketId;
  }

  componentWillMount() {
    this.socket.on('injectoutputdata', data => {
      if (data.data) {
        this.setState({
          outputData: Object.assign(Object.assign([], this.state.outputData), data.data)
        });
        $("#appbar-progress").progress({
          percent: "100%"
        });
        setTimeout(() => {
          $("#appbar-progress").css('visibility', 'hidden');
          $("#appbar-progress").progress({
            percent: "0%"
          });
        }, 1000);
      }
      if (data.terminalData) {
        this.setState({
          terminalData: [...data.terminalData, ...this.state.terminalData]
        });
      }
    });
    this.socket.on('malformedoutputdata', () => {
      toastr.error('Malformed output data received');
      $("#appbar-progress").progress({
        percent: "100%"
      });
      setTimeout(() => {
        $("#appbar-progress").css('visibility', 'hidden');
        $("#appbar-progress").progress({
          percent: "0%"
        });
      }, 1000);
    });
    getDeployed(this.props.params.repoId).then(data => {
      this.setState({demoModel: JSON.parse(data)[0]});
    });
    getComponentDeployed(this.props.params.repoId, 'input').then(data => {
      this.setState({inputModel: JSON.parse(data)[0]});
    });
    getComponentDeployed(this.props.params.repoId, 'output').then(data => {
      this.setState({outputModel: JSON.parse(data)[0]});
    });
  }

  render() {
    return (
      <div className="ui relaxed stackable grid fluid container">
        {this.state.demoModel &&
        <div className="sixteen wide column stretched row" style={{visibility: this.state.showOutput}}>
          <div className="row" >
            <h1>{this.state.demoModel.name}</h1>
            {this.state.demoModel.description}
          </div>

          <div className="ui horizontal divider row" >
            <span><hr /></span>
          </div>

          <div className="row">
            <div className="ui relaxed stackable grid container">
              <div className="two column row">

                <div className="center aligned column">
                  <h2 className="ui row">
                    Input
                  </h2>
                  {Object.keys(this.state.demoModel).length && Object.keys(this.state.inputModel).length &&
                  getInputComponentById(this.state.inputModel.baseComponentId,
                    this.state.inputModel.props, "demo", this.socketId,
                    `http://${this.state.demoModel.token.split(':')[1]}:${this.state.demoModel.token.split(':')[4]}/event`
                  )}
                </div>

                <div className="ui vertical internal divider">
                  <hr /></div>

                <div className="center aligned column">
                  <h2 className="ui row">
                    Output
                  </h2>
                  {Object.keys(this.state.demoModel).length && Object.keys(this.state.outputModel).length &&
                  getOutputComponentById(this.state.outputModel.baseComponentId,
                    this.state.outputModel.props, "demo", this.state.outputData
                  )}
                </div>

              </div>
            </div>
          </div>
        </div>
        }
        {this.state.demoModel.terminal &&
        <div className="one column row">
          <div className="column">
            <div className="ui card" style={{width: "100%"}}>
              <div className="content">
                <div className="header">Terminal</div>
              </div>
              <div className="content">
                <div className="ui padded raised segment container"
                     style={{height: "52vh", backgroundColor: "black",
                           color: "white", overflowY: "scroll"}}>
                  {this.state.terminalData.map((data) =>
                    <p key={Math.random()}>{data}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        }
      </div>
    );
  }
}

GHDemoPage.propTypes = {
  login: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  githubDemoModel: PropTypes.object.isRequired,
  outputComponentDemoModel: PropTypes.object.isRequired,
  inputComponentDemoModel: PropTypes.object.isRequired
};

GHDemoPage.contextTypes = {
  socket: PropTypes.object.isRequired,
  socketId: PropTypes.string.isRequired
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

export default connect(mapStateToProps, mapDispatchToProps)(GHDemoPage);
