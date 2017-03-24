import React from "react";
import DocsContent from "../../stateless/webappgettingstarted";

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
        <div className="header">
          A root user is created for an installation of CVFY.
        </div>
      </div>

      <h3 className="ui header">
        CVFY requires some configuration before it can connect to Github.
      </h3>

      <h4>
        A video guide for this can be found
        {" "}
        <a href="https://youtu.be/V-cQQdM4HzE">here</a>
        .
      </h4>

      <div className="ui orange compact message">
        <h3 className="ui header">
          Step 1: Create a Github developer application
        </h3>
      </div>

      <ui className="list">
        <li>
          Go to
          {" "}
          <a href="https://github.com/settings/developers">
            Github Developer Applications
          </a>
          {" "}
          page
          and "Register a new application" and enter the application details.
        </li>
        <br />
        <li>
          <h5 className="ui header">Application Name</h5>
          <ul className="list">
            <li>
              Choose a suitable name for your application.
            </li>
          </ul>
        </li>
        <br />

        <li>
          <h5 className="ui header">Homepage URL</h5>
          <ul className="list">
            <li>
              This is the base-URL of CVFY application.
              This is the URL where this webapp is running.
              <br />
              For local deployments on default port, it is
              {" "}
              <b>"http://0.0.0.0:5001/"</b>
              .
              <br />
              <div className="ui positive compact message">
                For the current CVFY installation, it is
                {" "}
                <b>
                  "{`${window.location.protocol}//${window.location.host}/`}"
                </b>
                .
              </div>
            </li>
          </ul>
        </li>

        <li>
          <h5 className="ui header">Application description</h5>
          <ul className="list">
            <li>
              Choose a suitable description for your application.
            </li>
          </ul>
        </li>
        <br />

        <li>
          <h5 className="ui header">Authorization callback URL</h5>
          <ul className="list">
            <li>
              This URL is <b>Homepage URL + "/auth/github/callback"</b>.
              <br />
              For local deployments on default port, it is
              {" "}
              <b>"http://0.0.0.0:5001/auth/github/callback"</b>
              .
              <br />
              <div className="ui positive compact message">
                For the current CVFY installation, it is
                {" "}
                <b>
                  "
                  {
                    `${window.location.protocol}//${window.location.host}/auth/github/callback`
                  }
                  "
                </b>
                .
              </div>
            </li>
          </ul>
        </li>

        <h5>
          Now click on the "Register application" button to register this application.
        </h5>
        <h5>
          On the subsequent page, note down the
          {" "}
          <b>Client ID</b>
          {" "}
          and
          {" "}
          <b>Client Secret</b>
          .
        </h5>

      </ui>

      <div className="ui orange compact message">
        <h3 className="ui header">
          Step 2: Input details of Github application on initial setup page.
        </h3>
      </div>

      <div>
        This page is visible when the owner of this CVFY installation runs this application for the first time
        <br />
        and then tries to Login or clicks on "Create a Demo".
      </div>

      <h4 className="ui header">
        Following inputs are required:
      </h4>

      <ul className="list">

        <li>
          <h5 className="ui header">Root user's Github username</h5>
          <ul className="list">
            <li>
              This is the Github username of the person who is the owner of this CVFY installation.
            </li>
          </ul>
        </li>

        <br />

        <li>
          <h5 className="ui header">Github Client ID</h5>
          <ul className="list">
            <li>
              This is the "Client ID" noted down in Step 1.
            </li>
          </ul>
        </li>

        <br />

        <li>
          <h5 className="ui header">Github Client Secret</h5>
          <ul className="list">
            <li>
              This is the "Client Secret" noted down in Step 1.
            </li>
          </ul>
        </li>

        <br />

        <li>
          <h5 className="ui header">Application IP address</h5>
          <ul className="list">
            <li>
              This is the IP address (or domain name) where the CVFY webapp is running.
              <br />
              It is pre-filled with the value for current installation ie "
              {window.location.hostname}
              ".
            </li>
          </ul>
        </li>

        <br />

        <li>
          <h5 className="ui header">Allow new users</h5>
          <ul className="list">
            <li>
              A root user can forbid other users (those who want to make demos) of this application from using it.
              <br />
              In that case, only the root user can login and create demos.
            </li>
          </ul>
        </li>

        <br />

        <li>
          <h5 className="ui header">Is this deployment by CloudCV</h5>
          <ul className="list">
            <li>
              Check this option if the deployment is by CloudCV. This adds some customizations.
            </li>
          </ul>
        </li>

      </ul>
      <div className="ui horizontal divider">
        <hr />
      </div>
      <h3 className="ui header">
        CVFY requires a Dropbox App key if you intend to allow users to download/upload from Dropbox
      </h3>
      <div className="ui blue compact message">
        <h3 className="ui header">
          Create a Dropbox developer application
        </h3>
      </div>
      <ui className="list">
        <li>
          Go to
          {" "}
          <a href="https://www.dropbox.com/developers">
            Dropbox Developers Page
          </a>
          {" "}
          page
          and click on "Create your app".
        </li>
        <br />
        <li>
          In step 1, choose the Dropbox API
        </li>
        <br />
        <li>
          In step 2, select Full Dropbox. This allows the app access to the users full dropbox.
        </li>
        <br />
        <li>
          Now, Name your app and click on create app. The name needs to be unique.
        </li>
        <br />
        <li>
          Once the app is created, Dropbox redirects you to its configuration page. Note down the App Key
        </li>
        <br />
        <li>
          Also, find Chooser/Saver domains and add the domains
          <ul className="list">
            <li>
              0.0.0.0
            </li>
            <li>
              localhost
            </li>
            <li>
              cvfy.cloudcv.org
            </li>
          </ul>
        </li>
        <br />
        <li>
          Paste the App Key into <b>outCalls/config.js</b>.
        </li>
        <br />
      </ui>
    </DocsContent>
  );
}

export default Configuration;
