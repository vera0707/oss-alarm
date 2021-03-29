const path = require('path')
const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.common.config.js')
const config = require('../config')
const Components = require('../components.json')
const resolve = (dir) => path.join(__dirname, '..', dir)
const MiniCssExtractPlugin = require('mini-css-extract-plugin')


process.env.NODE_ENV = 'production'

const configuration = merge(commonConfig, {
  mode: 'production',
  entry: Components,
  output: {
    path: config.build.assetsRoot,
    publicPath: config.build.assetsPublicPath,
    filename: path.posix.join('', '[name]/index.js'),
    chunkFilename: path.posix.join('', '[name]/index.js'),
    library: '[name]',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  resolve: {
    fallback: { "net": false },
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'images': resolve('src/images'),
    }
  },
  module: {
    rules: [
      {
        test: /.(ttf|eot|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          limit: 10000,
        },
      },
      {
        test: /\.svg(\?\S*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
        },
      },
      {
        test: /\.(gif|png|jpe?g)(\?\S*)?$/,
        loader: 'url-loader',
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader,'css-loader'],
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader,'css-loader','postcss-loader','sass-loader'],
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]/index.css'
    })
  ],
  externals: {
    vue: {
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue'
    }
  },
})

module.exports = configuration