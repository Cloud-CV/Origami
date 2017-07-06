import React, { PropTypes } from "react";
import SingleInput from "./SingleInput";
import RaisedButton from "material-ui/RaisedButton";
import toastr from "toastr";

class TextImageInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: []
    };
    this.sendRequest = this.sendRequest.bind(this);
    this.updateFormData = this.updateFormData.bind(this);
  }

  shouldComponentUpdate() {
    return false;
  }

  sendRequest(sendAddr, calling_context) {
    $("#output-outer").animate(
      {
        scrollTop: $("#output-div").offset().top
      },
      1000
    );

    let formData = new FormData($("#send-text")[0]);
    this.state.files.map(file => {
      formData.set(file.newfilename, file.newfile, file.newfilename);
    });

    if (calling_context === "demo") {
      let timeout1 = "";
      let timeout2 = "";
      let timeout3 = "";
      $("#appbar-progress").css("visibility", "visible").promise().done(() => {
        $("#appbar-progress").progress({
          percent: "33%"
        });
        timeout1 = setTimeout(
          () => {
            $("#appbar-progress").progress({
              percent: "50%"
            });
          },
          300
        );
        timeout2 = setTimeout(
          () => {
            $("#appbar-progress").progress({
              percent: "65%"
            });
          },
          600
        );
        timeout3 = setTimeout(
          () => {
            $("#appbar-progress").progress({
              percent: "85%"
            });
          },
          1000
        );
      });
      $.ajax({
        type: "POST",
        url: sendAddr,
        data: formData,
        contentType: false,
        cache: false,
        processData: false,
        async: true,
        success: data => {
          $("#appbar-progress").progress({
            percent: "100%"
          });
          clearTimeout(timeout1);
          clearTimeout(timeout2);
          clearTimeout(timeout3);
          setTimeout(
            () => {
              $("#appbar-progress").css("visibility", "hidden");
              $("#appbar-progress").progress({
                percent: "0%"
              });
            },
            1000
          );
        },
        error: (xhr, textStatus, errorThrown) => {
          $("#appbar-progress").css("visibility", "hidden");
          $("#appbar-progress").progress({
            percent: "0%"
          });
          toastr.error("Error occurred!");
        }
      });
    }
  }

  updateFormData(newfile, newfilename) {
    this.setState({
      files: [...this.state.files, { newfilename, newfile }]
    });
  }

  render() {
    return (
      <div className="ui centered center aligned grid">
        <form id="send-text" className="six wide stackable stretched ui input">
          <div key={Math.random()}>
            <br /><br />
            {this.props.labels.map((label, index) => [
              <SingleInput
                key={Math.random()}
                index={index}
                updateFormData={this.updateFormData}
                calling_context={this.props.calling_context}
                label={label}
              />,
              <br key={Math.random()} />,
              <br key={Math.random()} />
            ])}
            <input type="hidden" name="socket-id" value={this.props.socketId} />
          </div>
        </form>
        <div className="ui row">
          <pre className="ui centered center aligned">
            <br />
            <RaisedButton
              label="Send"
              primary
              key={Math.random()}
              onClick={() => {
                this.sendRequest(
                  this.props.sendAddr,
                  this.props.calling_context
                );
              }}
            />
          </pre>
        </div>
      </div>
    );
  }
}

TextImageInput.propTypes = {
  labels: PropTypes.array.isRequired,
  calling_context: PropTypes.string.isRequired,
  sendAddr: PropTypes.string.isRequired,
  socketId: PropTypes.string
};

export default TextImageInput;
