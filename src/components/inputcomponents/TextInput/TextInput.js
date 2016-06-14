import React, { PropTypes } from 'react';
import SingleInput from './SingleInput';
import RaisedButton from 'material-ui/RaisedButton';


function sendRequest(sendAddr) {
  const form_data = new FormData($('#send-text')[0]);
  let that = this;
  $.ajax({
    type: 'POST',
    url: sendAddr,
    data: form_data,
    contentType: false,
    cache: false,
    processData: false,
    async: false,
    success: function(data) {
      alert(data);
    }
  });
}

const TextInput = ({labels, sendAddr}) => {
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
      <RaisedButton label="Send" primary
                    key={Math.random()}
                    onClick={() => {sendRequest(sendAddr);}}/>
    </div>
  );
};

TextInput.propTypes = {
  labels: PropTypes.array.isRequired,
  sendAddr: PropTypes.string.isRequired
};

export default TextInput;
