import React, { PropTypes } from 'react';
import TextInput from './TextInput/TextInput';
import TextInputShowcaseCard from './TextInput/TextInputShowcaseCard';
import TextImageInput from './TextImageInput/TextImageInput';
import TextImageInputShowcaseCard from './TextImageInput/TextImageInputShowcaseCard';

export function getInputComponentById(id, props, calling_context, socketId, sendAddr) {
  switch (id) {
    case 1:
      return <TextInput labels={props} calling_context={calling_context} socketId={socketId} sendAddr={sendAddr}/>;
    case 2:
      return <TextImageInput labels={props} calling_context={calling_context} socketId={socketId} sendAddr={sendAddr}/>;
    default:
      return <div>Null</div>;
  }
}

export function getAllInputComponentsForShowcase(data) {
  return [
    <TextInputShowcaseCard key={Math.random()}
                           demoProps={data}/>,
    <TextImageInputShowcaseCard key={Math.random()}
                                demoProps={data}/>
  ];
}
