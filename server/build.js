/*eslint-disable no-console */

import webpack from "webpack";
import webpackConfig from "../webpack.config.prod";
import colors from "colors";

process.env.NODE_ENV = "production";

console.log(
  "Generating minified bundle for production. This will take a moment...".blue
);

webpack(webpackConfig).run((err, stats) => {
  if (err) {
    console.log(err.bold.red);
    return 1;
  }

  const jsonStats = stats.toJson();

  if (jsonStats.hasErrors) {
    return jsonStats.errors.map(error => console.log(error.red));
  }

  if (jsonStats.hasWarnings) {
    console.log("Webpack generate the following warnings".bold.yellow);
    jsonStats.warnings.map(warning => console.log(warning.yellow));
  }

  console.log(
    "App compiled in production mode and written to /dist. Ready to roll!".green
  );

  return 0;
});
