import React, { PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as githubDemoModelActions from '../../../actions/githubDemoModelActions';
import * as outputComponentDemoModelActions from '../../../actions/outputComponentDemoModelActions';
import { getAllOutputComponentsForShowcase } from '../../outputcomponents';
import toastr from 'toastr';

toastr.options.closeButton = true;

class SelectOutputComponentPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      outputComponentDemoModel: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if(this.state.outputComponentDemoModel != nextProps.outputComponentDemoModel) {
      this.setState({outputComponentDemoModel: nextProps.outputComponentDemoModel});
    }
  }

  render() {
    return (
      <div className="ui relaxed stackable grid fluid container">

        <div className="sixteen wide column stretched row">
          <div className="row" >
            <h1>Select Output Component</h1>
          </div>

          <div className="ui horizontal divider row" >
            <span><hr /></span>
          </div>

          <div className="fifteen wide column stretched stackable centered row">
            <div className="ui three padded column stackable grid" style={{marginLeft: "3%"}}>
              {getAllOutputComponentsForShowcase({
                githubDemoModel: this.props.githubDemoModel,
                outputComponentDemoModel: this.props.outputComponentDemoModel,
                githubModelActions: this.props.githubModelActions,
                outputComponentDemoModelActions: this.props.outputComponentDemoModelActions,
                params: this.props.params
              }).map((showcasecard, index) =>
                showcasecard
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SelectOutputComponentPage.propTypes = {
  login: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  githubDemoModel: PropTypes.object.isRequired,
  outputComponentDemoModel: PropTypes.object.isRequired,
  githubModelActions: PropTypes.object.isRequired,
  outputComponentDemoModelActions: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    login: state.login,
    user: state.user,
    githubDemoModel: state.githubDemoModel,
    outputComponentDemoModel: state.outputComponentDemoModel
  };
}

function mapDispatchToProps(dispatch) {
  return {
    githubModelActions: bindActionCreators(githubDemoModelActions, dispatch),
    outputComponentDemoModelActions: bindActionCreators(outputComponentDemoModelActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectOutputComponentPage);
