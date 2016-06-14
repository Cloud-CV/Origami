import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';

class OverloadedTextField extends React.Component {
  constructor(props) {
    super(props);
    this.labelLength = props.data.labelLength;
    this.addLocalLabelsToParent = props.data.addLocalLabels;
  }

  componentDidMount() {
    this.addLocalLabelsToParent(this.labelLength, "");
  }

  render() {
    return (
      <TextField
        key={Math.random()}
        hintText="Label"
        onChange={(e) => this.addLocalLabelsToParent(this.labelLength, e.target.value)}
      />
    );
  }
}

OverloadedTextField.propTypes = {
  data: PropTypes.object.isRequired
};

export default OverloadedTextField;

