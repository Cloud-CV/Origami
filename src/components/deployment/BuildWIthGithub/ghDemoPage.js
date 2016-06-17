import React, { PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { getInputComponentById } from '../../inputcomponents';
import { getOutputComponentById } from '../../outputcomponents';
import toastr from 'toastr';

toastr.options.closeButton = true;

class GHDemoPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      outputData: []
    };
    this.socket = this.context.socket;
    this.socketId = this.context.socketId;
  }

  componentWillMount() {
    this.socket.on('injectoutputdata', data => {
      this.setState({
        outputData: Object.assign(Object.assign([], this.state.outputData), data.data)
      });
    });
    this.socket.on('malformedoutputdata', () => {
      toastr.error('Malformed output data received');
    });
  }

  render() {
    return (
      <div className="ui relaxed stackable grid fluid container">

        <div className="sixteen wide column stretched row" style={{visibility: this.state.showOutput}}>
          <div className="row" >
            <h1>{"Demo: " + this.props.githubDemoModel.name}</h1>
            {this.props.githubDemoModel.description}
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
                  {getInputComponentById(this.props.inputComponentDemoModel.baseComponentId,
                    this.props.inputComponentDemoModel.props, "demo", this.socketId,
                    "http://0.0.0.0:" + '8000' + "/event"
                  )}
                </div>

                <div className="ui vertical internal divider">
                  <hr /></div>

                <div className="center aligned column">
                  <h2 className="ui row">
                    Output
                  </h2>
                  {getOutputComponentById(this.props.outputComponentDemoModel.baseComponentId,
                    this.props.outputComponentDemoModel.props, "demo", this.state.outputData
                  )}
                </div>

              </div>
            </div>
          </div>
        </div>
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
