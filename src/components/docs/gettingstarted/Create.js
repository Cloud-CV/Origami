import React from 'react';
import DocsContent from '../../stateless/webappgettingstarted';

function Create() {
  return (
    <DocsContent>
      <h1 className="ui header">
        Creating a new App
      </h1>

      <div className="ui orange compact message">
        <h3 className="ui header">
          Step 1: Login and provision an App
        </h3>
      </div>

      <ul className="list">
        <li>
          After the initial setup, click on "Create a Demo" button on the homepage.
          <ul className="list">
            <li>
              This takes you to github for login. Authorize the application there when asked.
            </li>
            <li>
              Upon successfull login, you are taken to the user profile that lists all his deployed apps.
            </li>
          </ul>
        </li>

        <br />

        <li>
          Click on the "+" button here to create a new application. This takes you to the Registration page.
        </li>
      </ul>

      <div className="ui orange compact message">
        <h3 className="ui header">
          Step 2: Create an App
        </h3>
      </div>

      <h4 className="ui header">
        Following inputs are required:
      </h4>

      <ul className="list">

        <li>
          <h5 className="ui header">Appname</h5>
          <ul className="list">
            <li>
              This is the name of your application. This appears on the top of demo page.
            </li>
          </ul>
        </li>

        <br />

        <li>
          <h5 className="ui header">IP of service</h5>
          <ul className="list">
            <li>
              This is the IP address of the system that <i>will</i> be running your machine learning code using CVFY-lib.
              <br />
              For local deployments, it is <b>0.0.0.0</b>.
            </li>
          </ul>
        </li>

        <br />

        <li>
          <h5 className="ui header">Port for service</h5>
          <ul className="list">
            <li>
              This is the preferred port for the service (machine learning code).
              <br />
              <b>This port must be free for CVFY-lib to work.</b>
            </li>
          </ul>
        </li>

        <br />

        <li>
          <h5 className="ui header">Description (optional)</h5>
          <ul className="list">
            <li>
              Description for your application. This will be displayed below the application name of demo page.
            </li>
          </ul>
        </li>

        <br />

        <li>
          <h5 className="ui header">Show Terminal on demo page</h5>
          <ul className="list">
            <li>
              This displays a <b>Terminal</b> style text box below the I/O components on the demo page.
              <br />
              Additional data can be sent to this terminal using CVFY-lib.
            </li>
          </ul>
        </li>

        <div className="ui yellow compact message">
          <h3 className="ui header">
            If an error box says "This webapp cannot be reached on it's public IP",
            <br /> you need to check the "Webapp is running locally" checkbox.
          </h3>
          Checking this checkbox will make the webapp check local connectivity to itself.
        </div>

      </ul>

      <div className="ui success compact message">
        <h3 className="ui header">
          If you see a green "tick" symbol next to the token, your app is configured correctly.
          <br /> Copy this token for use in CVFY-lib and click on "Save" button.
        </h3>
      </div>

      <div className="ui error compact message">
        <h3 className="ui header">
          If you see a red "hand" symbol next to the token, your app is configured incorrectly.
          <br /> You may not be able to connect to your app.
        </h3>
      </div>

    </DocsContent>
  );
}

export default Create;

