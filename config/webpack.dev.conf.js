const webpack = require("webpack");
const merge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.conf");

const devWebpackConfig = merge(baseWebpackConfig, {
  // DEV config
  mode: "development",
  devtool: "cheap-module-eval-source-map",
  devServer: {
    inline: true,
    contentBase: baseWebpackConfig.externals.paths.dist,
    port: 8081,
    host: "127.0.0.1",
    overlay: {
      warnings: true,
      errors: true,
    },
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: "[file].map",
    }),
  ],
});

module.exports = new Promise((resolve, reject) => {
  resolve(devWebpackConfig);
});
