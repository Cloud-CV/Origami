import React from 'react';
import DocsContent from '../../stateless/webappgettingstarted';

function Modify() {
  return (
    <DocsContent>
      <h1 className="ui header">
        Modifying an App
      </h1>

      <div className="ui horizontal divider">
        <hr />
      </div>

      <div className="ui orange compact message">
        <h3 className="ui header">
          Modifying
        </h3>
      </div>

      <ul className="list">
        <li>
          Registration data and I/O components can be modified later on as well from the user profile page
          <br />
          by clicking on <b>Modify</b> button on the component and then in the modal that appears:
        </li>
        <br />

        <li>
          <h5 className="ui header">
            Modify Registration data
          </h5>
          <ul className="list">
            Click on "Metadata"
          </ul>
        </li>
        <br />

        <li>
          <h5 className="ui header">
            Modify Input data
          </h5>
          <ul className="list">
            Click on "Input"
          </ul>
        </li>
        <br />

        <li>
          <h5 className="ui header">
            Modify Output data
          </h5>
          <ul className="list">
            Click on "Output"
          </ul>
        </li>

      </ul>

      <div className="ui orange compact message">
        <h3 className="ui header">
          Deleting
        </h3>
      </div>

      <ul className="list">
        <li>
          An application can be deleted by visiting the user profile page and clicking on
          <br />
          <b>Delete</b> button on the component.
        </li>
      </ul>

    </DocsContent>
  );
}

export default Modify;
