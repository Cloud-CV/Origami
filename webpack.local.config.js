import path from "path";
import webpack from "webpack";
import BundleTracker from "webpack-bundle-tracker";

const config = {
  devtool: "cheap-module-eval-source-map",
  entry: [
    "webpack-dev-server/client?http://localhost:3000",
    "webpack/hot/only-dev-server",
    "./Origami/src/index"
  ],
  devServer: {
    inline: true,
    hot: true
  },
  target: "web",
  output: {
    path: path.resolve("./django_server/static/bundles/local/"),
    publicPath: "http://localhost:3000/static/bundles/",
    filename: "bundle.js"
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new BundleTracker({ filename: "./webpack-stats-local.json" })
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

module.exports = config;
