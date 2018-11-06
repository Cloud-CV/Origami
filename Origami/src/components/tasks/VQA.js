import React from "react";
import { PropTypes } from "prop-types";
import ImageSingleInput from "../inputcomponents/ImageInput/ImageSingleInput";
import { Layout, Icon, Button, Card, Row, Col, Input, Select } from "antd";
const VQA = ({
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
    <div className="ui grid" style={{ marginLeft: "1px" }}>
      <div className="eight wide column">
        <ImageSingleInput
          key={Math.random()}
          index={1}
          updateFormData={updateFormData}
          calling_context={"demo"}
          label={""}
          src={src}
        />
      </div>
      <div
        className="two wide column"
        style={{ paddingLeft: "3%", paddingTop: "7%" }}
      >
        <div className="row">
          <form
            id="send-text"
            className="six wide stackable stretched ui input"
          >
            <input
              className="origami-demo-input-text-component"
              name={`input-text-1`}
              type="text"
              style={{
                width: "30vw",
                borderWidth: "1px",
                borderColor: "#606470",
                fontSize: "17px"
              }}
              value={value}
              onChange={valChange}
            />
          </form>
        </div>
        <div
          className="row"
          style={{ paddingTop: "20px", paddingLeft: "80%", width: "30vw" }}
        >
          <div>
            <Button
              primary
              onMouseEnter={sub}
              onMouseLeave={exit}
              onClick={submit}
              style={subhover == 2 ? styles.subhover : styles.sub}
            >
              <text style={styles.send}>Send</text>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default VQA;
