import React, { PropTypes } from 'react';
import SingleInput from './SingleInput';
import RaisedButton from 'material-ui/RaisedButton';
import toastr from 'toastr';

function sendRequest(sendAddr, context) {
  const form_data = new FormData($('#send-text')[0]);
  if (context === "demo") {
    $.ajax({
      type: 'POST',
      url: sendAddr,
      data: form_data,
      contentType: false,
      cache: false,
      processData: false,
      async: false,
      success: data => {
      },
      error: (xhr, textStatus, errorThrown) => {
        toastr.error("Error occurred!");
      }
    });
  }
}

const TextInput = ({labels, context, sendAddr}) => {
  return (
    <div>
      <form id="send-text" className="six wide stackable stretched ui input" >
        <div key={Math.random()}>
          <br /><br />
          {labels.map((label, index) =>
            [<SingleInput key={Math.random()} index={index} label={label} />,
              <br key={Math.random()} />,
              <br key={Math.random()} />]
          )}
        </div>
      </form><br />
      <pre className="ui left aligned">
              <RaisedButton label="Send" primary
                            key={Math.random()}
                            onClick={() => {sendRequest(sendAddr, context);}}/>
      </pre>
    </div>
  );
};

TextInput.propTypes = {
  labels: PropTypes.array.isRequired,
  context: PropTypes.string.isRequired,
  sendAddr: PropTypes.string.isRequired
};

export default TextInput;
