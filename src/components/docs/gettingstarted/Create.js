import React from 'react';
import { Link } from 'react-router';
import DocsContent from '../../stateless/webappgettingstarted';

function Create() {

  document.body.scrollTop = document.documentElement.scrollTop = 0;

  return (
    <DocsContent>
      <h1 className="ui header">
        Creating a new App
      </h1>

      <div className="ui horizontal divider">
        <hr />
      </div>

      <div className="ui orange compact message">
        <h3 className="ui header">
          Step 1: Login and provision an App
        </h3>
      </div>

      <ul className="list">
        <li>
          After the initial setup, click on <b>Create a Demo</b> button on the homepage.
          <ul className="list">
            <li>
              This takes you to github for login. Authorize the application there when asked.
            </li>
            <li>
              Upon successful login, you are taken to the <Link to="/ngh/user">user profile</Link> that lists all his deployed apps.
            </li>
          </ul>
        </li>

        <br />

        <li>
          Click on the <b>+</b> button here to create a new application. This takes you to the <Link to="/ngh/user/register">Registration page</Link>.
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
          If an error box says <b>"This webapp cannot be reached on it's public IP"</b>,
          <br /> you need to check the <b>"Webapp is running locally"</b> checkbox.
          <p>
            Checking this checkbox will make the webapp check local connectivity to itself.
          </p>
        </div>

      </ul>

      <div className="ui success compact message">
        If you see a <b>green "tick" symbol</b> next to the token, your app is configured correctly.
        <br /> Copy this token for use in CVFY-lib and click on "Save" button.
      </div>

      <div className="ui error compact message">
        If you see a <b>red "hand" symbol</b> next to the token, your app is configured incorrectly.
        <br /> You may not be able to connect to your app.
      </div>

    </DocsContent>
  );
}

export default Create;

