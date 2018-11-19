const webpack = require('webpack')

const isProductiton = process.env.NODE_ENV !== 'production'
module.exports = {
  // Project deployment base
  // By default we assume your app will be deployed at the root of a domain,
  // e.g. https://www.my-app.com/
  // If your app is deployed at a sub-path, you will need to specify that
  // sub-path here. For example, if your app is deployed at
  // https://www.foobar.com/my-app/
  // then change this to '/my-app/'
  baseUrl: '/public-framework',

  // where to output built files
  outputDir: 'dist',

  // where to put static assets (js/css/img/font/...)
  assetsDir: 'static',

  // whether to use eslint-loader for lint on save.
  // valid values: true | false | 'error'
  // when set to 'error', lint errors will cause compilation to fail.
  lintOnSave: 'error',

  // use the full build with in-browser compiler?
  // https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
  runtimeCompiler: false,

  // babel-loader skips `node_modules` deps by default.
  // explicitly transpile a dependency with this option.
  transpileDependencies: [
    /* string or regex */
  ],

  // generate sourceMap for production build?
  productionSourceMap: true,

  // tweak internal webpack configuration.
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  chainWebpack: config => {
    config.plugin('provide').use(webpack.ProvidePlugin, [
      {
        moment: 'moment',
        lodash: 'lodash',
        _: 'lodash'
      }
    ])
  },
  configureWebpack: config => {
    if (!isProductiton) {
      config.devtool = 'cheap-module-source-map'
    }
    config.node = {
      constants: false
    }
  },

  // CSS related options
  css: {
    // extract CSS in components into a single CSS file (only in production)
    // can also be an object of options to pass to extract-text-webpack-plugin
    extract: false,

    // enable CSS source maps?
    sourceMap: false,

    // pass custom options to pre-processor loaders. e.g. to pass options to
    // sass-loader, use { sass: { ... } }
    loaderOptions: {},

    // Enable CSS modules for all css / pre-processor files.
    // This option does not affect *.vue files.
    modules: false
  },

  // use thread-loader for babel & TS in production build
  // enabled by default if the machine has more than 1 cores
  parallel: require('os').cpus().length > 1,

  // options for the PWA plugin.
  // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  pwa: {},

  // configure webpack-dev-server behavior
  devServer: {
    open: true,
    disableHostCheck: false,
    host: 'localhost',
    port: 8080,
    https: false,
    hotOnly: true
    // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#configuring-proxy
    // proxy: {
    //     '/dolphin': {
    //         target: 'http://local.ctsp.kedacom.com/dolphin-release/',
    //         pathRewrite: {
    //             '^/dolphin': '',
    //         },
    //         changeOrigin: true
    //     },
    // },

    // options for 3rd party plugins
    // pluginOptions: {
    //     // ...
    // }
  }
}
