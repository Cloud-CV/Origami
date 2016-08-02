import React, { PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as nonghDemoModelActions from '../../../actions/nonghDemoModelActions';
import * as outputComponentDemoModelActions from '../../../actions/outputComponentDemoModelActions';
import { getAllOutputComponentsForShowcase } from '../../outputcomponents';
import { getComponentDeployed } from '../../../api/CommonLocal/getComponentDeployed';
import toastr from 'toastr';

toastr.options.closeButton = true;

class SelectOutputComponentPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      userid: parseInt(localStorage.getItem('userid'), 10),
      outputComponentDemoModel: {}
    };
  }

  componentWillMount() {
    getComponentDeployed(this.state.userid, this.props.nonghDemoModel.id, 'output').then((outputComponentSeedData) => {
      if (JSON.parse(outputComponentSeedData).length !== 0) {
        let dataToSeed = {
          id: JSON.parse(outputComponentSeedData)[0].id,
          userid: JSON.parse(outputComponentSeedData)[0].userid,
          baseComponentId: JSON.parse(outputComponentSeedData)[0].baseComponentId,
          props: JSON.parse(outputComponentSeedData)[0].props
        };
        this.setState({ outputComponentDemoModel: dataToSeed });
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.outputComponentDemoModel !== nextProps.outputComponentDemoModel) {
      this.setState({ outputComponentDemoModel: nextProps.outputComponentDemoModel });
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
            <div className="ui three padded column stackable grid" style={{ marginLeft: '3%' }}>
              {getAllOutputComponentsForShowcase({
                demoModel: this.props.nonghDemoModel,
                user: this.props.user,
                outputComponentDemoModel: this.state.outputComponentDemoModel,
                outputComponentDemoModelActions: this.props.outputComponentDemoModelActions,
                forwardAddress:
                  `/ngh/user/${this.props.user.id ||
                  localStorage.getItem('userid')}/${this.props.nonghDemoModel.name}/${this.props.nonghDemoModel.id}/demo`,
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
  nonghDemoModel: PropTypes.object.isRequired,
  outputComponentDemoModel: PropTypes.object.isRequired,
  nonghModelActions: PropTypes.object.isRequired,
  outputComponentDemoModelActions: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    login: state.login,
    user: state.user,
    nonghDemoModel: state.nonghDemoModel,
    outputComponentDemoModel: state.outputComponentDemoModel
  };
}

function mapDispatchToProps(dispatch) {
  return {
    nonghModelActions: bindActionCreators(nonghDemoModelActions, dispatch),
    outputComponentDemoModelActions: bindActionCreators(outputComponentDemoModelActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectOutputComponentPage);
