import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as loginActions from '../../actions/loginActions';

class HomePage extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div className="ui relaxed center aligned stackable grid container">
        <div className="three column stretched row">
          <div className="column"><div className="ui raised fluid padded text container segment">
            Browse Demos
          </div></div>
          {this.props.login &&
            <div className="column"><div className="ui raised fluid padded text container segment">
              <Link to={this.props.login ? '/user/build' : '/'}
                    style={{textDecoration: 'none', color: "inherit"}}>
                Build Demos
              </Link>
            </div></div>
          }
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  actions: PropTypes.object.isRequired,
  login: PropTypes.bool.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    login: state.login
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(loginActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

