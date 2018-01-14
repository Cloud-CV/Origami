import React from 'react';
import { PropTypes } from 'prop-types';
import ImageOutput from './ImageOutput';
import OutputPreview from '../BaseOutputComponent/OutputPreview.js';

class ImageOutputPreview extends OutputPreview {
  render() {
    return (
      <ImageOutput
        headers={this.state.headers}
        calling_context="demo"
        data={new Array(this.state.headers.length).fill(
          '/static/img/wireframe.png'
        )}
      />
    );
  }
}

ImageOutputPreview.propTypes = {
  functions: PropTypes.object.isRequired,
};

export default ImageOutputPreview;
