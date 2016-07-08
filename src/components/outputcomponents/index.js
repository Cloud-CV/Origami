import React, { PropTypes } from 'react';
import TextOutput from './TextOutput/TextOutput';
import ImageOutput from './ImageOutput/ImageOutput';
import TextOutputShowcaseCard from './TextOutput/TextOutputShowcaseCard';
import ImageOutputShowcaseCard from './ImageOutput/ImageOutputShowcaseCard';

export function getOutputComponentById(id, headers, calling_context, data) {
  switch (id) {
  case 1:
    return <TextOutput headers={headers} calling_context={calling_context} data={data} />;
  case 2:
    return <ImageOutput headers={headers} calling_context={calling_context} data={data} />;
  default:
    return <div>Null</div>;
  }
}

export function getAllOutputComponentsForShowcase(data) {
  return [
    <TextOutputShowcaseCard key={Math.random()}
                            demoProps={data}
    />,
    <ImageOutputShowcaseCard key={Math.random()}
                             demoProps={data}
    />
  ];
}
