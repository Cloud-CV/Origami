import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as holderActions from '../../actions/holderActions';
import RaisedButton from 'material-ui/RaisedButton';
import toastr from 'toastr';

toastr.options.closeButton = true;

class HolderPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      holder: []
    };

    this.sumOfArray = this.sumOfArray.bind(this);
    this.addMoreToHolder = this.addMoreToHolder.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.holder != nextProps.holder) {
      this.setState({holder: Object.assign([], nextProps.holder)});
    }
  }

  sumOfArray(arr) {
    let sum = 0;
    arr.map(element => { sum += element; });
    return sum > 0 ? sum : false;
  }

  addMoreToHolder() {
    this.props.actions.addHolder()
      .then((data) => {
        toastr.success('added new data');
      }).catch((error) => {
      toastr.error('some error occured');
    });
  }

  render() {
    return (
      <div>
        <h1>Holder</h1>
        <div onClick={this.addMoreToHolder}>
          <RaisedButton label={this.sumOfArray(this.props.holder) || 0} >
            <div onClick={this.addMoreToHolder} className="ui labeled button" tabIndex="0">
              <div className="ui blue button">
                <i className="pointing up icon"></i> Click Me
              </div>
            </div>
          </RaisedButton>
        </div>
      </div>
    );
  }
}

HolderPage.propTypes = {
  holder: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    holder: state.holder
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(holderActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HolderPage);
