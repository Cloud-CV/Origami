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
import GridLayout from 'react-grid-layout';
import '../../../../node_modules/react-grid-layout/css/styles.css';

export function getOutputComponentById(id, props, calling_context, data) {
  let headers = [];
  props.map((header, index) => {
    headers[index] = header;
  });

  let fin=[];
  let layout=[];
  for(var i=0;i<props.length;i++)
  {
    let lab={};
    lab["id"]=props[i].id;
    lab["label"]=props[i].label; 
    if("layout" in props[i])
    layout.push(props[i].layout);     

  switch (lab["id"]) {
    case 1:
      fin.push(
        <TextOutput
          headers={lab["label"]}
          calling_context={calling_context}
          data={data}
        />
      );
      break;
    case 2:
      fin.push(
        <ImageOutput
          headers={lab["label"]}
          calling_context={calling_context}
          data={data}
        />
      );
      break;
    case 3:
      fin.push(
        <BarGraphOutput
          headers={lab["label"]}
          calling_context={calling_context}
          data={data}
        />
      );
      break;
    case 4:
      fin.push(
        <ScatterGraphOutput
          headers={lab["label"]}
          calling_context={calling_context}
          data={data}
        />
      );
      break;
    case 5:
      fin.push(
        <PieChartOutput
          headers={lab["label"]}
          calling_context={calling_context}
          data={data}
        />
      );
      break;
    case 6:
      fin.push(
        <AreaGraphOutput
          headers={lab["label"]}
          calling_context={calling_context}
          data={data}
        />
      );
      break;
    default:
      return <div>Null</div>;
  }
}
if(calling_context == "demo2")
return fin;
else
{
let l=(
              <GridLayout
                    rowHeight={50} className="layout" 
                    col={10}
                    width={2000}
                   verticalCompact={false}
                   isDraggable={false}
                   >

                   
              {fin.map((value,index)=>     
                  <div key={index} data-grid={{x: layout[index]["x"], y:layout[index]["y"],
                   w:layout[index]["w"] , h: layout[index]["h"]}} >

                               <br /><br />
            {value}
                  </div>

        )}
              </GridLayout>



  );

return l;

  
}
}

export function getAllOutputComponentsForShowcase(data) {
  return [
    <TextOutputShowcaseCard key={Math.random()} demoProps={data} />,
    <ImageOutputShowcaseCard key={Math.random()} demoProps={data} />,
    <BarGraphOutputShowCaseCard key={Math.random()} demoProps={data} />,
    <ScatterGraphOutputShowCaseCard key={Math.random()} demoProps={data} />,
    <PieChartOutputShowCaseCard key={Math.random()} demoProps={data} />,
    <AreaGraphOutputShowCaseCard key={Math.random()} demoProps={data} />
  ];
}
