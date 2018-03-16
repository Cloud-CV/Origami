import React from "react";
import { PropTypes } from "prop-types";
import { withRouter } from "react-router-dom";
import CustomCard from "../../stateless/cards";
import OutputShowcaseModifyDialog from "../BaseOutputComponent/OutputShowcaseModifyDialog";
import OutputShowcaseCard from "../BaseOutputComponent/OutputShowcaseCard.js";
import PieChartOutputPreview from "./PieChartOutputPreview";
import toastr from "toastr";

class PieChartOutputShowcaseCard extends OutputShowcaseCard {
  constructor(props) {
    super(props);
    let initHeaders = [];
    if (props.demoProps.outputComponentDemoModel.base_component_id === 5) {
      initHeaders = props.demoProps.outputComponentDemoModel.props;
      this.selected =
        props.demoProps.outputComponentDemoModel.base_component_id ===
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
      this.props.history.push("/");
    } else {
      let propsToStore = [];
      this.state.headers.map(header => {
        if (typeof header === "object") {
          propsToStore.push({ id: "", label: header.label });
        } else {
          propsToStore.push({ id: "", label: header });
        }
      });
      this.outputComponentDemoModelActions
        .updateOutputComponentModel({
          id: this.demoModel.id,
          user_id: this.user.id,
          base_component_id: 5,
          props: propsToStore
        })
        .then(() => {
          if (this.props.demoProps.params.type === "modify") {
            this.props.history.push("/ngh/user");
          } else {
            if (this.forwardAddressAlternate) {
              if (this.demoModel.status === "input") {
                this.props.history.push(this.forwardAddress);
              } else if (this.demoModel.status === "demo") {
                this.props.history.push(this.forwardAddressAlternate);
              }
            } else {
              this.props.history.push(this.forwardAddress);
            }
          }
        });
    }
  }

  render() {
    return (
      <div>
        <CustomCard
          header="Pie Chart Output"
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
        {this.state.modifyDialogDisplay && (
          <OutputShowcaseModifyDialog
            functions={{
              updateHeaders: this.updateHeaders,
              hideModifyDialog: this.hideModifyDialog,
              getHeaders: this.getHeaders
            }}
            title="Modify Pie Chart Output Component"
          />
        )}

        {this.state.previewDialogDisplay && (
          <PieChartOutputPreview
            functions={{
              getHeaders: this.getHeaders,
              hidePreviewDialog: this.hidePreviewDialog
            }}
          />
        )}
      </div>
    );
  }
}

PieChartOutputShowcaseCard.propTypes = {
  demoProps: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default withRouter(PieChartOutputShowcaseCard);
