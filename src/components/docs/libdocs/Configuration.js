import React from "react";
import DocsContent from "../../stateless/cvfylibdocs";

function Configuration() {
  document.body.scrollTop = (document.documentElement.scrollTop = 0);

  return (
    <DocsContent>
      <h1 className="ui header">
        Configuration
      </h1>

      <div className="ui horizontal divider">
        <hr />
      </div>

      <div className="ui info compact message">
        <div className="ui header">
          CVFY-lib supports python2 (on OSX and Linux) only as of now.
        </div>
      </div>

      <ul className="list">
        <li>
          Download
          {" "}
          <b>cvfy.py</b>
          {" "}
          from
          {" "}
          <a href="https://github.com/batra-mlp-lab/cvfy-lib">Github repo</a>
          {" "}
          to
          your projects root directory (where the launcher python script is).
        </li>
        <br />
        <li>
          <h4 className="ui header">
            CVFY-lib requires installation of some additional packages:
          </h4>
          <ul className="list">
            <li>
              <div className="ui success compact message">
                sudo apt install python-pip python-dev python-numpy python-opencv
              </div>
            </li>
            <br />
            <li>
              CVFY-lib has a file
              {" "}
              <b>requirements.txt</b>
              {" "}
              that contains dependency python packages.
              <br />
              <div className="ui success compact message">
                pip install -r requirements.txt
              </div>
            </li>
          </ul>
        </li>
      </ul>

    </DocsContent>
  );
}

export default Configuration;
