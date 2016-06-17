import React, { PropTypes } from 'react';
import TextOutput from './TextOutput/TextOutput';
import TextOutputShowcaseCard from './TextOutput/TextOutputShowcaseCard';

export function getOutputComponentById(id, headers, calling_context, data) {
  switch (id) {
    case 1:
      return <TextOutput headers={headers} calling_context={calling_context} data={data}/>;
    default:
      return <div>Null</div>;
  }
}

export function getAllOutputComponentsForShowcase(data) {
  return [
    <TextOutputShowcaseCard key={Math.random()}
                           demoProps={data}/>
  ];
}
