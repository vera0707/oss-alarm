const path = require('path')
const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.common.config.js')
const config = require('../config')
// const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const Components = require('../components.json')

process.env.NODE_ENV = 'production'

const configuration = merge(commonConfig, {
  mode: 'production',
  entry: Components,
  output: {
    path: config.build.assetsRoot,
    publicPath: config.build.assetsPublicPath,
    filename: path.posix.join('', '[name]/[name].js'),
    chunkFilename: path.posix.join('', '[name]/[name].js'),
    libraryTarget: 'umd'
  },
  externals: {
    vue: {
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue'
    }
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        chunkFilter: (chunk) => {
          if (chunk.name === 'vendor') {
            return false;
          }
          return true;
        },
      }),
    ],
  },
  plugins: [
    // new CleanWebpackPlugin({
    //   verbose: true,
    // }),
    // new uglifyJsPlugin({
    //     uglifyOptions: {
    //         compress: {
    //             warnings: false
    //         }
    //     },
    //     sourceMap: config.build.productionSourceMap,
    //     parallel: true
    // })
  ]
})

module.exports = configuration