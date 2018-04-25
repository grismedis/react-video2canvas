/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
const { resolve } = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const buildPath = resolve(__dirname, '../build')
// const mainPath = './main.js'

const config = {
  context: resolve(__dirname, '../src'),
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    // activate HMR for React

    'webpack-dev-server/client?http://localhost:3000',
    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint

    'webpack/hot/only-dev-server',
    // bundle the client for hot reloading
    // only- means to only hot reload for successful updates

    './index.js',
  ],
  output: {
    path: buildPath,
    filename: 'app.js',
    publicPath: '/',
    // necessary for HMR to know where to load the hot update chunks
    hotUpdateChunkFilename: 'hot/hot-update.js',
    hotUpdateMainFilename: 'hot/hot-update.json',
  },
  module: {
    rules: [
      {
        test:  /\.json$/,
        use: ['json-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(js|jsx)$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },

    ],
  },
  node: {
    console: false,
    fs: 'empty',
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
    setImmediate: false,
  },

  plugins: [
    new CopyWebpackPlugin([
      {from: './favicon.ico', to: '.'},
    ], {
      copyUnmodified: true,
    }),
    new HtmlWebpackPlugin({
      template: './webpack-index.html',
      filename: 'index.html',
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    new webpack.NamedModulesPlugin(),
    // prints more readable module names in the browser console on HMR updates
    new webpack.HotModuleReplacementPlugin() // enable HMR globally in dev
  ],

}

module.exports = config
