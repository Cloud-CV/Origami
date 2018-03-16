import React from "react";
import { PropTypes } from "prop-types";
import TextInputShowcaseCard from "./TextInput/TextInputShowcaseCard";
import TypeInput from "./BaseInputComponent/TypeInput";
import ImageInputShowcaseCard from "./ImageInput/ImageInputShowcaseCard";

export function getInputComponentById(
  id,
  inputModelProps,
  calling_context,
  socketId,
  sendAddr
) {
  let labels = [];
  let textLabels = [];
  let imageLabels = [];
  inputModelProps.map((prop, index) => {
    if (prop.id === "1") {
      textLabels.push(prop.label);
    } else if (prop.id === "3") {
      imageLabels.push(prop.label);
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
    <TextInputShowcaseCard key={Math.random()} demoProps={data} />,
    <ImageInputShowcaseCard key={Math.random()} demoProps={data} />
  ];
}
