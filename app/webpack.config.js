const path = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry:  "./src/index.js",
  mode: "development",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/"
  },
  devServer: {
    contentBase: "./dist",
    watchContentBase: true,
    writeToDisk: true,
    publicPath: "/"
  },
  devtool: "source-map",
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      { context: "./src/scripts/", from: "**/*.html", to: "./" },
      { from: "./src/assets", to: "assets" }
    ]),
    new HtmlWebpackPlugin({
      hash: true,
      inject: "body",
      template: "./src/index.html",
      filename: "./index.html" //relative to root of the application
    })
  ],
  module: {
    rules: [
      {
        test: /\.(scss)$/,
        use: [
          {
            // Adds CSS to the DOM by injecting a `<style>` tag
            loader: "style-loader"
          },
          {
            // Interprets `@import` and `url()` like `import/require()` and will resolve them
            loader: "css-loader"
          },
          {
            // Loader for webpack to process CSS with PostCSS
            loader: "postcss-loader",
            options: {
              plugins: function() {
                return [require("autoprefixer")];
              }
            }
          },
          {
            // Loads a SASS/SCSS file and compiles it to CSS
            loader: "sass-loader"
          }
        ]
      }
    ]
  }
};
