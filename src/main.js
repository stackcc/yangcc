import '@babel/polyfill'
import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import axios from 'axios'
// import vueAxios from 'vue-axios'

// element 配置
import elementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/reset.css'
import 'element-ui/lib/theme-chalk/index.css'

// cookie 配置
import cookies from 'vue-cookies'

// 插件地图配置
import aMap from 'vue-amap'

// 插件 粒子配置
import vueParticles from 'vue-particles'

// markdown 配置
import 'mavon-editor/dist/css/index.css'
import mavonEditor from 'mavon-editor'
import highlight from './assets/comm/highlight'

// import vueHighlightJS from 'vue-highlightjs'
// import 'highlight.js/styles/atom-one-dark.css'
// Vue.use(vueHighlightJS)

// 自定义配置
import { util, api, ajax, setup } from './assets/comm/comm'
Vue.use(elementUI)
Vue.use(cookies)
Vue.use(aMap)
Vue.use(vueParticles) // from 路径是highlight.js的路径，纯属自定义
Vue.use(highlight)
Vue.use(mavonEditor)
// import axiox from './assets/comm/axios'
// Vue.use(axios, vueAxios)
Vue.prototype.$axios = axios
Vue.prototype.$setup = setup
Vue.prototype.$api = api
Vue.prototype.$util = util
Vue.prototype.$ajax = ajax

Vue.config.productionTip = false

// 初始化vue-amap
aMap.initAMapApiLoader({
  key: '5d20f670d207ac0bf8868daf78d9da8f',
  plugin: ['AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType'],
  v: '1.4.4'
})

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
