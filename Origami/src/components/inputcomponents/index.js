import React from "react";
import { PropTypes } from "prop-types";
import TextInputShowcaseCard from "./TextInput/TextInputShowcaseCard";
import TypeInput from "./BaseInputComponent/TypeInput";
import ImageInputShowcaseCard from "./ImageInput/ImageInputShowcaseCard";

export function getInputComponentById(
  id,
  props,
  calling_context,
  socketId,
  sendAddr
) {
 
  console.log("calling_context socketId sendAddr =");
  console.log(calling_context);
  console.log(socketId);
  console.log(sendAddr);
  let fin=[];
  props.map((prop, index) => {
     let labels = [];
  let textLabels = [];
  let imageLabels = [];
    if (prop["id"] === 1) {
      textLabels.push("text label");
    } else if (prop["id"] === 3) {
      imageLabels.push("image label");
    }
  
  console.log("Text label")
  console.log(textLabels);

  console.log("Image label")
  console.log(imageLabels);
  fin.push(
      <TypeInput
        textLabels={textLabels}
        imageLabels={imageLabels}
        calling_context={calling_context}
        socketId={socketId}
        sendAddr={sendAddr}
      />
    );
  });
  return (
    <div>
      {fin}
    </div>
  );
}

export function getAllInputComponentsForShowcase(data) {
  return [
    <TextInputShowcaseCard key={Math.random()} demoProps={data} />,
    <ImageInputShowcaseCard key={Math.random()} demoProps={data} />
  ];
}
