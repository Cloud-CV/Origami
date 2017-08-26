import React from "react";
import { PropTypes } from "prop-types";
import { browserHistory } from "react-router";
import CustomCard from "../../stateless/cards";
import OutputShowcaseModifyDialog
  from "../BaseOutputComponent/OutputShowcaseModifyDialog";
import OutputShowcaseCard from "../BaseOutputComponent/OutputShowcaseCard.js";
import TextOutputPreview from "./TextOutputPreview";
import toastr from "toastr";

class TextOutputShowcaseCard extends OutputShowcaseCard {
  constructor(props) {
    super(props);
    let initHeaders = [];
    if (props.demoProps.outputComponentDemoModel.base_component_id === 1) {
      initHeaders = props.demoProps.outputComponentDemoModel.props;
      this.selected = props.demoProps.outputComponentDemoModel.base_component_id ===
        props.demoProps.selected;
    }
    this.state = {
      headers: initHeaders,
      modifyDialogDisplay: false,
      previewDialogDisplay: false
    };
  }

  updateOutputComponentModel() {
    if (Object.keys(this.demoModel).length === 0) {
      toastr.error("Registration info not found! Register again");
      browserHistory.push("/");
    } else {
      let propsToStore = [];
      this.state.headers.map(header => {
        propsToStore.push(header);
      });
      this.outputComponentDemoModelActions
        .updateOutputComponentModel({
          id: this.demoModel.id,
          user_id: this.user.id,
          base_component_id: 1,
          props: propsToStore
        })
        .then(() => {
          if (this.props.demoProps.params.type === "modify") {
            browserHistory.push("/ngh/user");
          } else {
            if (this.forwardAddressAlternate) {
              if (this.demoModel.status === "input") {
                browserHistory.push(this.forwardAddress);
              } else if (this.demoModel.status === "demo") {
                browserHistory.push(this.forwardAddressAlternate);
              }
            } else {
              browserHistory.push(this.forwardAddress);
            }
          }
        });
    }
  }

  render() {
    return (
      <div>
        <CustomCard
          header="Text Output"
          width="five"
          context="selection"
          selected={this.selected}
          centeredParent
          centeredSegment
          displayData={[`Number of Outputs: ${this.getHeaderRealLength()}`]}
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
              onDeployClick: () => this.updateOutputComponentModel()
            }
          ]}
        />
        {this.state.modifyDialogDisplay &&
          <OutputShowcaseModifyDialog
            functions={{
              updateHeaders: this.updateHeaders,
              hideModifyDialog: this.hideModifyDialog,
              getHeaders: this.getHeaders
            }}
            title="Modify Text Output Component"
          />}

        {this.state.previewDialogDisplay &&
          <TextOutputPreview
            functions={{
              getHeaders: this.getHeaders,
              hidePreviewDialog: this.hidePreviewDialog
            }}
          />}
      </div>
    );
  }
}

TextOutputShowcaseCard.propTypes = {
  demoProps: PropTypes.object.isRequired
};

export default TextOutputShowcaseCard;
