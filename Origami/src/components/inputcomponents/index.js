import React from "react";
import { PropTypes } from "prop-types";
import TextInputShowcaseCard from "./TextInput/TextInputShowcaseCard";
import TypeInput from "./BaseInputComponent/TypeInput";
import ImageInputShowcaseCard from "./ImageInput/ImageInputShowcaseCard";
import TextInputPreview from "./TextInput/TextInputPreview";
import ImageInputPreview from "./ImageInput/ImageInputPreview";

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

export function getAllInputComponentsForShowcase(data, imgUpdateLabels, textUpdateLabels, imagelabels, textlabels) {
  return [
    <TextInputShowcaseCard key={Math.random()} demoProps={data} labels={textlabels} updateLabels={textUpdateLabels}/>,
    <ImageInputShowcaseCard key={Math.random()} demoProps={data} labels={imagelabels} updateLabels={imgUpdateLabels}/>
  ];
}

export function getAllPreviewsForShowcase(imgLabels, textLabels){
  return [
    <TextInputPreview key={Math.random()} functions={{getLabels: textLabels, hidePreviewDialog: () => {1}}}/>,
    <ImageInputPreview key={Math.random()} functions={{getLabels: imgLabels, hidePreviewDialog: () => {1}}}/>
  ];
}