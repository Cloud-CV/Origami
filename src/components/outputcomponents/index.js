import React, { PropTypes } from 'react';
import TextOutput from './TextOutput/TextOutput';
import TextOutputShowcaseCard from './TextOutput/TextOutputShowcaseCard';

export function getOutputComponentById(id, headers, data) {
  switch (id) {
    case 1:
      return <TextOutput headers={headers} data={data}/>;
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
