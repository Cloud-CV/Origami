/*eslint-disable react/forbid-prop-types */
import React from "react";
import { PropTypes } from "prop-types";
import Dialog from "material-ui/Dialog";
import { VictoryArea, VictoryChart } from "victory";

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
    if (this.props.data instanceof Array && this.props.data.length > 0) {
      const dataToPlot = [];
      this.props.data.map(dataPoint => {
        const pointToPut = Object.assign({}, dataPoint);
        pointToPut.x = parseInt(dataPoint.x, 10);
        pointToPut.y = parseInt(dataPoint.y, 10);
        dataToPlot.push(pointToPut);
      });

      this.setState({ data: dataToPlot });
    }
  }

  showGraphFull() {
        let open=true
    if(this.props.calling_context=="demo2")
      open=false
    this.setState({ open: open });
  }

  handleClose() {
    this.setState({ open: false });
  }

  render() {
    return (
      <div
        className="ui card centered"
        id={`output-text-${this.props.index}`}
        style={{ cursor: "pointer" }}
        onClick={this.showGraphFull}
      >
        <div className="content">
          <div className="header">
            {typeof this.props.header == "object"
              ? this.props.header["label"]
              : this.props.header}
          </div>
        </div>
        <div className="content">
          <div className="ui small feed">
            <div className="event">
              <div className="content">
                <div className="ui very padded text summary">
                  <VictoryChart domainPadding={20}>
                    <VictoryArea
                      style={{
                        data: {
                          fill: "tomato"
                        }
                      }}
                      data={this.state.data}
                      x={"x"}
                      y={"y"}
                    />
                  </VictoryChart>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Dialog
          title={
            typeof this.props.header == "object"
              ? this.props.header["label"]
              : this.props.header
          }
          modal={false}
          open={this.state.open}
          autoScrollBodyContent
          onRequestClose={this.handleClose}
        >
          <div className="ui row">
            <VictoryChart domainPadding={20}>
              <VictoryArea
                style={{
                  data: {
                    fill: "tomato"
                  }
                }}
                data={this.state.data}
                x={"x"}
                y={"y"}
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
  data: PropTypes.any
};

export default singleOutput;
