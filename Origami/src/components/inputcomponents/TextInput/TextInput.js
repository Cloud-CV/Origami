import React from "react";
import { PropTypes } from "prop-types";
import SingleInput from "./TextSingleInput";
import RaisedButton from "material-ui/RaisedButton";
import toastr from "toastr";

class TextInput extends React.Component {
  constructor(props) {
    super(props);
    this.sendRequest = this.sendRequest.bind(this);
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

    const form_data = new FormData($("#send-text")[0]);

    if (calling_context === "demo") {
      let timeout1 = "";
      let timeout2 = "";
      let timeout3 = "";
      $("#appbar-progress")
        .css("visibility", "visible")
        .promise()
        .done(() => {
          $("#appbar-progress").progress({
            percent: "33%"
          });
          timeout1 = setTimeout(() => {
            $("#appbar-progress").progress({
              percent: "50%"
            });
          }, 300);
          timeout2 = setTimeout(() => {
            $("#appbar-progress").progress({
              percent: "65%"
            });
          }, 600);
          timeout3 = setTimeout(() => {
            $("#appbar-progress").progress({
              percent: "85%"
            });
          }, 1000);
        });
      $.ajax({
        type: "POST",
        url: sendAddr,
        data: form_data,
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
          setTimeout(() => {
            $("#appbar-progress").css("visibility", "hidden");
            $("#appbar-progress").progress({
              percent: "0%"
            });
          }, 1000);
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

  render() {
    return (
      <div className="ui centered center aligned grid">
        <form id="send-text" className="six wide stackable stretched ui input">
          <div key={Math.random()}>
            <br />
            <br />
            {this.props.labels.map((label, index) => [
              <SingleInput
                key={Math.random()}
                index={index}
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

TextInput.propTypes = {
  labels: PropTypes.array.isRequired,
  calling_context: PropTypes.string.isRequired,
  sendAddr: PropTypes.string.isRequired,
  socketId: PropTypes.string
};

export default TextInput;
