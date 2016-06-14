import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';

class OverloadedTextOutput extends React.Component {
  constructor(props) {
    super(props);
    this.headerLength = props.data.headerLength;
    this.addLocalHeadersToParent = props.data.addLocalHeaders;
  }

  componentDidMount() {
    this.addLocalHeadersToParent(this.labelLength, "");
  }

  render() {
    return (
      <TextField
        key={Math.random()}
        hintText="Header"
        onChange={(e) => this.addLocalHeadersToParent(this.headerLength, e.target.value)}
      />
    );
  }
}

OverloadedTextOutput.propTypes = {
  data: PropTypes.object.isRequired
};

export default OverloadedTextOutput;

