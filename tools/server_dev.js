/* eslint-env node */

const Webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const webpackDevConfig = require('./webpack.config.js')

const PORT = 3000

const libCompiler = Webpack(webpackDevConfig)

const serverLib = new WebpackDevServer(libCompiler, {
  publicPath: webpackDevConfig.output.publicPath,
  hot: true,
  quiet: false,
  noInfo: false,
  historyApiFallback: true,
  stats: { colors: true },
})


serverLib.listen(PORT, '0.0.0.0', (err, result) => {
  /* eslint-disable no-console */
  console.log('Starting dev server on http://0.0.0.0:3000')
  /* eslint-enable no-console */
  if (err) return console.log(err)
})
