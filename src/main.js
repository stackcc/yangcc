import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import axios from 'axios'
// import vueAxios from 'vue-axios'
import elementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/reset.css'
import 'element-ui/lib/theme-chalk/index.css'
import cookies from 'vue-cookies'

import aMap from 'vue-amap';
Vue.use(aMap);

// Vue.use(axios, vueAxios)
Vue.use(elementUI)
Vue.use(cookies)

import util from './assets/comm/util'
import cset from './assets/comm/set.js'
// import axiox from './assets/comm/axios'
// import ajax from './assets/comm/ajax'
import api from './assets/comm/api'

Vue.prototype.$axios = axios
Vue.prototype.$util = util.util
Vue.prototype.$cset = cset.set
Vue.prototype.$api = api.api
// Vue.prototype.$ajax = ajax.ajax


Vue.config.productionTip = false

// 初始化vue-amap
aMap.initAMapApiLoader({
  key: '5d20f670d207ac0bf8868daf78d9da8f',
  plugin: ['AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType'],
  v: '1.4.4'
});

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')

