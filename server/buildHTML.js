/*eslint-disable no-console */
/*eslint-disable prefer-template */

import fs from "fs";
import cheerio from "cheerio";
import colors from "colors";

const appConfig = require("../outCalls/config");

fs.readFile("src/index.html", "utf8", (err, markup) => {
  if (err) {
    return console.log(err.red);
  }

  const $ = cheerio.load(markup);
  const head = $("head");

  head.append('<meta property="og:type"  content="product" />');
  head.append(
    '<meta property="og:url"   content="http://' +
      appConfig.CLIENT_IP +
      ":" +
      appConfig.CLIENT_PORT +
      '" />'
  );
  head.append('<meta property="og:title" content="CVFY-CloudCV" />');
  head.append(
    '<meta property="og:image" content="http://' +
      appConfig.CLIENT_IP +
      ":" +
      appConfig.CLIENT_PORT +
      '/cloudcv_logo.png" />'
  );

  fs.writeFile("dist/index.html", $.html(), "utf8", err => {
    if (err) {
      return console.log(err.red);
    }
    console.log("index.html written to /dist".blue);
  });
});
