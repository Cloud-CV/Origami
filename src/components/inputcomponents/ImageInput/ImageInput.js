import React, { PropTypes } from 'react';
import SingleInput from './SingleInput';
import RaisedButton from 'material-ui/RaisedButton';
import toastr from 'toastr';

function sendRequest(sendAddr, calling_context) {
  const form_data = new FormData($('#send-text')[0]);
  if (calling_context === "demo") {
    $.ajax({
      type: 'POST',
      url: sendAddr,
      data: form_data,
      contentType: false,
      cache: false,
      processData: false,
      async: true,
      success: data => {
      },
      error: (xhr, textStatus, errorThrown) => {
        toastr.error("Error occurred!");
      }
    });
  }
}

const TextInput = ({labels, calling_context, socketId, sendAddr}) => {
  return (
    <div className="ui centered center aligned grid">
      <form id="send-text" className="six wide stackable stretched ui input" >
        <div key={Math.random()}>
          <br /><br />
          {labels.map((label, index) =>
            [<SingleInput key={Math.random()} index={index} calling_context={calling_context} label={label} />,
              <br key={Math.random()} />,
              <br key={Math.random()} />]
          )}
          <input type="hidden" name="socket-id" value={socketId} />
        </div>
      </form><br />
        <pre className="ui centered center aligned">
          <br />
          <RaisedButton label="Send" primary
                        key={Math.random()}
                        onClick={() => {sendRequest(sendAddr, calling_context);}}/>
        </pre>
    </div>
  );
};

TextInput.propTypes = {
  labels: PropTypes.array.isRequired,
  calling_context: PropTypes.string.isRequired,
  sendAddr: PropTypes.string.isRequired,
  socketId: PropTypes.string
};

export default TextInput;
