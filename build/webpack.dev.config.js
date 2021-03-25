const path = require('path')
const { merge } = require('webpack-merge');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const commonConfig = require('./webpack.common.config.js')
const config = require('../config')
const utils = require('./utils')
const portfinder = require('portfinder')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

const configuration = merge(commonConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
    app: './examples/main',
    vendors: ['vue', 'vue-router', 'element-ui']
  },
  output: {
    path: path.join(__dirname, '../examples/dist'),
    publicPath: config.build.assetsPublicPath,
    filename: '[name].js',
    chunkFilename: '[name].chunk.js'
  },
  target: 'web',
  devServer: {
    allowedHosts: [
      '.10.1.193.28:10002'
    ],
    // host: config.dev.host,
    port: config.dev.port,
    compress: true,
    open: true,
    hot: true,
    clientLogLevel: 'warning',
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    contentBase: [
      path.join(__dirname, '/packages'),
      path.join(__dirname, '/examples')
    ],
    publicPath: '/',
    quiet: true,
    progress: true,
    watchOptions: {
      poll: config.dev.poll,
    },
    proxy:{
      '/rca-sla':{
        target: 'http://10.1.193.28:10002/',
        secure: false,
        changeOrigin: true
      }
    }
  },
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.dev.cssSourceMap,
      usePostCSS: true
    })
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, '../examples/index.html'),
      inject: true
    })
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      configuration.devServer.port = port

      // Add FriendlyErrorsPlugin
      configuration.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${configuration.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(configuration)
    }
  })
})
