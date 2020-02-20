const merge = require("webpack-merge");
const base = require("./base");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = merge(base, {
  mode: "production",
  output: {
    filename: "game.js"
  },
  devtool: false,
  performance: {
    maxEntrypointSize: 9000000,
    maxAssetSize: 9000000
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false
          },
          compress: {
            drop_console: true,
          }
        }
      })
    ]
  }
});
