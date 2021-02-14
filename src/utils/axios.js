import Vue from 'vue'
import _axios from 'axios'
import $util from '/@utils/util'
import $store from '/@/store'
const qs = require('qs')

// 定义加载提示消息
const glo_load_key = 'glo_loading'
// 是否为预发环境，预发展示接口错误提示
const node_env_dev = process.env.NODE_ENV === 'development'

// 定义 axios 请求地址
const basicUrl = $store.state.basicURL || '/'

// 定义 axios 请求基本参数
const service = _axios.create({
  baseURL: basicUrl,
  timeout: 9000 // 请求超时时间
})

// 添加 axios 请求拦截器
service.interceptors.request.use(config => {
  // 请求发送之前操作
  // const token = Vue.ls.get(ACCESS_TOKEN)
  // token && (config.headers[ 'X-Access-Token' ] = token)
  try {
    config.options.isLoading && $util.$message.loading({ content: config.options.loadMsg || '加载中...', key: config.options.key || glo_load_key, duration: 0.5 })
  } catch (e) {
    console.log(e)
  }
  if (config.options && config.options.create) {
    config = { ...config, ...config.options.create }
  }
  return config
}, error => {
  // 请求失败的操作
  $util.log(error, { type: 'axios', title: 'request:error' })
  if (node_env_dev) $util.$message.error(error || '请求异常，请查看接口信息')
  return Promise.reject(error)
})

// 添加 axios 响应拦截器
service.interceptors.response.use(response => {
  // 响应成功的操作
  try {
    if (response.data.success) {
      if ($util.isNull(response.data.result)) {
        response.config.options.isLoading && response.config.options.loadEndMsg && $util.$message.info({ content: response.config.options.loadEndMsg || '暂无数据', key: response.config.options.key || glo_load_key, duration: 0.5 })
      } else {
        response.config.options.isLoading && response.config.options.loadSuccessMsg && $util.$message.success({ content: response.config.options.loadSuccessMsg || response.config.options.loadEndMsg || '√', key: response.config.options.key || glo_load_key, duration: 0.5 })
      }
    } else {
      $util.$message.warn({ content: response.data.message || '数据异常', key: glo_load_key, duration: 1 })
      //   response.config.options.isLoading && response.data.message && $util.$message.error({ content: response.config.options.loadErrMsg || response.data.message || '网络错误，请重试', key: response.config.options.key || glo_load_key, duration: 0.5 })
    }
  } catch (e) {
    $util.log(response, { type: 'axios', title: 'response:success' })
  }
  return response.data
}, error => {
  // 响应失败的操作
  if (!error.response) {
    $util.$message.warn({ content: error || '加载异常', key: glo_load_key, duration: 1 })
    $util.log(error, { type: 'axios', title: 'responce:error' })
  }
  return Promise.reject(error)
})

// 定义 axios 调用失败函数
function errorState(error) {
  if (error.response) {
    let msg = null
    const data = error.response.data
    // const token = Vue.ls.get(ACCESS_TOKEN)
    switch (error.response.status) {
      case 400:
        msg = '请求语法错误，联系管理员'
        break
      case 401:
        msg = '未授权，请重新登录'
        // if (token) {
        //   $store.dispatch('Logout').then(() => {
        //     setTimeout(() => {
        //       window.location.reload()
        //     }, 1500)
        //   })
        // }
        break
      case 403:
        msg = '拒绝访问'
        break
      case 404:
        msg = '很抱歉，资源未找到!'
        break
      case 500:
        msg = '服务器内部错误，联系管理员'
        // if (token && data.message && (data.message == 'Token失效，请重新登录' || data.message.indexOf('Token失效，请重新登录') != -1)) {
        //   msg = '很抱歉，登录已过期，请重新登录'
        //   $util.$modal.error({
        //     title: '登录已过期',
        //     content: msg,
        //     okText: '重新登录',
        //     mask: false,
        //     onOk: () => {
        //       $store.dispatch('Logout').then(() => {
        //         Vue.ls.remove(ACCESS_TOKEN)
        //         window.location.reload()
        //       })
        //     }
        //   })
        // }
        break
      case 504:
        msg = '网络超时'
        break
      case 999:
        window.local.href = ''
        break
      default:
        msg = error.message
    }
    msg && $util.$notification.error({ message: '系统提示', description: msg, duration: 4 })
  }
  return error
}

// 定义 axios 调用成功函数
function successState(res) {
  if (res.result && res.result.size && res.result.total) {
    res.result.totalPage = Math.ceil(res.result.total / res.result.size)
  }
  return res
}

