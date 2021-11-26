const path = require("path");
const { mergeWithCustomize, customizeObject } = require("webpack-merge");
const common = require("./webpack.config");

module.exports = mergeWithCustomize({
  customizeObject: customizeObject({
    "module.rules": "append",
    output: "append",
  }),
})(common, {
  entry: path.resolve(process.cwd(), "src", "client", "index.js"),
  output: {
    path: path.resolve(process.cwd(), "build", "client"),
    filename: "[name].[contenthash].js",
  },
  mode: "production",
  module: {
    rules: [],
  },
  devServer: {
    port: 3000,
    historyApiFallback: true,
    open: true,
    compress: true,
  },
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      chunks: "all",
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendors: {
          test: /node_modules/,
          chunks: "initial",
          filename: "vendors.[contenthash].js",
          priority: 1,
          maxInitialRequests: 2, // create only one vendor file
          minChunks: 1,
        },
      },
    },
  },
});
