import setup from './setup.js'
let util = {

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

  extend: function (target, source) {
    for (var p in source) {
      if (source.hasOwnProperty(p)) {
        target[p] = source[p];
      }
    }
    return target;
  },

  json2Form: function (json) {
    var str = [];
    for (var p in json) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));
    }
    return str.join("&");
  },

  //邮箱验证
  checkEmail: function (v) {
    var filter = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
    return filter.test(v);
  },
  //手机号吗验证
  tel: function (v) {
    return /^1\d{10}$/.test(v);
  },

  //验证网址
  uniform: function (v,type) {
    let reg = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])/;
    let reg1 = /[hHtTpPsS]{4,5}:\/\/[\S]+[\s\n\t]*/;
    if(type == 'outLink'){
      let arr = [
        "mp.weixin.qq.com",
      ];
      let bool = false;
      for(let i=0,j=arr.length;i<j;i++){
        if(v.indexOf(arr[i]) != -1){
          bool = true;
          break;
        }
      }
      let regBool = reg1.test(v);
      console.log(regBool);
      if(regBool && bool){
        bool = true;
      }else{
        bool = false;
      }
      return bool;
    }else{
      return reg.test(v);
    }

  },

  //验证身份证
  checkIDCard: function (v) {
    var isIDCard1 = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
    if (isIDCard1.test(v)) {
      var card = v.slice(6, 10);
      var data = new Date();
      var year = data.getFullYear();
      var num = year - card;
      if (num > 18) {
        return true;
      } else {
        return false;
      }
    }
  },

  // 获取地址栏参数
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
          console.log(msg)
      }
    }
  },

  /**
   *  时间格式化
   * @param {date} time
   * @param {String||datetime|date} type
   * @return {string}
   */
  timeFormat:function (time,type) {
    if(typeof time != 'number'){
      if(time){
        time = time.replace(/-/g, '/')
      }
    }
    if(!time)time= new Date();
    if(!type)type='datetime';
    var _Date = new Date(time);
    var y,m,d,h,min,sec,result;
    switch (type){
      case 'datetime':
        y = _Date.getFullYear();
        m = _Date.getMonth()+1;
        d = _Date.getDate();
        h = _Date.getHours();
        min = _Date.getMinutes();
        sec = _Date.getSeconds();
        result =  y +'-'+
          (m <10 ? '0'+m : m) +'-'+
          (d <10 ? '0'+d : d) +' '+
          (h <10 ? '0'+h : h)+':'+
          (min <10 ? '0'+min : min)+':'+
          (sec <10 ? '0'+sec : sec);
        break;
      case 'date':
        y = _Date.getFullYear();
        m = _Date.getMonth()+1;
        d = _Date.getDate();
        h = _Date.getHours();
        min = _Date.getMinutes();
        sec = _Date.getSeconds();
        result =  y +'-'+
          (m <10 ? '0'+m : m) +'-'+
          (d <10 ? '0'+d : d) +' ';
        break;
    }
    return result;
  },

  /**
   * 动态展示时间
   */
  setTime: function (time) {
    time = this.timeFormat(time);
    let currentTime = Date.parse(new Date());  //当前时间的时间戳
    let dateTime = new Date(time); //后台传递来的时间
    let d_day = Date.parse(new Date(dateTime));   //传入的时间戳
    let day = Math.abs(parseInt((d_day - currentTime) / 1000 / 3600 / 24)); //  -- 日
    let hour = Math.abs(parseInt((d_day - currentTime) / 1000 / 3600)); //计算小时  -- 时
    let minutes = Math.abs(parseInt((d_day - currentTime) / 1000 / 60)); //计算分钟  -- 分
    let seconds = Math.abs(parseInt((d_day - currentTime) / 1000)); //计算秒   -- 秒
    let temp = dateTime.getFullYear() +'-'+ (dateTime.getMonth() +1) + '-' + dateTime.getDate();
    let ts = '';
    if (day > 2) {
      ts = temp ;
    } else if (day > 0 && day == 2) {
      ts = ("前天").toString();
    } else if (day > 0 && day < 2) {
      ts = ("昨天").toString();
    } else if (hour > 0 && hour < 24) {
      ts = (parseInt(hour) + "小时前").toString();
    } else if (minutes > 0 && minutes < 60) {
      ts = (parseInt(minutes) + "分钟前").toString();
    } else if (seconds > 0 && seconds < 60) {
      ts = ('刚刚').toString();
    }
    return ts;
  },

  /**
   * 补数据；  根据id 获得name
   * @param {Array} sourceArr  解析数据的源数据
   * @param {String} val  需要解析的值value
   * @param {String} idKey   解析的值 在 源数据中的  key
   * @param {String} nameKey   输出的值 在 源数据中的 key
   */
  supplementField:function({sourceArr,value,idKey,nameKey}){
    let name;
    //数组中 item为对象
    for(let i=0,j=sourceArr.length;i<j;i++){
      if(sourceArr[i][idKey]==value){
        name = sourceArr[i][nameKey];
      }
    }
    return name;
  },

  /**
   * 设置权限
   * @param {Array|Object} data
   * @param {String} options.setting  拥有权限列表的key
   * @param {String} options.use  判断是否使用的key
   * @param {String} options.source  权限判断的值,默认是用户类型
   * @return {Array|Object} editdata
   */
  setAuth(data,options){
    options = Object.assign({setting:'setting',use:'use'},options);
    let source = options.source||comm.osg.getUserType().type;
    let {use,setting} = options;
    if(data instanceof Array){
      let temp = data.map(item=>{
        item[use||'use'] = (item[setting||'setting']||[]).includes(source);
        return item;
      });
      return temp;
    }else if(data instanceof Object){
      if(data[setting||'setting']){
        data[use||'use'] = data[setting||'setting'].includes(source);
      }else{
        for(let key in data) {
          if(data[key][setting||'setting']){
            data[key][use||'use'] = data[key][setting || 'setting'].includes(source)
          }
        }
      }
      return data;
    }
  },

}
//数字 加减
export default { ...util}
