import React from "react";
import { PropTypes } from "prop-types";
import { getPermalinkFromShortURL } from "../api/Nongh/getPermalink";
import { browserHistory } from "react-router";

function UrlShortener(props) {
  getPermalinkFromShortURL(props.params.shorturl).then(data => {
    browserHistory.push(JSON.parse(data)[0].full_relative_url);
  });

  return (
    <div>
      <p>Bye!</p>
    </div>
  );
}

UrlShortener.propTypes = {
  params: PropTypes.object.isRequired
};

export default UrlShortener;
