const path = require("path");
const webpack = require("webpack");

module.exports = {
  context: __dirname,

  entry: {
    // Add as many entry points as you have container-react-components here
    App: "./Origami/src/index.js",
    vendors: ["react"]
  },

  output: {
    path: path.resolve("./django_server/static/bundles/local/"),
    filename: "[name]-[hash].js"
  },

  externals: [], // add all vendor libs

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      filename: "vendor.js"
    })
  ], // add all common plugins here

  module: {
    loaders: [] // add all common loaders here
  },

  resolve: {
    modulesDirectories: ["node_modules", "bower_components"],
    extensions: ["", ".js", ".jsx"]
  }
};
