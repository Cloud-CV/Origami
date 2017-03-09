import React, { PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { getInputComponentById } from '../../inputcomponents';
import { getOutputComponentById } from '../../outputcomponents';
import { getDeployed } from '../../../api/Nongh/getDeployed';
import { modifyDeployed } from '../../../api/Nongh/modifyDeployed';
import { getComponentDeployed } from '../../../api/CommonLocal/getComponentDeployed';
import { grey900 } from 'material-ui/styles/colors';
import toastr from 'toastr';

toastr.options.closeButton = true;

class NGHDemoPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      userid: 0,
      outputData: [],
      showTerminal: false,
      terminalData: [],
      inputModel: {},
      outputModel: {},
      demoModel: {}
    };
    this.socket = this.context.socket;
    this.socketId = this.context.socketId;
    this.toggleShowTerminal = this.toggleShowTerminal.bind(this);
  }

  componentWillMount() {

    $('body').css('overflow', 'hidden');

    this.socket.on('injectoutputdata', (data) => {
      if (data.data) {
        this.setState({
          outputData: Object.assign(Object.assign([], this.state.outputData), data.data)
        });
        $('#appbar-progress').progress({
          percent: '100%'
        });
        setTimeout(() => {
          $('#appbar-progress').css('visibility', 'hidden');
          $('#appbar-progress').progress({
            percent: '0%'
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
      $('#appbar-progress').progress({
        percent: '100%'
      });
      setTimeout(() => {
        $('#appbar-progress').css('visibility', 'hidden');
        $('#appbar-progress').progress({
          percent: '0%'
        });
      }, 1000);
    });
    this.setState({ userid: parseInt(this.props.params.userid, 10) }, () => {
      getDeployed(this.state.userid, this.props.params.repoId).then((data) => {
        this.setState({ demoModel: JSON.parse(data)[0] }, () => {
          if (this.state.demoModel.terminal) {
            this.setState({ showTerminal: true });
          }
        });
        if (JSON.parse(data)[0].status === 'input') {
          modifyDeployed(this.state.userid, Object.assign({}, JSON.parse(data)[0], { status: 'demo' })).then();
        }
      });
      getComponentDeployed(this.state.userid, this.props.params.repoId, 'input').then((data) => {
        if (Object.keys(JSON.parse(data)).length) {
          this.setState({ inputModel: JSON.parse(data)[0] });
        }
      });
      getComponentDeployed(this.state.userid, this.props.params.repoId, 'output').then((data) => {
        if (Object.keys(JSON.parse(data)).length) {
          this.setState({ outputModel: JSON.parse(data)[0] });
        }
      });
    });
  }

  componentWillUnmount() {
    $('body').css('overflow', 'auto');
  }

  toggleShowTerminal() {
    this.setState({ showTerminal: !this.state.showTerminal });
  }

  render() {

    const mainClassName = this.state.showTerminal ? 'ui twelve wide column grid' : 'ui sixteen wide column grid';

    return (
      <div className="ui relaxed stackable grid fluid">

        {this.state.demoModel &&
        <div className={mainClassName} style={{ visibility: this.state.showOutput }}>
          <div className="sixteen wide column stretched centered row" id="output-outer"
               style={{
                 maxHeight: '90vh', overflowY: 'scroll', overflowX: 'hidden', whiteSpace: 'nowrap'
               }}
          >
            {!this.state.showTerminal && this.state.demoModel.terminal &&
            <div className="row">
              <i className="large browser icon"
                 style={{ cursor: 'pointer', float: 'right' }}
                 onClick={() => this.toggleShowTerminal()}
              />
              <br />
              <br />
            </div>
            }
            <div className="row">
              <h1>{this.state.demoModel.name}</h1>
              <i>{this.state.demoModel.description}</i>
            </div>

            <div className="ui horizontal divider row">
              <span><hr /></span>
            </div>

            <div className="row">
              <div className="ui relaxed stackable grid container">
                <div className="column row">

                  <div className="center aligned column">
                    <h2 className="ui row">
                      Input
                    </h2>
                    {Object.keys(this.state.demoModel).length && Object.keys(this.state.inputModel).length > 0 &&
                    getInputComponentById(this.state.inputModel.baseComponentId,
                      this.state.inputModel.props, 'demo', this.socketId,
                      `http://${this.state.demoModel.token.split(':')[1]}:${this.state.demoModel.token.split(':')[4]}/event`
                    )}
                  </div>

                </div>
              </div>
            </div>

            <div className="ui horizontal divider row">
              <span><hr /></span>
            </div>

            <div id="appbar-progress"
                 className="ui bottom attached indicating progress"
                 style={{ visibility: 'hidden' }}
            >
              <div className="bar" />
            </div>

            <div className="row" id="output-div">
              <div className="ui relaxed stackable grid container">
                <div className="column row">

                  <div className="center aligned column">
                    <h2 className="ui row">
                      Output
                    </h2>
                    {Object.keys(this.state.demoModel).length && Object.keys(this.state.outputModel).length > 0 &&
                    getOutputComponentById(this.state.outputModel.baseComponentId,
                      this.state.outputModel.props, 'demo', this.state.outputData
                    )}

                    {this.state.demoModel.footerMessage &&
                    <div className="ui fluid centered row"
                         style={{ maxWidth: '100vw', overflowX: 'auto' }}
                    >
                      <h4>
                        {this.state.demoModel.footerMessage}
                      </h4>
                    </div>
                    }


                    <div className="ui fluid centered row"
                         style={{ minHeight: '5vh' }}
                    />

                    <div className="ui fluid centered row">
                      © CloudCV, 2016
                    </div>

                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
        }

        {this.state.showTerminal &&
        <div className="ui four wide column">
          <h2 className="ui header grid" style={{ marginTop: '1vh' }}>
            <div className="ui twelve wide column">
              <div className="content">
                Terminal
              </div>
            </div>
            <div className="ui four wide column">
              <i className="circular small remove icon"
                 style={{ cursor: 'pointer' }}
                 onClick={() => this.toggleShowTerminal()}
              />
            </div>
          </h2>
          <div className="ui padded segment"
               style={{ minHeight: '100vh', maxHeight: '100vh', backgroundColor: 'black',
                 color: 'white', overflowY: 'scroll', wordWrap: 'break-word' }}
          >
            {this.state.terminalData.map((data) =>
              <p key={Math.random()}>{data}</p>
            )}
          </div>
        </div>
        }
      </div>
    );
  }
}

NGHDemoPage.propTypes = {
  login: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  nonghDemoModel: PropTypes.object.isRequired,
  outputComponentDemoModel: PropTypes.object.isRequired,
  inputComponentDemoModel: PropTypes.object.isRequired
};

NGHDemoPage.contextTypes = {
  socket: PropTypes.object.isRequired,
  socketId: PropTypes.string.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    login: state.login,
    user: state.user,
    nonghDemoModel: state.nonghDemoModel,
    inputComponentDemoModel: state.inputComponentDemoModel,
    outputComponentDemoModel: state.outputComponentDemoModel
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NGHDemoPage);
