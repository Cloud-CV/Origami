import React from "react";
import { PropTypes } from "prop-types";
import { Link, browserHistory } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as nonghDemoModelActions from "../../../actions/nonghDemoModelActions";
import * as inputComponentDemoModelActions
  from "../../../actions/inputComponentDemoModelActions";
import { getAllInputComponentsForShowcase, getAllPreviewsForShowcase } from "../../inputcomponents";
import {
  getComponentDeployed
} from "../../../api/CommonLocal/getComponentDeployed";
import { Step, Stepper, StepLabel } from "material-ui/Stepper";
import { grey900 } from "material-ui/styles/colors";
import toastr from "toastr";
import RaisedButton from "material-ui/RaisedButton";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";

toastr.options.closeButton = true;

class SelectInputComponentPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      imglabels: [],
      textlabels: [],
      user_id: parseInt(localStorage.getItem("user_id"), 10),
      inputComponentDemoModel: {},
      outputComponentStepperHighlight: false,
      showPreview: false
    };
    this.togglePreview = this.togglePreview.bind(this);
    this.updateImgLabels = this.updateImgLabels.bind(this);
    this.updateTextLabels = this.updateTextLabels.bind(this);
    this.getImgLabels = this.getImgLabels.bind(this);
    this.getTextLabels = this.getTextLabels.bind(this);
  }
  
  updateImgLabels(data) {
    let dataToUpdate = [];
    data.map(value => {
      dataToUpdate.push(value);
    });
    this.setState({ imglabels: dataToUpdate });
    console.log("Update Called");
  }
  updateTextLabels(data) {
    let dataToUpdate = [];
    data.map(value => {
      dataToUpdate.push(value);
    });
    this.setState({ textlabels: dataToUpdate });
    console.log("Update Called");
  }
  componentWillMount() {
    getComponentDeployed(this.state.user_id, this.props.params.repoId, "input")
      .then(inputComponentSeedData => {
        if (JSON.parse(inputComponentSeedData).length > 0) {
          let dataToSeed = {
            id: JSON.parse(inputComponentSeedData)[0].id,
            user_id: JSON.parse(inputComponentSeedData)[0].user_id,
            base_component_id: JSON.parse(inputComponentSeedData)[
              0
            ].base_component_id,
            props: JSON.parse(inputComponentSeedData)[0].props
          };
          this.setState({ inputComponentDemoModel: dataToSeed });
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
      this.state.inputComponentDemoModel !== nextProps.inputComponentDemoModel
    ) {
      this.setState({
        inputComponentDemoModel: nextProps.inputComponentDemoModel
      });
    }
  }
  
  getImgLabels() {
    let labels = [];
    this.state.imglabels.map((label, index) => {
      if (typeof label === "object") {
        label = "";
      }
      labels[index] = label;
    });
    return labels;
  }

  getTextLabels() {
    let labels = [];
    this.state.textlabels.map((label, index) => {
      if (typeof label === "object") {
        label = "";
      }
      labels[index] = label;
    });
    return labels;
  }
  togglePreview(){
    this.setState({showPreview: !this.state.showPreview});
  }
  render() {
    const actions = [
      <FlatButton
        key={0}
        label="Ok"
        primary
        keyboardFocused
        onTouchTap={this.togglePreview}
      />
    ];
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
              <Step active>
                <StepLabel>
                  <b style={{ fontSize: "large" }}>Select Input Component</b>
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
              <span><hr /></span>
            </div>

            <div
              className="fifteen wide column stretched stackable centered row"
            >
              <div
                className="ui three padded column stackable grid"
                style={{ marginLeft: "3%", minHeight: "90vh" }}
              >
              
                  { !this.state.showPreview && getAllInputComponentsForShowcase({
                  demoModel: this.props.nonghDemoModel,
                  user: this.props.user,
                  inputComponentDemoModel: this.state.inputComponentDemoModel,
                  inputComponentModelActions: this.props.inputComponentModelActions,
                  forwardAddress: `/ngh/user/${this.props.nonghDemoModel.name}/${this.props.nonghDemoModel.id}/outputcomponent`,
                  params: this.props.params,
                  selected: this.state.inputComponentDemoModel.base_component_id
                }, this.updateImgLabels, this.updateTextLabels, this.state.imglabels, this.state.textlabels).map((showcasecard, index) => showcasecard)}
              
                {this.state.showPreview &&
                  <Dialog
                  title="Preview"
                  actions={actions}
                  modal
                  autoScrollBodyContent
                  open={this.state.showPreview}
                  >
                  {getAllPreviewsForShowcase(this.getImgLabels, this.getTextLabels).map((preview, index) => preview)}
                  </Dialog>

                }
                <div className="row" style={{marginTop: "-30vh", height: "6vh", minHeight: "6vh", width: "100%", marginLeft: "37%"}}>
              <RaisedButton label={"Preview"} secondary={true} onClick={this.togglePreview}/>
              </div>
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
    inputComponentModelActions: bindActionCreators(
      inputComponentDemoModelActions,
      dispatch
    )
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  SelectInputComponentPage
);
