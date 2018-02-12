import React from "react";
import { PropTypes } from "prop-types";
import { browserHistory } from "react-router";
import CustomCard from "../../stateless/cards";
import InputShowcaseModifyDialog
  from "../BaseInputComponent/InputShowcaseModifyDialog";
import TextInputPreview from "./TextInputPreview";
import toastr from "toastr";
import InputShowcaseCard from "../BaseInputComponent/InputShowcaseCard.js";
import { Draggable, Droppable } from 'react-drag-and-drop'
class TextInputShowcaseCard extends InputShowcaseCard {
  constructor(props) {
    super(props);
    console.log("props from imageshow");
    console.log(props);
    this.init = props.demoProps.inputComponentDemoModel.props;
    let labels = [];
    this.others = [];
    try {
      this.init.map((prop, index) => {
        if (prop["id"] === "1") {
          labels.push(prop["label"]);
        } else {
          this.others.push(prop);
        }
      });
    } catch (err) {
      console.log(err);
    }
    this.state = {
      labels: labels,
      modifyDialogDisplay: false,
      previewDialogDisplay: false
    };
  }

  updateInputComponentModel() {
    if (Object.keys(this.demoModel).length === 0) {
      toastr.error("Registration info not found! Register again");
      browserHistory.push("/");
    } else {
      let propsToStore = this.others;
      this.state.labels.map(label => {
        propsToStore.push({ id: "1", label: label });
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
            browserHistory.push("/ngh/user");
          } else {
            browserHistory.push(this.forwardAddress);
          }
        });
    }
  }

  render() {
    return (
      <div key={Math.random()} style={{width: 'fit-content',margin: "auto"}}>
      <Draggable type="lr" data="Text Input">
        <CustomCard
          header="Text Input"
          width="five"
          context="selection"
          centeredParent
          centeredSegment
        />
      </Draggable> 
      </div>
      
    );
  }
}

TextInputShowcaseCard.propTypes = {
  demoProps: PropTypes.object
};

export default TextInputShowcaseCard;
