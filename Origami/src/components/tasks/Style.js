import React from "react";
import { PropTypes } from "prop-types";
import ImageSingleInput from "../inputcomponents/ImageInput/ImageSingleInput";
import { Layout, Icon, Button, Card, Row, Col, Input, Select } from "antd";
const Style = ({
  src1,
  src2,
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
    <div className="ui grid">
      <div className="two wide column" />
      <div className="six wide column">
        <ImageSingleInput
          key={Math.random()}
          index={1}
          updateFormData={() => updateFormData(1)}
          calling_context={"demo"}
          label={"Content Image"}
          src={src1}
        />
      </div>
      <div className="one wide column" />
      <div className="six wide column">
        <ImageSingleInput
          key={Math.random()}
          index={1}
          updateFormData={() => updateFormData(2)}
          calling_context={"demo"}
          label={"Style Image"}
          src={src2}
        />
      </div>
    </div>
  );
};
export default Style;
