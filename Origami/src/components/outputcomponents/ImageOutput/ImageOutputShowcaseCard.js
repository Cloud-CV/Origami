import React from "react";
import { PropTypes } from "prop-types";
import { browserHistory } from "react-router";
import CustomCard from "../../stateless/cards";
import OutputShowcaseModifyDialog from "../BaseOutputComponent/OutputShowcaseModifyDialog";
import OutputShowcaseCard from "../BaseOutputComponent/OutputShowcaseCard.js";
import ImageOutputPreview from "./ImageOutputPreview";
import toastr from "toastr";
import { Draggable, Droppable } from 'react-drag-and-drop';

class ImageOutputShowcaseCard extends OutputShowcaseCard {
  constructor(props) {
    super(props);
    let initHeaders = [];
    if (props.demoProps.outputComponentDemoModel.base_component_id === 2) {
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
      browserHistory.push("/");
    } else {
      let propsToStore = [];
      this.state.headers.map(header => {
        if (typeof header == "object") {
          propsToStore.push({ id: "", label: header["label"] });
        } else {
          propsToStore.push({ id: "", label: header });
        }
      });
      this.outputComponentDemoModelActions
        .updateOutputComponentModel({
          id: this.demoModel.id,
          user_id: this.user.id,
          base_component_id: 2,
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
     <div key={Math.random()} style={{width: 'fit-content',margin: "auto"}}>
      <Draggable type="l2" data="Image Input">
        <CustomCard
          header="Image Output"
          width="five"
          context="selection"
          selected={this.selected}
          centeredParent
          centeredSegment
       
        />
      </Draggable>
      </div>
      
    );
  }
}

ImageOutputShowcaseCard.propTypes = {
  demoProps: PropTypes.object.isRequired
};

export default ImageOutputShowcaseCard;
