var path = require("path")
var webpack = require('webpack')
var BundleTracker = require('webpack-bundle-tracker')

const GLOBALS = {
  "process.env.NODE_ENV": JSON.stringify("production")
};

config = {
  entry: "./Origami/src/index",
  target: "web",
  output: {
    path: path.resolve('./django_server/static/bundles/local/'),
    filename: "bundle.js"
  },
  plugins: [
    new webpack.DefinePlugin(GLOBALS),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new BundleTracker({filename: './webpack-stats-local.json'})
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.join(__dirname, "Origami"),
        loader: "babel-loader"
      },
      { test: /jquery\.js$/, loader: "expose-loader?jQuery!expose-loader?$" },
      {
        test: /(\.css)$/,
        use: ["style-loader", "css-loader"]
      },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader" },
      { test: /\.(woff|woff2)$/, loader: "url-loader?prefix=font/&limit=5000" },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?limit=10000&mimetype=application/octet-stream"
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?limit=10000&mimetype=image/svg+xml"
      },
      { test: /\.(jpe?g|png|gif)$/i, loader: "file-loader?name=[name].[ext]" }
    ]
  }
};

module.exports = config
