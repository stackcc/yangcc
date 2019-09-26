import setup from './setup.js'
let util = {
  // 手机号测试
  regPhone: function (data) {
    let reg = /1\d{10}/
    return reg.test(data)
  },
  // base64转换
  toBase64: function (files) {
    // debugger
    // let reader = new FileReader();
    // let imgFile;
    // // let that = this
    // reader.readAsDataURL(files)
    // reader.onload = e => {
    //   imgFile = e.target.result;
    //   let arr = imgFile.split(',')
    //   var faceBase64 = arr[1]
    //   // console.log(imgFile)
    //   console.log(faceBase64)
    //   return faceBase64;
    // }
  },
  // 去掉空格
  trim: function (str) {
    return str.replace(/(^\s*)|(\s*$)/g, '')
  },
  getUrlParams: function (name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
    var r = window.location.search.substr(1).match(reg)
    if (r != null) { return r[2] }
    return null
  },
  // 获取指定 url 的参数
  getFixedUrlParams: function (url, name) {
    var search_temp = '?' + url.split('?')[1]
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
    var r = search_temp.substr(1).match(reg)
    if (r != null) { return r[2] }
    return null
  },
  isNumber: function (v) {
    var numberReg = /^[0-9]*$/
    return numberReg.test(v)
  },
  isFloat2: function (v) {
    var numberReg = /^\d{0,7}\.{0,1}\d{0,2}$/g
    return numberReg.test(v)
  },
  // 百度坐标 转 火星坐标
  bd_decrypt: function (bd_lon, bd_lat) {
    var X_PI = Math.PI * 3000.0 / 180.0
    var x = bd_lon - 0.0065
    var y = bd_lat - 0.006
    var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * X_PI)
    var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * X_PI)
    var gg_lon = z * Math.cos(theta)
    var gg_lat = z * Math.sin(theta)
    return {
      gg_lon: gg_lon,
      gg_lat: gg_lat
    }
  },
  // 火星坐标 转换为  百度坐标
  bd_encrypt: function (gg_lon, gg_lat) {
    var X_PI = Math.PI * 3000.0 / 180.0
    var x = gg_lon; var y = gg_lat
    var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * X_PI)
    var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * X_PI)
    var bd_lon = z * Math.cos(theta) + 0.0065
    var bd_lat = z * Math.sin(theta) + 0.006
    return {
      bd_lon: bd_lon,
      bd_lat: bd_lat
    }
  },
  // 数组对象深复制
  deepCopy: function (data) {
    // 深拷贝
    let o = {
      run: function (val) {
        let result = ''
        if (val instanceof Array) {
          result = this.copyArr(val)
        } else {
          result = this.copyObj(val)
        }
        return result
      },
      copyArr: function (arr) {
        var arr_temp = []
        if (arr) {
          for (let i = 0, j = arr.length; i < j; i++) {
            if (arr[i] instanceof Array) {
              arr_temp[i] = this.copyArr(arr[i])
            } else if (arr[i] instanceof Object) {
              arr_temp[i] = this.copyObj(arr[i])
            } else arr_temp[i] = arr[i]
          }
        }
        return arr_temp
      },
      copyObj: function (obj) {
        let obj_temp = {}
        for (let key in obj) {
          if (obj[key] instanceof Array) {
            obj_temp[key] = this.copyArr(obj[key])
          } else if (obj[key] instanceof Object) {
            obj_temp[key] = this.copyObj(obj[key])
          } else obj_temp[key] = obj[key]
        }
        return obj_temp
      }
    }
    return o.run(data)
  },

  // 打印，调试
  log: function (msg, type, styleCss) {
    if (!setup.log.disabled) {
      if(msg instanceof Object){
        msg = JSON.stringify(msg)
      }
      switch (type) {
        case 'time': // 运行时间
          console.time()
          break;
        case 'timeEnd':
          console.timeEnd()
          break;
        case 'profile': // 代码性能分析器
          console.profile()
          break;
        case 'profileEnd':
          console.profileEnd()
          break;
        case 'warn':
          console.warn(msg)
          break;
        case 'error':
          console.error(msg)
          break;
        case 'info':
          console.info(msg)
          break;
        case 'color':
          styleCss = styleCss|| 'background:linear-gradient(to right, red, purple);-webkit-background-clip: text;color: white;'
          console.log('%c'+ msg, styleCss)
          break;
        default:
          styleCss = styleCss|| 'background:linear-gradient(to right, red, purple);-webkit-background-clip: text;color: white;'
          console.log('%c'+ msg , styleCss)
      }
    }
  }

  // 时间装换

}
//数字 加减
export default { ...util}
