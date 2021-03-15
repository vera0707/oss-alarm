const path = require('path')
const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.common.config.js')
const config = require('../config')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// const CopyWebpackPlugin = require('copy-webpack-plugin')

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
    new CleanWebpackPlugin(),
    // new CopyWebpackPlugin([
    //   {
    //     from: path.resolve(__dirname, '../src/utils/flexible/index.js'),
    //     to: path.resolve(__dirname, '../lib/flexible.[ext]'),
    //     ignore: ['.*']
    //   }
    // ]),
    // new uglifyJsPlugin({
    //   uglifyOptions: {
    //     compress: {
    //       warnings: false,
    //       drop_debugger: true,
    //       drop_console: true
    //     }
    //   },
    //   sourceMap: config.build.productionSourceMap,
    //   parallel: true
    // })
  ]
})

module.exports = configuration