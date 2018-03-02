/**
 * Created by liubingwen on 2017/9/28.
 */
const webpack = require('webpack')
const HtmlwebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
// const ZipPlugin = require('zip-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const {entry} = require('./webpack.entry')
const path = require('path')
const {isDev, isMock, BUILD_PATH, baseURL} = require('../config/index')
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
module.exports = function () {
  const NODE_ENV = isDev ? 'development' : 'production'
  const plugin = Object.keys(entry).map(item => {
    const chunks = [item, 'libs', 'webpack-runtime']
    return new HtmlwebpackPlugin({
      filename: `page/${item}/index.html`,
      // template: html,
      template: 'src/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      chunks,
      // chunksSortMode (chunk1, chunk2) {
      //   const order1 = chunks.indexOf(chunk1.names[0])
      //   const order2 = chunks.indexOf(chunk2.names[0])
      //   return order2 - order1
      // }
      chunksSortMode: 'dependency'
    })
  })
  plugin.push(
    new webpack.optimize.CommonsChunkPlugin({
      name: 'libs',
      minChunks: function (module, count) {
        const context = module.context
        return (
          count >= 2 && /node_modules/.test(context) &&
          // and not a CSS file (due to extract-text-webpack-plugin limitation)
          !/\.css$/.test(module.request)
        )
      }
    }),
    /* 抽取出webpack的runtime代码()，避免稍微修改一下入口文件就会改动commonChunk，导致原本有效的浏览器缓存失效 */
    new webpack.optimize.CommonsChunkPlugin({
      name: 'webpack-runtime',
      filename: 'pkg/webpack-runtime.[hash:8].js'
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new HtmlWebpackInlineSourcePlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV)
      },
      IS_DEV: JSON.stringify(isDev),
      baseURL: JSON.stringify(isMock ? baseURL.mock : isDev ? baseURL.dev : baseURL.prd)
    })
  )
  if (isDev) {
    plugin.push(
      new webpack.HotModuleReplacementPlugin()
    )
  } else {
    plugin.push(
      new webpack.HashedModuleIdsPlugin(),

      new CleanWebpackPlugin(['*'], {
        root: path.resolve(BUILD_PATH, './pkg'),
        verbose: true,
        dry: false
      }),
      // gzip压缩
      new CompressionPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
        threshold: 10240,
        minRatio: 0.8
      }),
      new ParallelUglifyPlugin({
        uglifyJS: {
          compress: {
            // 在UglifyJs删除没有用到的代码时不输出警告
            warnings: false,
            // 删除所有的 `console` 语句
            // 还可以兼容ie浏览器
            drop_console: true,
            dead_code: true,
            loops: true,
            toplevel: true,
            if_return: true,
            // 内嵌定义了但是只用到一次的变量
            // collapse_vars: true,
            // 提取出出现多次但是没有定义成变量去引用的静态值
            reduce_vars: true,
            drop_debugger: true // discard “debugger” statements
          },
          output: {
            // 删除所有的注释
            comments: false,
            // 最紧凑的输出
            beautify: false
          }
        }
      })
    )
  }
  return plugin
}
