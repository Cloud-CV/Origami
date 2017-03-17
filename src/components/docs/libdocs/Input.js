import React from 'react';
import DocsContent from '../../stateless/cvfylibdocs';

function Input() {

  document.body.scrollTop = document.documentElement.scrollTop = 0;

  return (
    <DocsContent>
      <h1 className="ui header">
        Input functions
      </h1>

      <div className="ui horizontal divider">
        <hr />
      </div>

      <div className="ui orange compact message">
        <div className="ui header">
          getTextArray
        </div>
      </div>
      <br />

      <h4 className="ui header">
        Arguments:
      </h4>
      <ul className="list">
        <li>
          None
        </li>
      </ul>

      <h4 className="ui header">
        Returns:
      </h4>
      <ul className="list">
        <li>
          Array of text elements
        </li>
      </ul>

      <br />
      This function works with:
      <br />
      <ul className="list">
        <li>
          Text Input Component
        </li>
        <br />
        <li>
          Text Image Input Component
        </li>
      </ul>

      <div className="ui success compact message">
        An example can bee seen at this <a href="https://gist.github.com/tocttou/ceae739c32855a657546aa8420c4bbb7">gist</a>.
      </div>

      <br />

      <div className="ui orange compact message">
        <div className="ui header">
          getImageArray
        </div>
      </div>
      <br />

      <h4 className="ui header">
        Arguments:
      </h4>
      <ul className="list">
        <li>
          Mode (String)
          <br /><br />

          <ul className="list">
            <li>
              <h4 className="ui header">
                file_path
              </h4>
              <ul className="list">
                <li>
                  Returns an array of local paths to the uploaded images. This is the <strong>default</strong> mode.
                </li>
                <br />
                <li>
                  <div className="ui success compact message">
                    An example can be seen at this <a href="https://gist.github.com/tocttou/1fd770483294fab36cd17a163e21c4c9">gist</a>.
                  </div>
                </li>
              </ul>
            </li>
          </ul>
          <br />

          <ul className="list">
            <li>
              <h4 className="ui header">
                numpy_array
              </h4>
              <ul className="list">
                <li>
                  Returns an Array/Tuple of the uploaded images as "numpy array" elements (like the image objects used in OpenCV)
                </li>
                <br />
                <li>
                  <div className="ui success compact message">
                    An example can be seen at this <a href="https://gist.github.com/AvaisP/85b74c1a76c79bae0003c0a685b7eb95">gist</a>.
                  </div>
                </li>
              </ul>
            </li>
          </ul>

        </li>
      </ul>

      <h4 className="ui header">
        Returns:
      </h4>
      <ul className="list">
        <li>
          Array of "local path of images" in text obtained after saving images to disk receievd from CVFY webapp.
        </li>
      </ul>

      <br />
      This function works with:
      <br />
      <ul className="list">
        <li>
          Image Input Component
        </li>
        <br />
        <li>
          Text Image Input Component
        </li>
      </ul>

      <div className="ui success compact message">
        An example can be seen at this <a href="https://gist.github.com/tocttou/1fd770483294fab36cd17a163e21c4c9">gist</a>.
      </div>

      <br />
      <div className="ui info compact message">
        <div className="ui header">
          Hybrid components that require multiple types of Input (like Text Image input component)
        </div>
        <br />
        Such components require usage of multiple functions at once.
        <br />
        For example, for Text Image Input component,
        <br />
        <div className="ui success compact message">
          all_text = cvfy.getTextArray()
          <br />
          all_image_paths = cvfy.getImageArray()
        </div>
      </div>

    </DocsContent>
  );
}

export default Input;

