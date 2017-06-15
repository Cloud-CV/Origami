import React, { PropTypes } from "react";
import { getPermalinkFromShortURL } from "../api/Nongh/getPermalink";
import { browserHistory } from "react-router";

function UrlShortener(props) {
  getPermalinkFromShortURL(props.params.shorturl).then(data => {
    browserHistory.push(JSON.parse(data)[0].fullRelativeURL);
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
