import React from "react";
import DocsContent from "../../stateless/cvfylibdocs";

function Output() {
  document.body.scrollTop = (document.documentElement.scrollTop = 0);

  return (
    <DocsContent>
      <h1 className="ui header">
        Output functions
      </h1>

      <div className="ui horizontal divider">
        <hr />
      </div>

      <div className="ui orange compact message">
        <div className="ui header">
          sendTextArray
        </div>
      </div>
      <br />

      sendTextArray injects an array of text into fields in Output component.

      <h4 className="ui header">
        Arguments:
      </h4>
      <ul className="list">
        <li>
          Array/Tuple of text elements
        </li>
      </ul>

      <h4 className="ui header">
        Returns:
      </h4>
      <ul className="list">
        <li>
          None
        </li>
      </ul>
      <br />

      This function works with:
      <br />

      <ul className="list">
        <li>
          Text Output Component
        </li>
      </ul>
      <br />

      <div className="ui success compact message">
        An example can bee seen at this
        {" "}
        <a
          href="https://gist.github.com/tocttou/da35d86376f134d232907d626bccee9e"
        >
          gist
        </a>
        .
      </div>

      <br />

      <div className="ui orange compact message">
        <div className="ui header">
          sendImageArray
        </div>
      </div>
      <br />

      <b>cvfy.sendImageArray()</b>
      {" "}
      injects an array of images into fields in Output component.
      <br />

      <h4 className="ui header">
        Arguments:
      </h4>
      <ul className="list">
        <li>
          Array/Tuple of image data objects. These data objects can be of multiple types depending upon the mode.
        </li>
        <br />
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
                  Array/Tuple of "local path of images on the disk" in text
                </li>
                <br />
                <li>
                  <div className="ui success compact message">
                    An example can be seen at this
                    {" "}
                    <a
                      href="https://gist.github.com/tocttou/591d28bb89641ba7b94783687be65fdb"
                    >
                      gist
                    </a>
                    .
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
                  Array/Tuple of "numpy array" elements (like the image objects used in OpenCV)
                </li>
                <br />
                <li>
                  <div className="ui success compact message">
                    An example can be seen at this
                    {" "}
                    <a
                      href="https://gist.github.com/tocttou/58ef4c77d06c0190443ec721e1a233d4"
                    >
                      gist
                    </a>
                    .
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
          None
        </li>
      </ul>
      <br />

      This function works with:
      <br />
      <ul className="list">
        <li>
          Image Output Component
        </li>
      </ul>

      <br />

      <div className="ui orange compact message">
        <div className="ui header">
          sendGraphArray
        </div>
      </div>
      <br />

      <b>cvfy.sendGraphArray()</b>
      {" "}
      injects an array of plot data into graph in Output component.
      <br />

      <h4 className="ui header">
        Arguments:
      </h4>
      <ul className="list">
        <li>
          Array/Tuple of "arrays of plot dictionaries". Each entry in these arrays of plot dictionaries
          <br />
          have two keys, 'x' and 'y' which take different values depending upon the type of graph.
        </li>
        <br />
        <li>
          Type of Graph
          <br /><br />

          <ul className="list">
            <li>
              <h4 className="ui header">
                Bar Graph
              </h4>
              <ul className="list">
                <li>
                  x: INTEGER
                  <br />
                  y: INTEGER
                  <br />
                  <h4>
                    'x' and 'y' correspond to X-Axis and Y-Axis on the graph.
                  </h4>
                </li>
                <br />
                <li>
                  <div className="ui success compact message">
                    An example can be seen at this
                    {" "}
                    <a
                      href="https://gist.github.com/tocttou/f82f730be453f872395c5f30df89b763"
                    >
                      gist
                    </a>
                    .
                  </div>
                </li>
              </ul>
            </li>
          </ul>
          <br />

          <ul className="list">
            <li>
              <h4 className="ui header">
                Scatter Graph
              </h4>
              <ul className="list">
                <li>
                  x: INTEGER
                  <br />
                  y: INTEGER
                  <br />
                  <h4>
                    'x' and 'y' correspond to X-Axis and Y-Axis on the graph.
                  </h4>
                </li>
                <br />
                <li>
                  <div className="ui success compact message">
                    An example can be seen at this
                    {" "}
                    <a
                      href="https://gist.github.com/tocttou/f82f730be453f872395c5f30df89b763"
                    >
                      gist
                    </a>
                    .
                  </div>
                </li>
              </ul>
            </li>
          </ul>
          <br />

          <ul className="list">
            <li>
              <h4 className="ui header">
                Area Graph
              </h4>
              <ul className="list">
                <li>
                  x: INTEGER
                  <br />
                  y: INTEGER
                  <br />
                  <h4>
                    'x' and 'y' correspond to X-Axis and Y-Axis on the graph.
                  </h4>
                </li>
                <br />
                <li>
                  <div className="ui success compact message">
                    An example can be seen at this
                    {" "}
                    <a
                      href="https://gist.github.com/tocttou/f82f730be453f872395c5f30df89b763"
                    >
                      gist
                    </a>
                    .
                  </div>
                </li>
              </ul>
            </li>
          </ul>
          <br />

          <ul className="list">
            <li>
              <h4 className="ui header">
                Pie Chart
              </h4>
              <ul className="list">
                <li>
                  x: STRING
                  <br />
                  y: INTEGER
                  <br />
                  <h4>
                    'x' correponds to the sectio name, 'y' correponds to share of that section in the pie.
                  </h4>
                </li>
                <br />
                <li>
                  <div className="ui success compact message">
                    An example can be seen at this
                    {" "}
                    <a
                      href="https://gist.github.com/tocttou/c0885ce4077d972765b00c56f79b5445"
                    >
                      gist
                    </a>
                    .
                  </div>
                </li>
              </ul>
            </li>
          </ul>
          <br />

        </li>
      </ul>

      <h4 className="ui header">
        Returns:
      </h4>
      <ul className="list">
        <li>
          None
        </li>
      </ul>
      <br />

      This function works with:
      <br />
      <ul className="list">
        <li>
          Bar Graph Output Component
        </li>
        <li>
          Scatter Graph Component
        </li>
        <li>
          Area Graph Component
        </li>
        <li>
          Pie Chart Component
        </li>
      </ul>

    </DocsContent>
  );
}

export default Output;
