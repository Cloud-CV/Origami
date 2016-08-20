import React, { PropTypes } from 'react';

import TextOutput from './TextOutput/TextOutput';
import ImageOutput from './ImageOutput/ImageOutput';
import BarGraphOutput from './BarGraphOutput/BarGraphOutput';
import ScatterGraphOutput from './ScatterGraphOutput/ScatterGraphOutput';
import PieChartOutput from './PieChartOutput/PieChartOutput';
import AreaGraphOutput from './AreaGraphOutput/AreaGraphOutput';

import TextOutputShowcaseCard from './TextOutput/TextOutputShowcaseCard';
import ImageOutputShowcaseCard from './ImageOutput/ImageOutputShowcaseCard';
import BarGraphOutputShowCaseCard from './BarGraphOutput/BarGraphOutputShowcaseCard';
import ScatterGraphOutputShowCaseCard from './ScatterGraphOutput/ScatterGraphOutputShowcaseCard';
import PieChartOutputShowCaseCard from './PieChartOutput/PieChartOutputShowcaseCard';
import AreaGraphOutputShowCaseCard from './AreaGraphOutput/AreaGraphOutputShowcaseCard';

export function getOutputComponentById(id, headers, calling_context, data) {
  switch (id) {
  case 1:
    return <TextOutput headers={headers} calling_context={calling_context} data={data} />;
  case 2:
    return <ImageOutput headers={headers} calling_context={calling_context} data={data} />;
  case 3:
    return <BarGraphOutput headers={headers} calling_context={calling_context} data={data} />;
  case 4:
    return <ScatterGraphOutput headers={headers} calling_context={calling_context} data={data} />;
  case 5:
    return <PieChartOutput headers={headers} calling_context={calling_context} data={data} />;
  case 6:
    return <AreaGraphOutput headers={headers} calling_context={calling_context} data={data} />;
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
    />,
    <BarGraphOutputShowCaseCard key={Math.random()}
                            demoProps={data}
    />,
    <ScatterGraphOutputShowCaseCard key={Math.random()}
                                demoProps={data}
    />,
    <PieChartOutputShowCaseCard key={Math.random()}
                                    demoProps={data}
    />,
    <AreaGraphOutputShowCaseCard key={Math.random()}
                                demoProps={data}
    />
  ];
}
