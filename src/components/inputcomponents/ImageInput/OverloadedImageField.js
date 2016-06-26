import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class OverloadedImageField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      elementId: ''
    };
    this.labelLength = props.data.labelLength;
    this.addLocalLabelsToParent = props.data.addLocalLabels;
    this.deleteLocalLabelsFromParent= props.data.deleteLocalLabels;
  }

  componentWillMount() {
    this.setState({elementId: this.labelLength});
  }

  componentDidMount() {
    this.addLocalLabelsToParent(this.labelLength, "");
  }

  render() {
    return (
      <div>
        <TextField
          hintText="Label"
          onChange={(e) => this.addLocalLabelsToParent(this.labelLength, e.target.value)}
        />
        &nbsp;&nbsp;&nbsp;
        <RaisedButton
          label="Delete"
          primary
          onMouseDown={() => this.deleteLocalLabelsFromParent(this.state.elementId)}
        />
      </div>
    );
  }
}

OverloadedImageField.propTypes = {
  data: PropTypes.object.isRequired
};

export default OverloadedImageField;

