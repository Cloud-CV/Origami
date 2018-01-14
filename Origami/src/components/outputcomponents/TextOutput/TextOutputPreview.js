import React from 'react';
import { PropTypes } from 'prop-types';
import TextOutput from './TextOutput';
import OutputPreview from '../BaseOutputComponent/OutputPreview.js';

class TextOutputPreview extends OutputPreview {
  render() {
    return (
      <TextOutput
        headers={this.state.headers}
        calling_context="demo"
        data={new Array(this.state.headers.length).fill(
          'Text Output sent from your code!'
        )}
      />
    );
  }
}

TextOutputPreview.propTypes = {
  functions: PropTypes.object.isRequired,
};

export default TextOutputPreview;
