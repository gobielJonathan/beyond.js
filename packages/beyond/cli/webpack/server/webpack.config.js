const path = require("path");
const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { mergeWithCustomize, customizeObject } = require("webpack-merge");
const shared = require("../webpack.shared");
const { default: LoadablePlugin } = require("@loadable/webpack-plugin");
const WebpackBar = require("webpackbar");
const { default: resolveCwd } = require("../../../src/utils/resolve");

module.exports = mergeWithCustomize({
  customizeObject: customizeObject({
    "module.rules": "append",
    plugins: "append",
  }),
})(shared, {
  target: "node",
  entry: resolveCwd("server/index.ts"),
  output: {
    path: path.resolve(process.cwd(), "build/server"),
    library: {
      type: "commonjs2",
    },
  },
  externals: [nodeExternals()],
  plugins: [
    new MiniCssExtractPlugin({
      runtime: true,
    }),
    new LoadablePlugin(),
    new WebpackBar({ name: "server", color: "#FFBD35" }),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: "file-loader",
        options: {
          name: "[contenthash].[ext]",
          outputPath: `../client/`,
          publicPath: process.env.HOST_CLIENT,
        },
      },
    ],
  },
});
