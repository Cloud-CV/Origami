import React, { PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../actions/userActions';
import * as nonghDemoModelActions from '../../actions/nonghDemoModelActions';
import * as inputComponentDemoModelActions from '../../actions/inputComponentDemoModelActions';
import * as outputComponentDemoModelActions from '../../actions/outputComponentDemoModelActions';
import { getDeployed } from '../../api/Nongh/getDeployed';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import CircularProgress from 'material-ui/CircularProgress';
import CustomCard from '../stateless/cards';
import userRepos from '../../api/Github/userRepos';
import toastr from 'toastr';

toastr.options.closeButton = true;

class NonGHUserProfile extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      user: {},
      showOutput: 'hidden',
      allDeployed: []
    };
    this.socket = this.context.socket;
    this.toggleShow = this.toggleShow.bind(this);
    this.deleteDemo = this.deleteDemo.bind(this);
    this.modifyProject = this.modifyProject.bind(this);
    this.goToDemoPage = this.goToDemoPage.bind(this);
    this.goToRegisterPage = this.goToRegisterPage.bind(this);
  }

  componentWillMount() {
    !this.props.login && browserHistory.push('/');
    this.props.useractions.LoadUser()
      .then(() => {
        getDeployed().then((alldeployedRepos) => {
          this.setState({allDeployed: JSON.parse((alldeployedRepos))});
        }).catch(err => {
          toastr.error(err);
        });
      })
      .catch(err => {
        toastr.error("Error: " + err);
      });
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.user != nextProps.user) {
      this.setState({user: nextProps.user});
    }
  }

  deleteDemo(projectId) {
    this.props.nonghModelActions.killNonGHDemoModel(projectId).then(() => {
      this.props.inputComponentModelActions.killInputComponentModel(projectId);
      this.props.outputComponentDemoModelActions.killOutputComponentModel(projectId);
      getDeployed().then((alldeployedRepos) => {
        this.setState({allDeployed: JSON.parse((alldeployedRepos))});
      }).catch(err => {
        toastr.error(err);
      });
    });
  }

  modifyProject(projectId) {
    alert(projectId);
  }

  goToDemoPage(projectId) {
    alert(projectId);
  }

  goToRegisterPage() {
    browserHistory.push('/ngh/user/register');
  }


  toggleShow() {
    this.setState({showOutput: this.state.showOutput == 'visible' ? 'hidden' : 'visible'});
  }

  render() {
    return (
      <div className="ui relaxed stackable grid fluid container">

        {this.state.showOutput == 'hidden' &&
        <div className="centered row" style={{marginTop: "30vh"}}>
          <CircularProgress size={1.5} />
        </div>}

        {this.state.user &&
        <div className="sixteen column stretched row" style={{visibility: this.state.showOutput}}>

          <div className="four wide column ui raised segment" >
            <img className="ui fluid bottom aligned medium image" onLoad={this.toggleShow}
                 src={this.state.user.avatar_url} />
          </div>

          <div className="seven wide column" >
            <div>
              <div className="row" ><br /><br /><br /><br /><br /></div>
              <div className="row" ><br /><br /></div>
              <h1 className="row">{this.state.user.name}</h1>
              <h3 className="row">{this.state.user.login}</h3>
              <h4 className="row">Prebuilt Projects</h4>
            </div>
          </div>

          <div className="five wide column">
            <div>
              <div className="row" ><br /><br /><br /><br /><br /></div>
              <div className="row" ><br /><br /><br /><br /></div>
              <div className="row" ><br /><br /><br /><br /></div>
              <FloatingActionButton style={{float: "right"}}
                                    onMouseDown={this.goToRegisterPage}>
                <ContentAdd />
              </FloatingActionButton>
            </div>
          </div>

          <span className="ui horizontal divider row"><hr /></span>

          {this.state.allDeployed &&
          <div className="fifteen wide column stretched stackable centered row">
            <div className="ui three padded column stackable grid">
              {this.state.allDeployed.map(project =>
                <CustomCard
                  header={project.name}
                  width="five"
                  centeredParent
                  key={project.id}
                  displayData={[
                      "IP: " + project.token.split(':')[1],
                      "Port: " + project.token.split(':')[4]
                    ]}
                  buttonData={[
                      {
                        label: "Delete",
                        onDeployClick: () => this.deleteDemo(project.id),
                        display: ""
                      },
                      {
                        label: "Modify",
                        onDeployClick: () => this.modifyProject(project.id),
                        display: ""
                      },
                      {
                        label: "Demo",
                        onDeployClick: () => this.goToDemoPage(project.id)
                      }
                    ]}
                />
              )}
            </div>
          </div>
          }

        </div>}


      </div>
    );
  }
}

NonGHUserProfile.propTypes = {
  login: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  inputComponentDemoModel: PropTypes.object.isRequired,
  outputComponentDemoModel: PropTypes.object.isRequired,
  useractions: PropTypes.object.isRequired,
  nonghModelActions: PropTypes.object.isRequired,
  inputComponentModelActions: PropTypes.object.isRequired,
  outputComponentDemoModelActions: PropTypes.object.isRequired
};

NonGHUserProfile.contextTypes = {
  socket: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    login: state.login,
    user: state.user,
    nonghDemoModel: state.nonghDemoModel,
    inputComponentDemoModel: state.inputComponentDemoModel,
    outputComponentDemoModel: state.outputComponentDemoModel
  };
}

function mapDispatchToProps(dispatch) {
  return {
    useractions: bindActionCreators(userActions, dispatch),
    nonghModelActions: bindActionCreators(nonghDemoModelActions, dispatch),
    inputComponentModelActions: bindActionCreators(inputComponentDemoModelActions, dispatch),
    outputComponentDemoModelActions: bindActionCreators(outputComponentDemoModelActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NonGHUserProfile);
