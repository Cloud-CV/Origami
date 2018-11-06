import React from "react";
import { PropTypes } from "prop-types";
import { Col } from "antd";

class SampleImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      reset: false
    };
    this.onSelect = this.onSelect.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    /*eslint-disable*/
    if (nextProps.resetBorder) {
      /*eslint-enable*/
      this.setState({ clicked: false });
    }
  }

  onSelect(path, key) {
    if (this.props.id != key) {
      this.setState({ reset: true });
    }
    this.setState({ clicked: !this.state.clicked });
    this.props.onSelect(path, key);
  }

  render() {
    return (
      <Col span={6} offset={1}>
        {this.props.id == this.props.clicked ? (
          <img
            key={Math.random()}
            className="ui fluid medium bordered image "
            style={{
              border: "5px solid #0080FF",
              borderRadius: "5px",
              height: "90%",
              transition: "all 0.3s",
              width: "100%",
              boxShadow: "0 1px 5px rgba(0, 0, 0, 0.15)"
            }}
            src={this.props.value}
            onClick={() => this.onSelect(this.props.value, this.props.id)}
          />
        ) : (
          <img
            key={Math.random()}
            className="ui fluid medium bordered image sample"
            style={{
              width: "100%",
              transition: "all 0.3s",
              height: "90%",
              boxShadow: "0 1px 5px rgba(0, 0, 0, 0.15),"
            }}
            src={this.props.value}
            onClick={() => this.onSelect(this.props.value, this.props.id)}
          />
        )}
      </Col>
    );
  }
}

SampleImage.propTypes = {
  onSelect: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};

export default SampleImage;
