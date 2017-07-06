import React, { PropTypes } from "react";
import { Link, browserHistory } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as nonghDemoModelActions from "../../../actions/nonghDemoModelActions";
import * as outputComponentDemoModelActions
  from "../../../actions/outputComponentDemoModelActions";
import { getAllOutputComponentsForShowcase } from "../../outputcomponents";
import {
  getComponentDeployed
} from "../../../api/CommonLocal/getComponentDeployed";
import { Step, Stepper, StepLabel } from "material-ui/Stepper";
import { grey900 } from "material-ui/styles/colors";
import toastr from "toastr";

toastr.options.closeButton = true;

class SelectOutputComponentPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      user_id: parseInt(localStorage.getItem("user_id"), 10),
      outputComponentDemoModel: {},
      inputComponentStepperHighlight: false
    };
  }

  componentWillMount() {
    getComponentDeployed(
      this.state.user_id,
      this.props.nonghDemoModel.id,
      "output"
    )
      .then(outputComponentSeedData => {
        if (JSON.parse(outputComponentSeedData).length > 0) {
          let dataToSeed = {
            id: JSON.parse(outputComponentSeedData)[0].id,
            user_id: JSON.parse(outputComponentSeedData)[0].user_id,
            base_component_id: JSON.parse(outputComponentSeedData)[
              0
            ].base_component_id,
            props: JSON.parse(outputComponentSeedData)[0].props
          };
          this.setState({ outputComponentDemoModel: dataToSeed });
        }
      })
      .then(() => {
        getComponentDeployed(
          this.state.user_id,
          this.props.params.repoId,
          "output"
        ).then(outputComponentSeedData => {
          if (JSON.parse(outputComponentSeedData).length > 0) {
            this.setState({ outputComponentStepperHighlight: true });
          }
        });
      });
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.state.outputComponentDemoModel !== nextProps.outputComponentDemoModel
    ) {
      this.setState({
        outputComponentDemoModel: nextProps.outputComponentDemoModel
      });
    }
  }

  render() {
    document.body.scrollTop = (document.documentElement.scrollTop = 0);

    return (
      <div className="ui relaxed stackable grid fluid">

        <div className="ui relaxed stackable grid fluid container">
          <div
            style={{
              visibility: this.state.showOutput,
              width: "100%",
              maxWidth: 700,
              margin: "auto"
            }}
          >
            <Stepper linear={false}>
              <Step active>
                <StepLabel>Register Application</StepLabel>
              </Step>
              <Step active={this.state.inputComponentStepperHighlight}>
                <StepLabel>Select Input Component</StepLabel>
              </Step>
              <Step active>
                <StepLabel>
                  <b style={{ fontSize: "large" }}>Select Output Component</b>
                </StepLabel>
              </Step>
            </Stepper>
          </div>

          <div className="sixteen wide column stretched row">
            <div className="row">
              <h1>Select Output Component</h1>
            </div>

            <div className="ui horizontal divider row">
              <span><hr /></span>
            </div>

            <div
              className="fifteen wide column stretched stackable centered row"
            >
              <div
                className="ui three padded column stackable grid"
                style={{ marginLeft: "3%", minHeight: "90vh" }}
              >
                {getAllOutputComponentsForShowcase({
                  demoModel: this.props.nonghDemoModel,
                  user: this.props.user,
                  outputComponentDemoModel: this.state.outputComponentDemoModel,
                  outputComponentDemoModelActions: this.props.outputComponentDemoModelActions,
                  forwardAddress: `/ngh/user/${this.props.user.id || localStorage.getItem("user_id")}/${this.props.nonghDemoModel.name}/${this.props.nonghDemoModel.id}/demo`,
                  params: this.props.params,
                  selected: this.state.outputComponentDemoModel.base_component_id
                }).map((showcasecard, index) => showcasecard)}
              </div>
            </div>
          </div>
        </div>

        <div
          className="ui fluid centered row"
          style={{
            minHeight: "5vh",
            backgroundColor: grey900,
            color: "white",
            minWidth: "100vw"
          }}
        >
          © CloudCV, 2016
        </div>
      </div>
    );
  }
}

SelectOutputComponentPage.propTypes = {
  login: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  nonghDemoModel: PropTypes.object.isRequired,
  outputComponentDemoModel: PropTypes.object.isRequired,
  nonghModelActions: PropTypes.object.isRequired,
  outputComponentDemoModelActions: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    login: state.login,
    user: state.user,
    nonghDemoModel: state.nonghDemoModel,
    outputComponentDemoModel: state.outputComponentDemoModel
  };
}

function mapDispatchToProps(dispatch) {
  return {
    nonghModelActions: bindActionCreators(nonghDemoModelActions, dispatch),
    outputComponentDemoModelActions: bindActionCreators(
      outputComponentDemoModelActions,
      dispatch
    )
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  SelectOutputComponentPage
);
