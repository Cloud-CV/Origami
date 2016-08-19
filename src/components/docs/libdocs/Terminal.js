import React from 'react';
import { Link } from 'react-router';
import DocsContent from '../../stateless/cvfylibdocs';

function Terminal() {

  document.body.scrollTop = document.documentElement.scrollTop = 0;

  return (
    <DocsContent>
      <h1 className="ui header">
        Terminal functions
      </h1>

      <div className="ui horizontal divider">
        <hr />
      </div>

      <div className="ui info compact message">
        To use the terminal, it must first be enabled for the app on its registration page.
        <br />
        Go to <Link to="/ngh/user">user profile page</Link> and click on <b>Modify</b> button on the app then select <b>Metadata</b>
        <br />
        thereafter to go to registration page.
        <br />
        Tick the <b>Show Terminal of demo page</b> checkbox here.
      </div>
      <br />

      <div className="ui orange compact message">
        <div className="ui header">
          sendTextArrayToTerminal
        </div>
      </div>
      <br />

      <b>cvfy.sendTextArrayToTerminal()</b> allows you to send text feedback to a terminal style interface on the demo page.
      <br />
      This text data can be sent at any time (before or after the request processing is complete).
      <br />
      Each element of the array will be put on a newline in the terminal.

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
          All components
        </li>
      </ul>

      <div className="ui success compact message">
        An example can bee seen at this <a href="https://gist.github.com/tocttou/403196805e33af9d7fe0900e7ee5c4c2">gist</a>.
      </div>


    </DocsContent>
  );
}

export default Terminal;

