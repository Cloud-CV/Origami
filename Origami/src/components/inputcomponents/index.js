import React from "react";
import { PropTypes } from "prop-types";
import TextInputShowcaseCard from "./TextInput/TextInputShowcaseCard";
import TypeInput from "./BaseInputComponent/TypeInput";
import ImageInputShowcaseCard from "./ImageInput/ImageInputShowcaseCard";
import { Draggable, Droppable } from 'react-drag-and-drop'
export function getInputComponentById(
  id,
  props,
  calling_context,
  socketId,
  sendAddr
) {
  let labels = [];
  let textLabels = [];
  let imageLabels = [];
  props.map((prop, index) => {
    if (prop["id"] === "1") {
      textLabels.push(prop["label"]);
    } else if (prop["id"] === "3") {
      imageLabels.push(prop["label"]);
    }
  });
  return (
    <div>
      <TypeInput
        textLabels={textLabels}
        imageLabels={imageLabels}
        calling_context={calling_context}
        socketId={socketId}
        sendAddr={sendAddr}
      />
    </div>
  );
}

export function getAllInputComponentsForShowcase(data) {
  return [
  <Draggable><TextInputShowcaseCard key={Math.random()} demoProps={data} /></Draggable>,
    <ImageInputShowcaseCard key={Math.random()} demoProps={data} />
  ];
}
