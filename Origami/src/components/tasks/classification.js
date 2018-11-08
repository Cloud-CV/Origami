import React from "react";
import { PropTypes } from "prop-types";
import ImageSingleInput from "../inputcomponents/ImageInput/ImageSingleInput";
import { Layout, Icon, Button, Card, Row, Col, Input, Select } from "antd";
const Classification = ({
  src,
  updateFormData,
  value,
  valChange,
  styles,
  submit,
  subhover,
  sub,
  exit
}) => {
  return (
    <div>
      <div className="ui grid" style={{ marginLeft: "4%" }}>
        <div className="three wide column" />
        <div className="nine wide column">
          <ImageSingleInput
            key={Math.random()}
            index={1}
            updateFormData={updateFormData}
            calling_context={"demo"}
            label={""}
            src={src}
          />
        </div>
        <div className="four wide column" />
      </div>
    </div>
  );
};
export default Classification;
