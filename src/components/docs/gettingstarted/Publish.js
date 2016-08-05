import React from 'react';
import DocsContent from '../../stateless/webappgettingstarted';

function Publish() {
  return (
    <DocsContent>
      <h1 className="ui header">
        Publishing a demo
      </h1>

      <div className="ui horizontal divider">
        <hr />
      </div>

      <div className="ui info compact message">
        <div className="header">
          A demo is published as soon as the app is registered.
        </div>
      </div>

      <ul className="list">
        <li>
          The demo can be accessed by clicking on <b>Demo</b> button on the app on user profile page.
        </li>
        <br />

        <li>
          A shortened URL for the demo can be created from the user profile page by clicking
          <br />
          <b>Get permalink</b> on the app.
        </li>
      </ul>

    </DocsContent>
  );
}

export default Publish;
