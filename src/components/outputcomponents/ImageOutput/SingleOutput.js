/*eslint-disable react/forbid-prop-types */
import React, { PropTypes } from 'react';
import LinearProgress from 'material-ui/LinearProgress';
import Dialog from 'material-ui/Dialog';

class singleOutput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.showImageFull = this.showImageFull.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  showImageFull() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  render() {
    return (
      <div className="ui card centered"
           style={{ height: '100%', width: '75%' }}
           id={`output-text-${this.props.index}`}
      >
        <div className="content">
          <div className="header">{this.props.header}</div>
        </div>
        <div className="content">
          <div className="ui small feed">
            <div className="event">
              <div className="content">
                <div className="center aligned summary">
                  {this.props.data ?
                    <img className="ui centered center aligned fluid large image"
                         style={{ cursor: 'pointer' }}
                         src={this.props.data}
                         onClick={this.showImageFull}
                    />
                    :
                    <LinearProgress mode="indeterminate" />}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Dialog
          title={this.props.header}
          modal={false}
          open={this.state.open}
          autoScrollBodyContent
          onRequestClose={this.handleClose}
        >
          <div className="ui blue segment row">
            <img className="ui centered center aligned fluid large image"
                 src={this.props.data}
            />
          </div>
        </Dialog>
      </div>
    );
  }
}

singleOutput.propTypes = {
  header: PropTypes.string.isRequired,
  data: PropTypes.any,
  index: PropTypes.number.isRequired
};

export default singleOutput;
