import React from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as nonghDemoModelActions from '../../../actions/nonghDemoModelActions';
import * as inputComponentDemoModelActions from '../../../actions/inputComponentDemoModelActions';
import { getAllInputComponentsForShowcase } from '../../inputcomponents';
import { getComponentDeployed } from '../../../api/CommonLocal/getComponentDeployed';
import { Step, Stepper, StepLabel } from 'material-ui/Stepper';
import { grey900 } from 'material-ui/styles/colors';
import toastr from 'toastr';
import { Draggable, Droppable } from 'react-drag-and-drop';
toastr.options.closeButton = true;
import RaisedButton from 'material-ui/RaisedButton';
import { Responsive, WidthProvider } from 'react-grid-layout';
import GridLayout from 'react-grid-layout';
import TypeInput from '../../inputcomponents/BaseInputComponent/TypeInput';
import { Modal, Button } from 'antd';
import '../../../../../node_modules/react-grid-layout/css/styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

class SelectInputComponentPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      user_id: parseInt(localStorage.getItem('user_id'), 10),
      inputComponentDemoModel: {},
      outputComponentStepperHighlight: false,
      array: [],
      Rows: [],
      current: 0,
      value: '',
      visible: false,
      label: [],
      layout: [],
    };

    this.browserHistory = this.props.history;
    this.id = props['match']['params'].repoId;
    this.base_component_id = 1;
    this.modify = props['match']['params'].type === 'modify';
    this.forwardAddress =
      '/ngh/user/' +
      props['match']['params'].repoName +
      '/' +
      props['match']['params'].repoId +
      '/outputcomponent';
  }

  componentDidMount() {
    getComponentDeployed(
      this.state.user_id,
      this.props['match']['params'].repoId,
      'input'
    )
      .then(inputComponentSeedData => {
        if (JSON.parse(inputComponentSeedData).length > 0) {
          let id = JSON.parse(inputComponentSeedData)[0].id;
          let user_id = JSON.parse(inputComponentSeedData)[0].user_id;
          let base_component_id = JSON.parse(inputComponentSeedData)[0]
            .base_component_id;

          let dataToSeed = {
            id: id,
            user_id: user_id,
            base_component_id: base_component_id,
            props: JSON.parse(inputComponentSeedData)[0].props,
          };

          let k = dataToSeed['props'];
          let net = [];
          let lab = [];
          let ley = [];

          for (var i = 0; i < k.length; i++) {
            if ('layout' in k[i]) ley.push(k[i]['layout']);
          }

          Object.keys(k).forEach(function(key, index) {
            if (k[key].id == 1) {
              net.push('Text Input');
            }
            if (k[key].id == 3) {
              net.push('Image Input');
            }
            lab[index] = k[key]['label'];
          });

          this.helper(net, lab);
          this.setState({ inputComponentDemoModel: dataToSeed, layout: ley });
        }
      })
      .then(() => {
        getComponentDeployed(
          this.state.user_id,
          this.props['match']['params'].repoId,
          'output'
        ).then(outputComponentSeedData => {
          if (JSON.parse(outputComponentSeedData).length > 0) {
            this.setState({ outputComponentStepperHighlight: true });
          }
        });
      });
  }

  getHeight() {
    let ley = this.state.layout;
    let mx = 0;
    if (ley.length > 0) {
      for (var i = 0; i < ley.length; i++) {
        if (ley[i]['x'] == 2) {
          mx = Math.max(ley[i]['y'], mx);
        }
      }
    }

    return ley.length > 0 ? mx + 4 : mx;
  }

  showModal(e) {
    let lab = this.state.label;
    this.setState({
      value: lab[e['index']],
      visible: true,
      current: e['index'],
    });
  }

  handleOk(event) {
    var array = this.state.array;
    var lab = this.state.label;
    var val = this.state.value;
    var idx = this.state.current;
    lab[idx] = val;
    this.helper(array, lab);
    this.setState({ value: '' });
  }

  handleCancel(e) {
    this.setState({
      visible: false,
      value: '',
    });
  }

  helper(arrayvar, lab) {
    var row = [];
    for (var i = 0; i < arrayvar.length; i++) {
      var prp = [];
      var k = arrayvar[i];
      let tem = {};
      tem['id'] = k == 'Text Input' ? 1 : 3;
      tem['label'] = lab[i] ? lab[i] : '';
      prp.push(tem);

      row.push(
        <div key={i}>
          <TypeInput
            prop={prp}
            calling_context="demo2"
            socketId=""
            sendAddr=""
          />
        </div>
      );
    }
    this.setState({
      array: arrayvar,
      Rows: row,
      visible: false,
      label: lab,
      value: '',
    });
  }

  onDelete(data) {
    var index = data['index'];
    var arrayvar = this.state.array.slice();
    var lab = this.state.label;
    var ley = this.state.layout;

    if (index > -1) {
      arrayvar.splice(index, 1);
      lab.splice(index, 1);
      for (var i = 0; i < ley.length; i++) {
        ley[i]['i'] = i.toString();
      }
      this.setState({ layout: ley });
      this.helper(arrayvar, lab);
    }
  }

  onDrop(data) {
    let k = this.state.inputComponentDemoModel;
    var arrayvar = this.state.array.slice();
    let lab = this.state.label.slice();
    lab.push('');
    let d = data['ll'] ? data['ll'] : data['lr'];
    arrayvar.push(d);
    this.helper(arrayvar, lab);
    let ley = this.state.layout;
    let tmp = [];
    tmp['x'] = 2;
    tmp['y'] = this.getHeight();
    tmp['w'] = 2;
    tmp['h'] = 3;
    ley.push(tmp);
    this.setState({ layout: ley });
  }

  onSubmit() {
    let lab = this.state.label;
    let k = [];
    let l = this.state.array;
    let layout = this.state.layout;
    for (var i = 0; i < l.length; i++) {
      let tem = {};
      tem['id'] = l[i] == 'Text Input' ? 1 : 3;
      tem['label'] = lab[i] ? lab[i] : '';
      tem['layout'] = layout[i];
      k.push(tem);
    }

    this.props.inputComponentModelActions
      .updateInputComponentModel({
        id: this.id,
        user_id: this.state.user_id,
        base_component_id: this.base_component_id,
        props: k,
      })
      .then(() => {
        if (this.modify) {
          this.browserHistory.push('/ngh/user');
        } else {
          this.browserHistory.push(this.forwardAddress);
        }
      });
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.state.inputComponentDemoModel !== nextProps.inputComponentDemoModel
    ) {
      this.setState({
        inputComponentDemoModel: nextProps.inputComponentDemoModel,
      });
    }
  }
  onLayoutChange(prop) {
    this.setState({ layout: prop });
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    const myScrollbar = {
      minWidth: '71vw',
      minHeight: '63vh',
      overflow: 'scroll',
      backgroundColor: 'grey',
    };

    const but = {
      position: 'absolute',
      bottom: '0.5%',
      right: '10%',
    };

    let layout = this.state.layout;

    return (
      <div className="ui relaxed stackable grid fluid">
        <div className="ui relaxed stackable grid fluid container">
          <div
            style={{
              visibility: this.state.showOutput,
              width: '100%',
              maxWidth: 700,
              margin: 'auto',
            }}
          >
            <Stepper linear={false}>
              <Step active>
                <StepLabel>Register Application</StepLabel>
              </Step>
              <Step active>
                <StepLabel>
                  <b style={{ fontSize: 'large' }}>Select Input Component</b>
                </StepLabel>
              </Step>
              <Step active={this.state.outputComponentStepperHighlight}>
                <StepLabel>Select Output Component</StepLabel>
              </Step>
            </Stepper>
          </div>
          <div className="sixteen wide column stretched row">
            <div className="row">
              <h1>Select Input Component</h1>
            </div>
            <div className="ui horizontal divider row">
              <span>
                <hr />
              </span>
            </div>

            <div className="fifteen wide column stretched stackable centered row">
              <div
                className="ui three padded column stackable grid"
                style={{ marginLeft: '2%' }}
              >
                {getAllInputComponentsForShowcase({
                  demoModel: this.props.nonghDemoModel,
                  user: this.props.user,
                  inputComponentDemoModel: this.state.inputComponentDemoModel,
                  inputComponentModelActions: this.props
                    .inputComponentModelActions,
                  forwardAddress: `/ngh/user/${
                    this.props.nonghDemoModel.name
                  }/${this.props.nonghDemoModel.id}/outputcomponent`,
                  params: this.props['match']['params'],
                  selected: this.state.inputComponentDemoModel
                    .base_component_id,
                }).map((showcasecard, index) => showcasecard)}

                <br />
                <br />
                <Droppable types={['ll', 'lr']} onDrop={this.onDrop.bind(this)}>
                  <br />
                  <br />

                  <div style={myScrollbar}>
                    <div style={{ width: 'fit-content', margin: 'auto' }}>
                      <b style={{ fontSize: 'large' }}>Drag N Drop</b>
                    </div>

                    {this.state.Rows.length > 0 && (
                      <GridLayout
                        rowHeight={50}
                        className="layout"
                        col={10}
                        width={2000}
                        verticalCompact={false}
                        onLayoutChange={this.onLayoutChange.bind(this)}
                        layout={layout}
                        isResizable={false}
                        style={{
                          width: '71vw',
                          height: '64vh',
                          margin: '0 auto',
                          overflowY: 'scroll',
                          backgroundColor: '#f3f3f3',
                          border: '1px solid #EFEFEF',
                          borderRadius: 3,
                        }}
                      >
                        {this.state.Rows.map((value, index) => (
                          <div key={index} data-grid={layout[index]}>
                            <li style={{ listStyleType: 'none' }}>{value}</li>
                            <button
                              onClick={this.onDelete.bind(this, { index })}
                              type="button"
                              className="btn btn-primary"
                            >
                              Delete
                            </button>
                            <button
                              type="button"
                              onClick={this.showModal.bind(this, { index })}
                              className="btn btn-primary"
                              style={{ float: 'right' }}
                            >
                              Label
                            </button>
                          </div>
                        ))}
                      </GridLayout>
                    )}

                    <Modal
                      title="Input Label"
                      visible={this.state.visible}
                      onOk={this.handleOk.bind(this)}
                      onCancel={this.handleCancel.bind(this)}
                    >
                      <form onSubmit={this.handleOk.bind(this)}>
                        <div className="form-group">
                          <label for="usr">Label:</label>
                          <br />
                          <input
                            type="text"
                            className="form-control"
                            value={this.state.value}
                            onChange={this.handleChange.bind(this)}
                          />
                        </div>
                      </form>
                    </Modal>
                  </div>
                  <br />
                  <br />
                </Droppable>
                <div style={but}>
                  <RaisedButton
                    label="Submit"
                    primary={true}
                    onClick={this.onSubmit.bind(this)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="ui fluid centered row"
          style={{
            minHeight: '5vh',
            backgroundColor: grey900,
            color: 'white',
            minWidth: '100vw',
          }}
        >
          © CloudCV, 2016
        </div>
      </div>
    );
  }
}
SelectInputComponentPage.propTypes = {
  login: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  nonghDemoModel: PropTypes.object.isRequired,
  inputComponentDemoModel: PropTypes.object.isRequired,
  nonghModelActions: PropTypes.object.isRequired,
  inputComponentModelActions: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    login: state.login,
    user: state.user,
    nonghDemoModel: state.nonghDemoModel,
    inputComponentDemoModel: state.inputComponentDemoModel,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    nonghModelActions: bindActionCreators(nonghDemoModelActions, dispatch),
    inputComponentModelActions: bindActionCreators(
      inputComponentDemoModelActions,
      dispatch
    ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  SelectInputComponentPage
);
