
const path = require('path')
const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.common.config.js')
const config = require('../config')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const utils = require('./utils')

const configuration = merge(commonConfig, {
  mode: 'production',
  entry: {
    app: './src/index.js',
  },
  output: {
    path: config.build.assetsRoot,
    publicPath: config.build.assetsPublicPath,
    filename: 'oss-alarm.common.js',
    library: 'oss-alarm',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  externals: {
    vue: {
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue'
    },
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        sourceMap: config.build.productionSourceMap,
        parallel: true,
        uglifyOptions: {
          warnings: false,
        }
      }),
    ],
  },
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.cssSourceMap,
      usePostCSS: true,
      // extract: true  // 分离css
    })
  },
  plugins: [
    new CleanWebpackPlugin(),
    // 分离css
    // new MiniCssExtractPlugin({
    //   filename: 'oss-alarm.common.css'
    // })
  ]
})
module.exports = configuration