import React, { PropTypes } from "react";
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
    if (nextProps.resetBorder) {
      this.setState({ clicked: false });
    }
  }

  onSelect(path) {
    this.setState({ clicked: !this.state.clicked });
    this.props.onSelect(path);
  }

  render() {
    return (
      <Col span={5} offset={1}>
        {this.state.clicked
          ? <img
              key={Math.random()}
              className="ui fluid medium bordered image"
              style={{ border: "2px solid black", width: "100%"}}
              src={this.props.value}
              onClick={() => this.onSelect(this.props.value)}
            />
          : <img
              key={Math.random()}
              className="ui fluid medium bordered image"
              style={{width: "100%"}}
              src={this.props.value}
              onClick={() => this.onSelect(this.props.value)}
            />}
      </Col>
    );
  }
}

SampleImage.propTypes = {
  onSelect: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};

export default SampleImage;
