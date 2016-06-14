import React, { PropTypes } from 'react';
import CustomCard from '../../stateless/cards';
import TextInputShowcaseModifyDialog from './TextInputShowcaseModifyDialog';

class TextInputShowcaseCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: [],
      modifyDialogDisplay: false
    };
    this.showModifyDialog = this.showModifyDialog.bind(this);
    this.updateLabels = this.updateLabels.bind(this);
    this.getLabels = this.getLabels.bind(this);
    this.hideModifyDialog = this.hideModifyDialog.bind(this);
  }

  showModifyDialog() {
    this.setState({modifyDialogDisplay: true});
  }

  hideModifyDialog() {
    this.setState({modifyDialogDisplay: false});
  }

  updateLabels(data) {
    this.setState({labels: data});
  }

  getLabels() {
    return this.state.labels;
  }

  render() {
    return (
      <div>
        <CustomCard
          header="Text Input"
          width="five"
          centeredParent
          centeredSegment
          displayData = {[
          'Number of inputs: ' + this.state.labels.length
        ]}
          buttonData = {[
          {
            label: "Modify",
            onDeployClick: () => this.showModifyDialog()
          }
        ]}
        />
        {this.state.modifyDialogDisplay && <TextInputShowcaseModifyDialog
          functions={{
            updateLabels: this.updateLabels,
            hideModifyDialog: this.hideModifyDialog,
            getLabels: this.getLabels
          }}
        />}
      </div>

    );
  }
}

TextInputShowcaseCard.propTypes = {
};

export default TextInputShowcaseCard;

