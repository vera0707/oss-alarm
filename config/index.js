const path = require('path');

module.exports = {
    dev: {
      env: require('./dev.env'),
      cacheBusting: false,
      cssSourceMap: false,
      useEslint: true,
      showEslintErrorsInOverlay: false,
      assetsSubDirectory: 'static',
      host: 'localhost',
      port: 8090,
      hot: true,
      assetsPublicPath: '/',
      errorOverlay: true,
      poll: true
    },
    build: {
      env: require('./prod.env'),
      productionSourceMap: false,
      assetsSubDirectory: 'static',
      assetsRoot: path.resolve(__dirname, '../lib'),
      assetsPublicPath: '/',
      cssSourceMap: false,
    },
    examples: {
      assetsRoot: path.resolve(__dirname, '../dist/examples'),
      assetsSubDirectory: ''
    },
    docsBuild: {
      index: path.resolve(__dirname, '../dist/index.html'),
      assetsRoot: path.resolve(__dirname, '../dist'),
      assetsSubDirectory: 'static',
      productionSourceMap: false,
      assetsPublicPath: '/'
    }
  }