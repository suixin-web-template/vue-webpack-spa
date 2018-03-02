const path = require('path')

const {isDev, ROOT_PATH} = require('../../config/index')

// const ExtractTextPlugin = require('extract-text-webpack-plugin')
exports.cssLoaders = function (options = {}) {
  const cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: !isDev,
      sourceMap: isDev
    }
  }
  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: isDev
    }
  }
  function resolveResouce (name) {
    return path.resolve(ROOT_PATH, 'src/assets/css/layout/' + name)
  }
  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]
    if (loader) {
      if (loader === 'sass') {
        loaders.push(
          'sass-loader',
          {
            loader: 'sass-resources-loader',
            options: {
              // it need a absolute path
              resources: [resolveResouce('_mixins.scss')]
            }
          }
        )
      } else {
        loaders.push({
          loader: loader + '-loader',
          options: Object.assign({}, loaderOptions, {
            sourceMap: isDev
          })
        })
      }

    }
    return ['vue-style-loader'].concat(loaders)
  }

  // http://vuejs.github.io/vue-loader/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass'),
    scss: generateLoaders('sass')
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
