import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as holderActions from '../../actions/holderActions';
import toastr from 'toastr';
import MenuItem from 'material-ui/MenuItem';
import Drawer from 'material-ui/Drawer';
import LinearProgress from 'material-ui/LinearProgress';

toastr.options.closeButton = true;

class HolderPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      holder: [],
      open: false,
      completed: 0
    };

    this.sumOfArray = this.sumOfArray.bind(this);
    this.addMoreToHolder = this.addMoreToHolder.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    this.timer = setTimeout(() => this.progress(5), 1000);
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.holder != nextProps.holder) {
      this.setState({holder: Object.assign([], nextProps.holder)});
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  progress(completed) {
    if (completed > 100) {
      this.setState({completed: 100});
    } else {
      this.setState({completed});
      const diff = Math.random() * 10;
      this.timer = setTimeout(() => this.progress(completed + diff), 1000);
    }
  }

  handleToggle(){
    this.setState({open: !this.state.open});
  }

  handleClose(){
    this.setState({open: false});
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
        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}>
          <MenuItem onTouchTap={this.handleClose}>Menu Item</MenuItem>
          <MenuItem onTouchTap={this.handleClose}>Menu Item 2</MenuItem>
        </Drawer>
        <div onClick={this.addMoreToHolder} className="ui labeled button" tabIndex="0" onTouchTap={this.handleToggle}>
          <div className="ui blue button">
            <i className="pointing up icon"></i> Click Me
          </div>
          <a className="ui basic blue left pointing label">
            {this.sumOfArray(this.props.holder) || 0}
          </a>
        </div>
        <LinearProgress mode="determinate" value={this.state.completed} />
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
