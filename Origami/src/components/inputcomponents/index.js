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
  
  console.log("props input label")
  console.log(props);

  fin.push(
      <TypeInput
        prop={props}
        calling_context={calling_context}
        socketId={socketId}
        sendAddr={sendAddr}
      />
    );
  
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
