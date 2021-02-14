const ThreeExamples = require('import-three-examples')
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  // process.env.NODE_ENV === 'production' ? '192.168.60.110:8080' : '192.168.60.110:8080',
  publicPath:  process.env.NODE_ENV === "production" ? "./" : "/",
  outputDir: 'dist',  //放置生成的静态资源
  assetsDir:"assets",  //指定生成的 index.html 的输出路径
  // 用于多页配置，默认是 undefined
  pages: {
    index: {
      // 入口文件
      entry: 'src/main.js',　　/* 这个是根入口文件 */
      // 模板文件
      template: 'public/index.html',
      // 输出文件
      filename: 'index.html',
      // 页面title
      title: 'Index Page'
    }
    // 简写格式
    // 模板文件默认是 `public/subpage.html`
    // 如果不存在，就是 `public/index.html`.
    // 输出文件默认是 `subpage.html`.
    // subpage: 'src/main.js'　　　　/*注意这个是*/
  },
  // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码。这个值会在 @vue/cli-plugin-eslint 被安装之后生效。
  filenameHashing: false,
  // 是否在保存的时候使用 `eslint-loader` 进行检查。// 有效的值：`ture` | `false` | `"error"`
  lintOnSave: process.env.NODE_ENV !== "production",
  // 使用带有浏览器内编译器的完整构建版本// 查阅 https://cn.vuejs.org/v2/guide/installation.html#运行时-编译器-vs-只包含运行时
  runtimeCompiler: false,
  // babel-loader 默认会跳过 node_modules 依赖。// 通过这个选项可以显式转译一个依赖。 /* string or regex */
  transpileDependencies: [],
  // 是否为生产环境构建生成 source map？
  productionSourceMap: true,
  // 调整内部的 webpack 配置。
  // chainWebpack: (config) => {
  //   config.resolve.symlinks(true)
  // },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@static', resolve('src/static'))
      .set('@utils', resolve('src/utils'))
      .set('@assets', resolve('assets'))
      .set('@comp', resolve('src/components'))
      .set('@api', resolve('src/api'))
      .set('@views', resolve('src/views'))
    // // 配置 webpack 识别 markdown 为普通的文件
    // config.module
    //   .rule('markdown')
    //   .test(/\.md$/)
    //   .use()
    //   .loader('file-loader')
    //   .end()
  },
  configureWebpack: () => {},

  // CSS 相关选项
  css: {
    // 将组件内的 CSS 提取到一个单独的 CSS 文件 (只用在生产环境中) // 也可以是一个传递给 `extract-text-webpack-plugin` 的选项对象
    // extract: true,
    // 是否开启 CSS source map？
    sourceMap: false,
    // 为预处理器的 loader 传递自定义选项。比如传递给// sass-loader 时，使用 `{ sass: { ... } }`。
    loaderOptions: {
      sass: {
        data: `@import 'assets/sass/index.sass'` // 引入全局的sass样式
      }
    },
    // 为所有的 CSS 及其预处理文件开启 CSS Modules。// 这个选项不会影响 `*.vue` 文件。
    modules: false
  },

  // 在生产环境下为 Babel 和 TypeScript 使用 `thread-loader`
  // 在多核机器下会默认开启。
  parallel: require('os').cpus().length > 1,

  // PWA 插件的选项。
  // 查阅 https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli-plugin-pwa/README.md
  pwa: {},

  // 配置 webpack-dev-server 行为。
  devServer: {
    open: process.platform === 'darwin',  //配置自动启动浏览器
    host: '0.0.0.0', // 指定要使用的主机
    port: 8080,
    https: false,
    // https: {
    //   key: fs.readFileSync('/path/to/server.key'),
    //   cert: fs.readFileSync('/path/to/server.crt'),
    //   ca: fs.readFileSync('/path/to/ca.pem'),
    // },
    hotOnly: false,
    // 查阅 https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli/cli-service.md#配置代理
    proxy: {
      '^/api': {
        target: 'http://antsman.cn:3000',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/api": "" // 去掉接口地址中的api字符串
        }
      }
    } // string | Object
    // before: app => {}
  },

  // 三方插件的选项
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        // 这个是加上自己的路径，注意：试过不能使用别名路径
        // path.resolve(__dirname, "./src/assets/variable.less")
      ]
    },
    ...ThreeExamples

  }

}
