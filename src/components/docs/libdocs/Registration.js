import React from 'react';
import { Link } from 'react-router';
import DocsContent from '../../stateless/cvfylibdocs';

function Registration() {
  return (
    <DocsContent>
      <h1 className="ui header">
        Registration
      </h1>

      <div className="ui horizontal divider">
        <hr />
      </div>

      <div className="ui info compact message">
        <div className="ui header">
          CVFY-lib registration requires a TOKEN from the CVFY webapp.
        </div>
        <ul>
          <li>
            This TOKEN can be copied from the registration page of the application.
          </li>
          <li>
            Or by clicking <b>Get Token</b> on the app on <Link to="/user/ngh">user profile page</Link>.
          </li>
        </ul>
      </div>
      <br />

      <div className="ui orange compact message">
        <div className="ui header">
          For a complete example, see this <a href="https://gist.github.com/tocttou/021c51a9055dea0ac002b7657c01fc25">Gist</a>.
        </div>
      </div>

      <ul className="list">
        <li>
          <b>cvfy.py</b> is imported to the launcher python script.
          <br />
          <div className="ui success compact message">
            import cvfy
          </div>
        </li>
        <br />
        <li>
          CVFY-lib is registered with:
          <br />
          <div className="ui success compact message">
            app = cvfy.register($TOKEN)
          </div>
          <br />
          Note that <b>$TOKEN</b> here is replaced by the TOKEN obtained from CVFY webapp.
        </li>
        <br />
        <li>
          CVFY-lib requires a main function that is executed when a request is received.
          <br />
          This function must be decorated with both:
          <br />
          <br />
          <ul className="list">
            <li>
              <div className="ui success compact message">
                @cvfy.crossdomain
              </div>
            </li>
            <br />
            <li>
              <div className="ui success compact message">
                @app.listen()
              </div>
            </li>
          </ul>
          <br />
        </li>
        <br />
        This function must return <b>'OK'</b> in the end.
        <br />
        Lastly, it should have a statement that starts the app,
        <br />
        <div className="ui success compact message">
          app.run()
        </div>
      </ul>

    </DocsContent>
  );
}

export default Registration;

