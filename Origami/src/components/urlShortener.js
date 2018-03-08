import React from "react";
import { PropTypes } from "prop-types";
import { getPermalinkFromShortURL } from "../api/Nongh/getPermalink";
import { withRouter } from "react-router-dom";

function UrlShortener(props) {
  getPermalinkFromShortURL(props.match.params.shorturl).then(data => {
    props.history.replace(JSON.parse(data)[0].full_relative_url);
  });

  return (
    <div>
      <p>Bye!</p>
    </div>
  );
}

UrlShortener.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default withRouter(UrlShortener);
