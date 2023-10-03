const path = require("path");
const slsw = require("serverless-webpack");
const nodeExternals = require("webpack-node-externals");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = {
  externals: [nodeExternals()],
  devtool: "source-map",
  entry: slsw.lib.entries,
  resolve: {
    extensions: [".js", ".json", ".ts", ".tsx"],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, "tsconfig.json"),
        extensions: [".js", ".ts"],
      }),
    ],
  },
  target: "node",
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        use: [
          {
            loader: "ts-loader",
          },
        ],
      },
    ],
  },
  mode: "development",
  stats: "minimal", // errors-only, minimal, none, normal, verbose
  output: {
    libraryTarget: "commonjs",
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].js",
  },
};