/**
 * 封装axios
 * @param { string } method
 * @param { string } url
 * @param { object } data
 * @param { object } headers
 * @param { function } success
 * @param { function } error
 * @param { object } options 其他配置
 * @param { * } options.params  query string parameters 参数
 * @param { boolean } options.isLoading  是否展示加载状态
 * @param { string } options.key  提示信息 key
 * @param { string } options.loadMsg  加载中提示信息
 * @param { string } options.loadSuccessMsg  加载成功提示信息（有数据返回）
 * @param { string } options.loadEndMsg  加载完成提示信息（无返回）
 * @param { string } options.loadErrMsg  加载失败提示信息
 * @param { object } options.create  修改 axios 默认配置信息
 * @param { string } options.create.baseURL  重新定义 axios 基本参数--请求地址
 * @param { number } options.create.timeout  重新定义 axios 基本参数--超时时间
 * @returns {Promise<any>}
 */
function callAxios(method, url, data, headers, success, error, options = {}) {
  const httpDefault = {
    method,
    url,
    headers: headers || {},
    // params: method === 'GET' || method === 'DELETE' ? data : data instanceof Object ? null : data,
    // params: options.params || data,
    params: method === 'GET' || method === 'DELETE' ? data : null,
    data,
    options
  }
  return new Promise((resolve, reject) => {
    service(httpDefault).then((res) => {
      if (success)success(successState(res))
      resolve(successState(res))
    }).catch((response) => {
      if (error)error(errorState(response))
      reject(errorState(response))
    })
  })
}
// 数据解析
function dataParsing(url, data, header, success, error, options = {}) {
  if (typeof success == 'object') {
    options = success
    header = Object.assign(header, success.headers)
    success = null; error = null
  } else if (typeof error == 'object') {
    options = error
    header = Object.assign(header, error.headers)
    error = null
  }
  return { url, data, header, success, error, options }
}

const axios = {

  get: (_url, _data, _success, _error, _options = {}) => {
    const _header = { 'Content-Type': 'application/json' }
    const { url, data, header, success, error, options } = dataParsing(_url, _data, _header, _success, _error, _options)
    let data_temp = {}
    if (url.indexOf('sys/dict/getDictItems') < 0) {
      data_temp = {
        _t: Date.parse(new Date()) / 1000,
        ...data
      }
    }
    return callAxios('GET', url, data_temp, header, success, error, options)
  },

  post: (_url, _data, _success, _error, _options = {}) => {
    // data 编译为 query string parameters ,: a=1&b=2&c=3
    // 后台使用 HttpServletRequest request 接收， request.getParameter("a")获取
    const _header = { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }
    const { url, data, header, success, error, options } = dataParsing(_url, _data, _header, _success, _error, _options)
    const data_temp = qs.stringify(data)
    return callAxios('POST', url, data_temp, header, success, error, options)
  },

  postBody(_url, _data, _success, _error, _options = {}) {
    // @requestBody Param param 使用， param.getOrderNo() 获取
    // data 键值对、 不编译为 query string parameters
    const _header = { 'Content-Type': 'application/json;charset=utf-8' }
    const { url, data, header, success, error, options } = dataParsing(_url, _data, _header, _success, _error, _options)
    return callAxios('POST', url, data, header, success, error, options)
  },

  upLoad(_url, _data, _success, _error, _options = {}) {
    // this.$axios.upload('/sys/common/upload',formData).then(res=>console.log(res))
    const _header = { 'Content-Type': 'multipart/form-data; boundary=something' }
    const { url, data, header, success, error, options } = dataParsing(_url, _data, _header, _success, _error, _options)
    let formData
    if (data instanceof FormData) {
      formData = data
    } else {
      formData = new FormData()
      formData.append('file', data.file)
      if (data.biz)formData.append('biz', data.biz)
    }
    return callAxios('POST', url, formData, header, success, error, options)
  },

  localFile(url) {
    // this,$axios.localFile(url);
    if (url.indexOf('http') < 0) {
      url = '/static/' + url
    }
    return callAxios('get', url, {}, {}, '', '', { create: { baseURL: '/' }})
  }

}
// const installer = {
//   vm: {},
//   install(Vue, router = {}) {
//     Vue.use(VueAxios, router, service)
//   }
// }
export var get = axios.get
export var post = axios.post
export var upLoad = axios.upLoad
export var postBody = axios.postBody
export var localFile = axios.localFile
export default axios

