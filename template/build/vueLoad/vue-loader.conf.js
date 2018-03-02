const utils = require('./utils')
const {isDev} = require('../../config/index')

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: !!isDev,
    extract: !isDev
  })
}
