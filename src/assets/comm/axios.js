// import Vue from 'vue'
// import axios from 'axios'
// import { Messagebox, Message } from 'element-ui'
//
// let config = {
//   baseURL: 'http://jiekou.com/',
//   timeout: 60 * 1000, // Timeout
//   // 是否需要loading效果,如果不需要,则在请求时的第三个参数中传{showLoading:false}
//   showLoading: true
//   // withCredentials: true, // Check cross-site Access-Control
// }
//
// const _axios = axios.create(config)
// _axios.interceptors.request.use(function (config) {
//   // Do something before request is sent
//   if (config.showLoading) {
//     Messagebox.show()
//   }
//   config.headers.common['Authorization'] = 'Bearer ' + token
//   return config
// }, function (error) {
//   // Do something with request error
//   if (config.showLoading) {
//     Messagebox.hide()
//   }
//   return Promise.reject(error)
// })
// _axios.all = axios.all
// _axios.spread = axios.spread
// // Add a response interceptor
// _axios.interceptors.response.use(function (response) {
//     if (config.showLoading) {
//       Messagebox.show()
//     }
//     if (response.data.Type == 401) {
//       this.$cookies.set('token', '')
//       Message.error('登录信息失效,稍后将自动为您转至登录页,请重新登录!')
//       setTimeout(function () {
//         location.href = '/login'
//       }, 3000)
//     } else if (response.data.Type == 500 || response.data.Type == 203) {
//       Message.error('警告：' + response.data.Content)
//     }
//
//     return response
//   },
//   function (error) {
//     if (config.showLoading) {
//       Messagebox.hide()
//     }
//     // Do something with response error
//     return Promise.reject(error)
//   }
// )
//
// Plugin.install = function (Vue, options) {
//   Vue.axios = _axios
//   window.axios = _axios
//   Object.defineProperties(Vue.prototype, {
//     axios: {
//       get () {
//         return _axios
//       }
//     },
//     $axios: {
//       get () {
//         return _axios
//       }
//     }
//   })
// }
//
// Vue.use(Plugin)
//
// export default Plugin
