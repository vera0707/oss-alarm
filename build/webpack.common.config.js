const path = require('path')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const resolve = (dir) => path.join(__dirname, '..', dir)

module.exports = {
  output: {
    path: config.build.assetsRoot,
    publicPath: config.build.assetsPublicPath,
    library: 'oss-alarm',
    libraryTarget: 'umd',
    filename: 'oss-alarm.common.js'
  },
  resolve: {
    fallback: { "net": false },
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('examples'),
      'components': resolve('src/common/components'),
      'helper': resolve('src/common/helper'),
      'images': resolve('src/images'),
      'dist': resolve('dist'),
    }
  },
  plugins: [
    new VueLoaderPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: /node_modules/,
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: [resolve('src')],
      },
      {
        test: /.(ttf|eot|woff|woff2)$/,
        exclude: /node_modules/,
        loader: 'file-loader',
      },
      {
        test: /\.svg(\?\S*)?$/,
        loader: 'url-loader',
        exclude: /node_modules/,
        options: {
          limit: 10000,
          name: path.posix.join('static', '[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(gif|png|jpe?g)(\?\S*)?$/,
        loader: 'url-loader',
        exclude: /node_modules/,
        options: {
          limit: 10000,
          name: path.posix.join('static', '[name].[hash:7].[ext]')
        }
      },
    ]
  }
}
