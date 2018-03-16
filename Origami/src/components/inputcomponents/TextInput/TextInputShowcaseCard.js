import React from "react";
import { PropTypes } from "prop-types";
import { withRouter } from "react-router-dom";
import CustomCard from "../../stateless/cards";
import InputShowcaseModifyDialog from "../BaseInputComponent/InputShowcaseModifyDialog";
import TextInputPreview from "./TextInputPreview";
import toastr from "toastr";
import InputShowcaseCard from "../BaseInputComponent/InputShowcaseCard.js";

class TextInputShowcaseCard extends InputShowcaseCard {
  constructor(props) {
    super(props);
    this.init = props.demoProps.inputComponentDemoModel.props;
    let labels = [];
    this.others = [];
    try {
      this.init.map((prop, index) => {
        if (prop.id === "1") {
          labels.push(prop.label);
        } else {
          this.others.push(prop);
        }
      });
    } catch (err) {
      /** Handler error here */
    }
    this.state = {
      labels,
      modifyDialogDisplay: false,
      previewDialogDisplay: false
    };
  }

  updateInputComponentModel() {
    if (Object.keys(this.demoModel).length === 0) {
      toastr.error("Registration info not found! Register again");
      this.props.history.push("/");
    } else {
      let propsToStore = this.others;
      this.state.labels.map(label => {
        propsToStore.push({ id: "1", label });
      });
      this.inputComponentModelActions
        .updateInputComponentModel({
          id: this.demoModel.id,
          user_id: this.user.id,
          base_component_id: 1,
          props: propsToStore
        })
        .then(() => {
          if (this.props.demoProps.params.type === "modify") {
            this.props.history.push("/ngh/user");
          } else {
            this.props.history.push(this.forwardAddress);
          }
        });
    }
  }

  render() {
    return (
      <div>
        <CustomCard
          header="Text Input"
          width="five"
          context="selection"
          centeredParent
          centeredSegment
          displayData={[`Number of inputs: ${this.getLabelRealLength()}`]}
          buttonData={[
            {
              label: "Modify",
              onDeployClick: () => this.showModifyDialog()
            },
            {
              label: "Preview",
              onDeployClick: () => this.showPreviewDialog()
            },
            {
              label: "Save",
              onDeployClick: () => this.updateInputComponentModel()
            }
          ]}
        />
        {this.state.modifyDialogDisplay && (
          <InputShowcaseModifyDialog
            functions={{
              updateLabels: this.updateLabels,
              hideModifyDialog: this.hideModifyDialog,
              getLabels: this.getLabels
            }}
            title="Modify Text Input Component"
          />
        )}
        {this.state.previewDialogDisplay && (
          <TextInputPreview
            functions={{
              getLabels: this.getLabels,
              hidePreviewDialog: this.hidePreviewDialog
            }}
          />
        )}
      </div>
    );
  }
}

TextInputShowcaseCard.propTypes = {
  demoProps: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default withRouter(TextInputShowcaseCard);
