process.env.VUE_APP_OSS_ALARM = 'development';
const path = require('path')

function resolve (dir) {
  return path.join(__dirname, '.', dir)
}


module.exports = {
  lintOnSave: false,
  publicPath:  '/',
  outputDir: 'docs',
  assetsDir: 'static',
  productionSourceMap: false,
  pages: {
    index: {
      entry: 'examples/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: 'OSS ALARM | Your alarm expert',
    },
  },
  configureWebpack: {
    performance: {
      hints: false,
    },
    resolve: {
      extensions: ['.vue', '.js', '.json'],
      alias: {
        'images': resolve('images'),
      },
    },
    output: {
      library: 'OssAlarm',
    },
  },
  devServer: {
    open: true,
    port: 9000,
    proxy: {
      '/rca-sla': {
        target: 'http://10.1.193.28:10002/',
      },
    },
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
    },
  },
};
