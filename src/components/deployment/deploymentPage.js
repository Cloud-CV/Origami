import React, { PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getRepo, checkDockerfile } from '../../api/Github/getOneRepo';
import * as loginActions from '../../actions/loginActions';
import * as userActions from '../../actions/userActions';
import CircularProgress from 'material-ui/CircularProgress';
import toastr from 'toastr';

toastr.options.closeButton = true;

class DeploymentPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      showOutput: 'hidden',
      currentRepo: {}
    };
    this.toggleShow = this.toggleShow.bind(this);
  }

  componentWillMount() {
    getRepo(this.props.user.login, this.props.params.repoId)
      .then(currentRepo => {
        this.setState({currentRepo: JSON.parse(currentRepo)});
      }).then(() => {
        this.toggleShow();
      }).then(() => {
        checkDockerfile(this.props.user.login, this.props.params.repoId).then(status => {
        }).catch(err => {
          toastr.error(err);
        });
      })
      .catch(err => {
        toastr.error(err);
      });
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.currentRepo != nextProps.currentRepo) {
      this.setState({currentRepo: nextProps.currentRepo});
    }
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

        {this.state.currentRepo &&
        <div className="sixteen column stretched row" style={{visibility: this.state.showOutput}}>
          {this.state.currentRepo.name}
        </div>}


      </div>
    );
  }
}

DeploymentPage.propTypes = {
  login: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  loginactions: PropTypes.object.isRequired,
  useractions: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    login: state.login,
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loginactions: bindActionCreators(loginActions, dispatch),
    useractions: bindActionCreators(userActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DeploymentPage);
