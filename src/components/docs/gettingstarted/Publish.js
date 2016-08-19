import React from 'react';
import { Link } from 'react-router';
import DocsContent from '../../stateless/webappgettingstarted';

function Publish() {

  document.body.scrollTop = document.documentElement.scrollTop = 0;

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
          The demo can be accessed by clicking on <b>Demo</b> button on the app on <Link to="/ngh/user">user profile page</Link>.
        </li>
        <br />

        <li>
          A shortened URL for the demo can be created from the <Link to="/ngh/user">user profile page</Link> by clicking
          <br />
          <b>Get permalink</b> on the app.
        </li>
      </ul>

    </DocsContent>
  );
}

export default Publish;
