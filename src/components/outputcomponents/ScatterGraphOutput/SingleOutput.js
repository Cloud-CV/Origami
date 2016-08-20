/*eslint-disable react/forbid-prop-types */
import React, { PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import { VictoryScatter, VictoryChart } from 'victory';

class singleOutput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      data: []
    };
    this.showGraphFull = this.showGraphFull.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentWillMount() {
    this.xAxis = 'xaxis';
    this.yAxis = 'yaxis';

    if (this.props.data instanceof Array && this.props.data.length > 0) {
      this.xAxis = Object.keys(this.props.data[0])[0];
      this.yAxis = Object.keys(this.props.data[0])[1];

      const dataToPlot = [];
      this.props.data.map((dataPoint) => {
        const pointToPut = {};
        Object.keys(dataPoint).map((key) => {
          pointToPut[key] = parseInt(dataPoint[key], 10);
        });
        dataToPlot.push(pointToPut);
      });

      this.setState({ data: dataToPlot });

    }
  }

  showGraphFull() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  render() {
    return (
      <div className="ui card centered"
           id={`output-text-${this.props.index}`}
           style={{ cursor: 'pointer' }}
           onClick={this.showGraphFull}
      >
        <div className="content">
          <div className="header">{this.props.header}</div>
        </div>
        <div className="content">
          <div className="ui small feed">
            <div className="event">
              <div className="content">
                <div className="ui very padded text summary">
                  <VictoryChart domainPadding={20}>
                    <VictoryScatter
                      style={{
                        data: {
                          fill: 'tomato'
                        }
                      }}
                      data={this.state.data}
                      x={this.xAxis}
                      y={this.yAxis}
                    />
                  </VictoryChart>
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
          <div className="ui row">
            <VictoryChart domainPadding={20}>
              <VictoryScatter
                style={{
                  data: {
                    fill: 'tomato'
                  }
                }}
                data={this.state.data}
                x={this.xAxis}
                y={this.yAxis}
              />
            </VictoryChart>
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
