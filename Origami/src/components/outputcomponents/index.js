import React from "react";
import { PropTypes } from "prop-types";

import TextOutput from "./TextOutput/TextOutput";
import ImageOutput from "./ImageOutput/ImageOutput";
import BarGraphOutput from "./BarGraphOutput/BarGraphOutput";
import ScatterGraphOutput from "./ScatterGraphOutput/ScatterGraphOutput";
import PieChartOutput from "./PieChartOutput/PieChartOutput";
import AreaGraphOutput from "./AreaGraphOutput/AreaGraphOutput";

import TextOutputShowcaseCard from "./TextOutput/TextOutputShowcaseCard";
import ImageOutputShowcaseCard from "./ImageOutput/ImageOutputShowcaseCard";
import BarGraphOutputShowCaseCard from "./BarGraphOutput/BarGraphOutputShowcaseCard";
import ScatterGraphOutputShowCaseCard from "./ScatterGraphOutput/ScatterGraphOutputShowcaseCard";
import PieChartOutputShowCaseCard from "./PieChartOutput/PieChartOutputShowcaseCard";
import AreaGraphOutputShowCaseCard from "./AreaGraphOutput/AreaGraphOutputShowcaseCard";

import TextOutputPreview from "./TextOutput/TextOutputPreview";
import ImageOutputPreview from "./ImageOutput/ImageOutputPreview";
import BarGraphOutputPreview from "./BarGraphOutput/BarGraphOutputPreview";
import ScatterGraphOutputPreview from "./ScatterGraphOutput/ScatterGraphOutputPreview";
import PieChartOutputPreview from "./PieChartOutput/PieChartOutputPreview";
import AreaGraphOutputPreview from "./AreaGraphOutput/AreaGraphOutputPreview";

export function getOutputComponentById(id, props, calling_context, data) {
  let headers = [];
  props.map((header, index) => {
    headers[index] = header;
  });
  switch (id) {
    case 1:
      return (
        <TextOutput
          headers={headers}
          calling_context={calling_context}
          data={data}
        />
      );
    case 2:
      return (
        <ImageOutput
          headers={headers}
          calling_context={calling_context}
          data={data}
        />
      );
    case 3:
      return (
        <BarGraphOutput
          headers={headers}
          calling_context={calling_context}
          data={data}
        />
      );
    case 4:
      return (
        <ScatterGraphOutput
          headers={headers}
          calling_context={calling_context}
          data={data}
        />
      );
    case 5:
      return (
        <PieChartOutput
          headers={headers}
          calling_context={calling_context}
          data={data}
        />
      );
    case 6:
      return (
        <AreaGraphOutput
          headers={headers}
          calling_context={calling_context}
          data={data}
        />
      );
    default:
      return <div>Null</div>;
  }
}

export function getAllOutputComponentsForShowcase(data, updatefuncs, headers) {
  return [
    <TextOutputShowcaseCard key={Math.random()} updateHeaders={updatefuncs[5]} headers={headers["text"]} demoProps={data} />,
    <ImageOutputShowcaseCard key={Math.random()} updateHeaders={updatefuncs[2]} headers={headers["image"]} demoProps={data} />,
    <BarGraphOutputShowCaseCard key={Math.random()} updateHeaders={updatefuncs[1]} headers={headers["bargraph"]} demoProps={data} />,
    <ScatterGraphOutputShowCaseCard key={Math.random()} updateHeaders={updatefuncs[4]} headers={headers["scattergraph"]} demoProps={data} />,
    <PieChartOutputShowCaseCard key={Math.random()} updateHeaders={updatefuncs[3]} headers={headers["piechart"]} demoProps={data} />,
    <AreaGraphOutputShowCaseCard key={Math.random()} updateHeaders={updatefuncs[0]} headers={headers["areagraph"]} demoProps={data} />
  ];
}

export function getAllPreviewsForShowcase(getfuncs){
  return [
    <TextOutputPreview key={Math.random()} functions={{getHeaders: getfuncs[5], hidePreviewDialog: () => {1}}} />,
    <ImageOutputPreview key={Math.random()} functions={{getHeaders: getfuncs[2], hidePreviewDialog: () => {1}}} />,
    <BarGraphOutputPreview key={Math.random()} functions={{getHeaders: getfuncs[1], hidePreviewDialog: () => {1}}} />,
    <ScatterGraphOutputPreview key={Math.random()} functions={{getHeaders: getfuncs[4], hidePreviewDialog: () => {1}}} />,
    <PieChartOutputPreview key={Math.random()} functions={{getHeaders: getfuncs[3], hidePreviewDialog: () => {1}}} />,
    <AreaGraphOutputPreview key={Math.random()} functions={{getHeaders: getfuncs[0], hidePreviewDialog: () => {1}}} />
  ];
}
