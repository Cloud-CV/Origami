import React from "react";
import { PropTypes } from "prop-types";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";

class OverloadedHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      elementId: ""
    };
    this.headerLength = props.data.headerLength;
    this.addLocalHeadersToParent = props.data.addLocalHeaders;
    this.deleteLocalHeadersFromParent = props.data.deleteLocalHeaders;
  }

  componentWillMount() {
    this.setState({ elementId: this.headerLength });
  }

  componentDidMount() {
    this.addLocalHeadersToParent(this.headerLength, "");
  }

  render() {
    return (
      <div>
        <TextField
          hintText="Header"
          onChange={e =>
            this.addLocalHeadersToParent(this.headerLength, e.target.value)
          }
        />
        &nbsp;&nbsp;&nbsp;
        <RaisedButton
          label="Delete"
          primary
          onMouseDown={() =>
            this.deleteLocalHeadersFromParent(this.state.elementId)
          }
        />
      </div>
    );
  }
}

OverloadedHeader.propTypes = {
  data: PropTypes.object.isRequired
};

export default OverloadedHeader;
