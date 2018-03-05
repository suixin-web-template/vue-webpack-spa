/**
 * Created by liubingwen on 2017/8/10.
 */
const path = require('path')
const ROOT_PATH = path.resolve(__dirname, '../')
const isMock = /^mock/g.test(process.env.NODE_ENV)
const isDev = /^dev/g.test(process.env.NODE_ENV) || isMock// 是否为开发环境
module.exports = {
  ROOT_PATH, // 项目根目录
  isMock, // 是否是开发环境
  isDev, // 是否是开发环境
  publicPath: '/{{ name }}',
  BUILD_PATH: path.resolve(ROOT_PATH, 'dist'), // 生产目录,
  port: 8080, // 项目端口号
  proxyConfig: {// 代理设置
    // '/serv/v1': 'http://192.168.3.114'
    '/har-alipay-web/api': 'http://192.168.3.117:7300/mock/5a3776cf307f85006ee374dd',
  },
  ENTRY_PATH: 'src/page/*/index.js', // 多页面模式
  ALIAS: {// 路径映射设置
    '~': path.resolve(ROOT_PATH, 'src'),
    'page': path.resolve(ROOT_PATH, 'src/page'),
    'components': path.resolve(ROOT_PATH, 'src/components'),
    'api': path.resolve(ROOT_PATH, 'src/api'),
    'utils': path.resolve(ROOT_PATH, 'src/utils'),
    'assets': path.resolve(ROOT_PATH, 'src/assets')
  },
  baseURL: {
    mock: 'http://192.168.3.117:7300/mock/5a3776cf307f85006ee374dd/har-alipay-web/api',
    dev: '/har-alipay-web/api',
    prd: '/har-alipay-web/api'
  }
}
