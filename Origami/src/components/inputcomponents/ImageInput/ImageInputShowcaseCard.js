import React, { PropTypes } from "react";
import { browserHistory } from "react-router";
import CustomCard from "../../stateless/cards";
import InputShowcaseModifyDialog
  from "../BaseInputComponent/InputShowcaseModifyDialog";
import ImageInputPreview from "./ImageInputPreview";
import toastr from "toastr";
import InputShowcaseCard from "../BaseInputComponent/InputShowcaseCard.js";

class ImageInputShowcaseCard extends InputShowcaseCard {
  constructor(props) {
    super(props);
    let initLabels = [];
    if (props.demoProps.inputComponentDemoModel.base_component_id === 3) {
      initLabels = props.demoProps.inputComponentDemoModel.props;
      this.selected = props.demoProps.inputComponentDemoModel.base_component_id ===
        props.demoProps.selected;
    }
    this.state = {
      labels: initLabels,
      modifyDialogDisplay: false,
      previewDialogDisplay: false
    };
  }

  updateInputComponentModel() {
    if (Object.keys(this.demoModel).length === 0) {
      toastr.error("Registration info not found! Register again");
      browserHistory.push("/");
    } else {
      let propsToStore = [];
      this.state.labels.map(label => {
        propsToStore.push(label);
      });
      this.inputComponentModelActions
        .updateInputComponentModel({
          id: this.demoModel.id,
          user_id: this.user.id,
          base_component_id: 3,
          props: propsToStore
        })
        .then(() => {
          if (this.props.demoProps.params.type === "modify") {
            browserHistory.push("/ngh/user");
          } else {
            browserHistory.push(this.forwardAddress);
          }
        });
    }
  }

  render() {
    return (
      <div>
        <CustomCard
          header="Image Input"
          width="five"
          context="selection"
          selected={this.selected}
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
        {this.state.modifyDialogDisplay &&
          <InputShowcaseModifyDialog
            functions={{
              updateLabels: this.updateLabels,
              hideModifyDialog: this.hideModifyDialog,
              getLabels: this.getLabels
            }}
            title="Modify Image Input Component"
          />}

        {this.state.previewDialogDisplay &&
          <ImageInputPreview
            functions={{
              getLabels: this.getLabels,
              hidePreviewDialog: this.hidePreviewDialog
            }}
          />}
      </div>
    );
  }
}

ImageInputShowcaseCard.propTypes = {
  demoProps: PropTypes.object.isRequired
};

export default ImageInputShowcaseCard;
