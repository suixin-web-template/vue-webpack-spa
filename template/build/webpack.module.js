/**
 * Created by liubingwen on 2017/9/28.
 */
const path = require('path')
const vueLoaderConfig = require('./vueLoad/vue-loader.conf')
const utils = require('./vueLoad/utils')
const {ROOT_PATH} = require('../config/index')
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
const rules = [
  {
    enforce: 'pre',
    test: /\.(js|vue)$/,
    exclude: /node_modules/,
    loader: 'eslint-loader',
    options: {
      fix: false
    }
  },
  {
    test: /\.vue$/,
    loader: 'vue-loader',
    options: vueLoaderConfig
  },
  {
    test: /\.(js)$/,
    include: [resolve('src')],
    // exclude: /node_modules/,
    loader: 'babel-loader?cacheDirectory'
  },
  {
    test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
    loader: 'url-loader',
    options: {
      limit: 1,
      name: 'pkg/img/[name].[hash:8].[ext]'
    },
    include: ROOT_PATH
  }
].concat(utils.styleLoaders())

module.exports = {
  rules
}
