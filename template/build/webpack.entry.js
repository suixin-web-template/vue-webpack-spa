/**
 * Created by liubingwen on 2017/9/28.
 */
const {ROOT_PATH, ENTRY_PATH} = require('../config/index')
const glob = require('glob')
const path = require('path')
const entry = {}
const entryConfig = {
  libs: ['vue', 'vue-router', 'axios']
}
if (ENTRY_PATH) {
  glob.sync(ENTRY_PATH).map(entrie => {
    const temp = entrie.split('/')
    const projName = temp[temp.length - 2]
    const url = ENTRY_PATH.replace(/\*{1}/g, projName)
    entry[projName] = path.resolve(ROOT_PATH, url)
  })
}
module.exports = {
  entry,
  entryConfig: Object.assign({}, entryConfig, entry)
}
