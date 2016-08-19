import React, { PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as nonghDemoModelActions from '../../../actions/nonghDemoModelActions';
import * as inputComponentDemoModelActions from '../../../actions/inputComponentDemoModelActions';
import { getAllInputComponentsForShowcase } from '../../inputcomponents';
import { getComponentDeployed } from '../../../api/CommonLocal/getComponentDeployed';
import { Step, Stepper, StepLabel } from 'material-ui/Stepper';
import { grey900 } from 'material-ui/styles/colors';
import toastr from 'toastr';

toastr.options.closeButton = true;

class SelectInputComponentPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      userid: parseInt(localStorage.getItem('userid'), 10),
      inputComponentDemoModel: {},
      outputComponentStepperHighlight: false
    };
  }

  componentWillMount() {
    getComponentDeployed(this.state.userid, this.props.params.repoId, 'input').then((inputComponentSeedData) => {
      if (JSON.parse(inputComponentSeedData).length !== 0) {
        let dataToSeed = {
          id: JSON.parse(inputComponentSeedData)[0].id,
          userid: JSON.parse(inputComponentSeedData)[0].userid,
          baseComponentId: JSON.parse(inputComponentSeedData)[0].baseComponentId,
          props: JSON.parse(inputComponentSeedData)[0].props
        };
        this.setState({ inputComponentDemoModel: dataToSeed });
      }
    })
      .then(() => {
        getComponentDeployed(this.state.userid, this.props.params.repoId, 'output').then((outputComponentSeedData) => {
          if (JSON.parse(outputComponentSeedData).length !== 0) {
            this.setState({ outputComponentStepperHighlight: true });
          }
        });
      });
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.inputComponentDemoModel !== nextProps.inputComponentDemoModel) {
      this.setState({ inputComponentDemoModel: nextProps.inputComponentDemoModel });
    }
  }

  render() {

    document.body.scrollTop = document.documentElement.scrollTop = 0;

    return (
      <div className="ui relaxed stackable grid fluid">

        <div className="ui relaxed stackable grid fluid container">
          <div style={{ visibility: this.state.showOutput, width: '100%', maxWidth: 700, margin: 'auto' }}>
            <Stepper linear={false}>
              <Step active>
                <StepLabel>Register Application</StepLabel>
              </Step>
              <Step active>
                <StepLabel><b style={{ fontSize: 'large' }}>Select Input Component</b></StepLabel>
              </Step>
              <Step active={this.state.outputComponentStepperHighlight}>
                <StepLabel>Select Output Component</StepLabel>
              </Step>
            </Stepper>
          </div>

          <div className="sixteen wide column stretched row">
            <div className="row" >
              <h1>Select Input Component</h1>
            </div>

            <div className="ui horizontal divider row" >
              <span><hr /></span>
            </div>

            <div className="fifteen wide column stretched stackable centered row">
              <div className="ui three padded column stackable grid" style={{ marginLeft: '3%', minHeight: '90vh' }}>
                {getAllInputComponentsForShowcase({
                  demoModel: this.props.nonghDemoModel,
                  user: this.props.user,
                  inputComponentDemoModel: this.state.inputComponentDemoModel,
                  inputComponentModelActions: this.props.inputComponentModelActions,
                  forwardAddress: `/ngh/user/${this.props.nonghDemoModel.name}/${this.props.nonghDemoModel.id}/outputcomponent`,
                  params: this.props.params,
                  selected: this.state.inputComponentDemoModel.baseComponentId
                }).map((showcasecard, index) =>
                  showcasecard
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="ui fluid centered row"
             style={{ minHeight: '5vh', backgroundColor: grey900, color: 'white', minWidth: '100vw' }}
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
  params: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    login: state.login,
    user: state.user,
    nonghDemoModel: state.nonghDemoModel,
    inputComponentDemoModel: state.inputComponentDemoModel
  };
}

function mapDispatchToProps(dispatch) {
  return {
    nonghModelActions: bindActionCreators(nonghDemoModelActions, dispatch),
    inputComponentModelActions: bindActionCreators(inputComponentDemoModelActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectInputComponentPage);
