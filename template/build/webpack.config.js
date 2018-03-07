/**
 * Created by liubingwen on 2017/9/28.
 */
const path = require('path')
const {isDev, BUILD_PATH, ALIAS, ROOT_PATH, proxyConfig, port, publicPath} = require('../config/index')
const mod = require('./webpack.module')
const plugins = require('./webpack.plugins')

const webpackConfig = {
  devtool: isDev ? 'eval-source-map' : false,
  entry: {
    libs: ['vue', 'vue-router', 'axios'],
    main: path.resolve(ROOT_PATH, 'src/index')
  },
  output: {
    path: path.join(BUILD_PATH), // 打包后所有文件存放的地方
    filename: `pkg/[name].${!isDev ? '[chunkhash:8].' : ''}js`,
    publicPath: publicPath + '/'
  },
  externals: {
    {{#if_eq platform 'weixin'}}
    jweixin: 'wx',
    {{/if_eq}}
    {{#if_eq platform 'alipay'}}
    alipay: 'ap',
    {{/if_eq}}
  },
  resolve: {
    // mainFields: ['jsnext:main','main'],
    modules: [path.resolve(ROOT_PATH, 'node_modules')],
    extensions: ['.js', '.vue', '.json', '.scss'],
    alias: ALIAS
  },
  module: mod,
  plugins: plugins(),
  devServer: {
    historyApiFallback: false,
    compress: true,
    lazy: false,
    inline: true,
    hot: true,
    host: '0.0.0.0',
    port,
    proxy: proxyConfig
  }
}

module.exports = webpackConfig
