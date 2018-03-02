const path = require('path')

const {isDev, ROOT_PATH} = require('../../config/index')

// const ExtractTextPlugin = require('extract-text-webpack-plugin')
exports.cssLoaders = function () {
  const cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: !isDev,
      sourceMap: isDev
    }
  }
  function resolveResouce (name) {
    return path.resolve(ROOT_PATH, 'src/assets/css/layout/' + name)
  }
  function generateSassResourceLoader () {
    const loaders = [
      cssLoader,
      // 'postcss-loader',
      'sass-loader',
      {
        loader: 'sass-resources-loader',
        options: {
          // it need a absolute path
          resources: [resolveResouce('_mixins.scss')]
        }
      }
    ]
    return ['vue-style-loader'].concat(loaders)
  }
  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    const loaders = [cssLoader]
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: isDev
        })
      })
    }
    return ['vue-style-loader'].concat(loaders)
  }

  // http://vuejs.github.io/vue-loader/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateSassResourceLoader('sass'),
    scss: generateSassResourceLoader('sass')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function () {
  const loaders = exports.cssLoaders()
  return Object.keys(loaders).map(extension => ({
    test: new RegExp('\\.' + extension + '$'),
    use: loaders[extension]
  }))
}
