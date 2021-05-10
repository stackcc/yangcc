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
        target[p] = source[p]
      }
    }
    return target
  },

  json2Form: function (json) {
    var str = []
    for (var p in json) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(json[p]))
    }
    return str.join('&')
  },

  // 邮箱验证
  checkEmail: function (v) {
    var filter = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
    return filter.test(v)
  },

  // 手机号码验证
  tel: function (v) {
    return /^1\d{10}$/.test(v)
  },

  /**
   * 电话号码验证
   * @param{string} s 电话号码
   * @return boolean
   */
  isPhone(s) {
    return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(s)
  },

  // 验证网址
  uniform: function (v, type) {
    let reg = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])/
    let reg1 = /[hHtTpPsS]{4,5}:\/\/[\S]+[\s\n\t]*/
    if (type == 'outLink') {
      let arr = [
        'mp.weixin.qq.com'
      ]
      let bool = false
      for (let i = 0, j = arr.length; i < j; i++) {
        if (v.indexOf(arr[i]) != -1) {
          bool = true
          break
        }
      }
      let regBool = reg1.test(v)
      console.log(regBool)
      if (regBool && bool) {
        bool = true
      } else {
        bool = false
      }
      return bool
    } else {
      return reg.test(v)
    }
  },

  // 合法uri
  validateUrl(textval) {
    const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
    return urlregex.test(textval)
  },

  // 验证身份证
  checkIDCard: function (v) {
    var isIDCard1 = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
    if (isIDCard1.test(v)) {
      var card = v.slice(6, 10)
      var data = new Date()
      var year = data.getFullYear()
      var num = year - card
      if (num > 18) {
        return true
      } else {
        return false
      }
    }
  },

  /**
   * 判断身份证号码
   * @param name
   * @return {*}
   */
  cardid(code) {
    let list = [];
    let result = true;
    let msg = '';
    var city = {"11":"北京","12":"天津","13":"河北","14":"山西","15":"内蒙古","21":"辽宁","22":"吉林","23":"黑龙江 ","31":"上海","32":"江苏","33":"浙江","34":"安徽","35":"福建","36":"江西","37":"山东","41":"河南","42":"湖北 ","43":"湖南","44":"广东","45":"广西","46":"海南","50":"重庆","51":"四川","52":"贵州","53":"云南","54":"西藏 ","61":"陕西","62":"甘肃","63":"青海","64":"宁夏","65":"新疆","71":"台湾","81":"香港","82":"澳门","91":"国外 "};
    if (!this.isnull(code)) {
      if (code.length == 18) {
        if (!code || !/(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(code)) {
          msg = "证件号码格式错误";
        } else if (!city[code.substr(0, 2)]) {
          msg = "地址编码错误";
        } else {
          //18位身份证需要验证最后一位校验位
          code = code.split('');
          //∑(ai×Wi)(mod 11)
          //加权因子
          var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
          //校验位
          var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2, 'x'];
          var sum = 0;
          var ai = 0;
          var wi = 0;
          for (var i = 0; i < 17; i++) {
            ai = code[i];
            wi = factor[i];
            sum += ai * wi;
          }
          if (parity[sum % 11] != code[17]) {
            msg = "证件号码校验位错误";
          } else {
            result = false;
          }

        }
      } else {
        msg = "证件号码长度不为18位";
      }

    } else {
      msg = "证件号码不能为空";
    }
    list.push(result);
    list.push(msg);
    return list;
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

  // 打印，调试
  log: function (msg, type, styleCss) {
    if (!setup.log.disabled) {
      switch (type) {
        case 'time': // 运行时间
          console.time()
          break
        case 'timeEnd':
          console.timeEnd()
          break
        case 'profile': // 代码性能分析器
          console.profile()
          break
        case 'profileEnd':
          console.profileEnd()
          break
        case 'warn':
          console.warn(msg)
          break
        case 'error':
          console.error(msg)
          break
        case 'info':
          console.info(msg)
          break
        case 'dir':
          console.dir(msg)
          break
        case 'table':
          console.table(msg)
          break
        case 'color':
          styleCss = styleCss || 'background:linear-gradient(to right, red, purple);-webkit-background-clip: text;color: white;'
          console.log('%c' + msg, styleCss)
          break
        default:
          console.log(msg)
      }
    }
  },

  /**
   *  时间格式化
   * @param {Date} time
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
    let _Date = new Date(time);
    let result,
    y = _Date.getFullYear(),
    m = _Date.getMonth()+1,
    d = _Date.getDate(),
    h = _Date.getHours(),
    min = _Date.getMinutes(),
    sec = _Date.getSeconds();
    switch (type){
      case 'datetime':
        result =  y +'-'+
          (m <10 ? '0'+m : m) +'-'+
          (d <10 ? '0'+d : d) +' '+
          (h <10 ? '0'+h : h)+':'+
          (min <10 ? '0'+min : min)+':'+
          (sec <10 ? '0'+sec : sec);
        break;
      case 'date':
        result =  y +'-'+
          (m <10 ? '0'+m : m) +'-'+
          (d <10 ? '0'+d : d) +'';
        break;
      case 'time':
        result =  (h <10 ? '0'+h : h)+':'+
          (min <10 ? '0'+min : min)+':'+
          (sec <10 ? '0'+sec : sec);
        break;
    }
    return result;
  },

  /**
   *  动态时间
   * @param {Date} time
   * @return {string}
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
   *  数组对象深复制
   * @param {array||object} data
   * @return {array||object}
   */
  deepCopy: function (data) {
    let res = data instanceof Array?[]:{};
    for(let key in data){
      res[key] = data[key] instanceof Object?this.deepCopy(data[key]):data[key];
    }
    return res;
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

  /**
   * url 转义函数
   * @param {String} url
   * @param {String} type
   */
  transfer:function(url,type){
    if(type == 'reverse'){
      url = url.replace(/%3F/g,'?');
      url = url.replace(/%2F/g,'/');
      url = url.replace(/%26/g,'&');
      url = url.replace(/%3D/g,'=');
    }else{
      url = url.replace(/\?/g,'%3F');
      url = url.replace(/\//g,'%2F');
      url = url.replace(/\&/g,'%26');
      url = url.replace(/\=/g,'%3D');
    }
    return url;
  },

  /**
   * 格式转换  url 《=》 对象
   * @param {Object||String} data
   */
  urlFormat:function(data){
    if(typeof data == 'string'){
      data = '???'+ data;
      data = data.replace(/\?{3,}/g,'');
      let arr = data.split('&');
      let obj = {};
      arr.forEach(item=>{
        let subArr = item.split("=");
        obj[subArr[0]] = subArr[1];
      });
      return obj;
    }else if(typeof data == 'object'){
      let arr = [];
      for(let key in data){
        arr.push(key+'='+data[key]);
      }
      let str = arr.join('&');
      return str||'';
    }
  },

  /**
   * 判断是否为空
   * @param {*} val
   * @return {boolean}
   */
  isnull(val) {
    if (typeof val == 'boolean') {
      return false;
    }
    if (typeof val == 'number') {
      return false;
    }
    if (val instanceof Array) {
      if (val.length == 0) return true;
    } else if (val instanceof Object) {
      if (JSON.stringify(val) === '{}') return true;
    } else {
      if (val == 'null' || val == null || val == 'undefined' || val == undefined || val == '') return true;
      return false
    }
    return false
  },

  // 关闭页面
  close() {
    if (navigator.userAgent.indexOf("MSIE") > 0) {
      if (navigator.userAgent.indexOf("MSIE 6.0") > 0) {
        window.opener = null; window.close();
      }
      else {
        window.open('', '_top'); window.top.close();
      }
    }
    else if (navigator.userAgent.indexOf("Firefox") > 0) {
      window.location.href = 'about:blank '; //火狐默认状态非window.open的页面window.close是无效的
      //window.history.go(-2);
    }
    else {
      window.opener = null;
      window.open('', '_self', '');
      window.close();
    }
  },
  // 金额数字转大写
  changeNumMoneyToChinese(money) {
    var cnNums = new Array("零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"); //汉字的数字
    var cnIntRadice = new Array("", "拾", "佰", "仟"); //基本单位
    var cnIntUnits = new Array("", "万", "亿", "兆"); //对应整数部分扩展单位
    var cnDecUnits = new Array("角", "分", "毫", "厘"); //对应小数部分单位
    var cnInteger = "整"; //整数金额时后面跟的字符
    var cnIntLast = "元"; //整型完以后的单位
    var maxNum = 999999999999999.9999; //最大处理的数字
    var IntegerNum; //金额整数部分
    var DecimalNum; //金额小数部分
    var ChineseStr = ""; //输出的中文金额字符串
    var parts; //分离金额后用的数组，预定义
    var Symbol = "";//正负值标记
    if (money == "") {
      return "";
    }

    money = parseFloat(money);
    if (money >= maxNum) {
      console.log('超出最大处理数字');

      return "";
    }
    if (money == 0) {
      ChineseStr = cnNums[0] + cnIntLast + cnInteger;
      return ChineseStr;
    }
    if (money < 0) {
      money = -money;
      Symbol = "负 ";
    }
    money = money.toString(); //转换为字符串
    if (money.indexOf(".") == -1) {
      IntegerNum = money;
      DecimalNum = '';
    } else {
      parts = money.split(".");
      IntegerNum = parts[0];
      DecimalNum = parts[1].substr(0, 4);
    }
    if (parseInt(IntegerNum, 10) > 0) { //获取整型部分转换
      var zeroCount = 0;
      var IntLen = IntegerNum.length;
      for (var i = 0; i < IntLen; i++) {
        var n = IntegerNum.substr(i, 1);
        var p = IntLen - i - 1;
        var q = p / 4;
        var m = p % 4;
        if (n == "0") {
          zeroCount++;
        }
        else {
          if (zeroCount > 0) {
            ChineseStr += cnNums[0];
          }
          zeroCount = 0; //归零
          ChineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
        }
        if (m == 0 && zeroCount < 4) {
          ChineseStr += cnIntUnits[q];
        }
      }
      ChineseStr += cnIntLast;
      //整型部分处理完毕
    }
    if (DecimalNum != '') { //小数部分
      var decLen = DecimalNum.length;
      for (var i = 0; i < decLen; i++) {
        var n = DecimalNum.substr(i, 1);
        if (n != '0') {
          ChineseStr += cnNums[Number(n)] + cnDecUnits[i];
        }
      }
    }
    if (ChineseStr == '') {
      ChineseStr += cnNums[0] + cnIntLast + cnInteger;
    } else if (DecimalNum == '') {
      ChineseStr += cnInteger;
    }
    ChineseStr = Symbol + ChineseStr;

    return ChineseStr;
  }

}
// 数字 加减
export default { ...util }
