import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import CustomCard from '../../stateless/cards';
import TextOutputShowcaseModifyDialog from './TextOutputShowcaseModifyDialog';
import TextOutputPreview from './TextOutputPreview';
import toastr from 'toastr';

class TextOutputShowcaseCard extends React.Component {
  constructor(props) {
    super(props);
    let initHeaders = [];
    if (props.demoProps.outputComponentDemoModel.baseComponentId == '1') {
      initHeaders = props.demoProps.outputComponentDemoModel.props;
    }
    this.state = {
      headers: initHeaders,
      modifyDialogDisplay: false,
      previewDialogDisplay: false
    };
    this.githubDemoModel = props.demoProps.githubDemoModel;
    this.outputComponentDemoModel = props.demoProps.outputComponentDemoModel;
    this.githubModelActions = props.demoProps.githubModelActions;
    this.outputComponentDemoModelActions = props.demoProps.outputComponentDemoModelActions;
    this.showModifyDialog = this.showModifyDialog.bind(this);
    this.showPreviewDialog = this.showPreviewDialog.bind(this);
    this.updateOutputComponentModel = this.updateOutputComponentModel.bind(this);
    this.updateHeaders = this.updateHeaders.bind(this);
    this.getHeaders = this.getHeaders.bind(this);
    this.hideModifyDialog = this.hideModifyDialog.bind(this);
    this.hidePreviewDialog = this.hidePreviewDialog.bind(this);
  }

  showModifyDialog() {
    this.setState({modifyDialogDisplay: true});
  }

  hideModifyDialog() {
    this.setState({modifyDialogDisplay: false});
  }

  showPreviewDialog() {
    this.setState({previewDialogDisplay: true});
  }

  hidePreviewDialog() {
    this.setState({previewDialogDisplay: false});
  }

  updateOutputComponentModel() {
    if(Object.keys(this.githubDemoModel).length == 0) {
      toastr.error('Registration info not found! Register again');
      browserHistory.push('/');
    } else {
      this.outputComponentDemoModelActions.updateOutputComponentModel({
        id: this.githubDemoModel.id,
        baseComponentId: 1,
        props: this.state.headers
      }).then(() => {
        if (this.githubDemoModel.status === 'input') {
          browserHistory.push(`/user/repo/${this.props.demoProps.params.repoName}/build`);
        } else if (this.githubDemoModel.status === 'demo') {
          browserHistory.push(`/user/repo/${this.props.demoProps.params.repoName}/demo`);
        }
      });
    }
  }

  updateHeaders(data) {
    this.setState({headers: data});
  }

  getHeaders() {
    return this.state.headers;
  }

  render() {
    return (
      <div>
        <CustomCard
          header="Text Output"
          width="five"
          centeredParent
          centeredSegment
          displayData = {[
          'Number of Outputs: ' + this.state.headers.length
        ]}
          buttonData = {[
          {
            label: "Modify",
            onDeployClick: () => this.showModifyDialog()
          },
          {
            label: "Preview",
            onDeployClick: () => this.showPreviewDialog()
          },
          {
            label: "Use",
            onDeployClick: () => this.updateOutputComponentModel()
          }
        ]}
        />
        {this.state.modifyDialogDisplay && <TextOutputShowcaseModifyDialog
          functions={{
            updateHeaders: this.updateHeaders,
            hideModifyDialog: this.hideModifyDialog,
            getHeaders: this.getHeaders
          }}
        />}

        {this.state.previewDialogDisplay && <TextOutputPreview
          functions={{
            getHeaders: this.getHeaders,
            hidePreviewDialog: this.hidePreviewDialog
          }}
        />}
      </div>

    );
  }
}

TextOutputShowcaseCard.propTypes = {
  demoProps: PropTypes.object.isRequired
};

export default TextOutputShowcaseCard;

