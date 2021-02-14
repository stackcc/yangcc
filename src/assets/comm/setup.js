// 权限数据至少应该包括路由权限和资源权限。
let setup = {
  app: {
    bg: 'image/92.jpg'
  },
  home: {
    menu: [
      {
        name: '首页',
        index: '10',
        path: '/stack'
      },
      {
        name: 'calendar',
        index: '11',
        path: '/calendar'
      }, {
        name: '我的工作台',
        index: '12',
        path: '/',
        child: [
          { name: '地图', index: '1', path: 'mapg' },
          { name: '选项二', index: '2', path: '/' }
        ]
      }, {
        name: '消息中心',
        index: '13',
        path: '/about'
      }
    ]
  },
  map: {
    // 高德地图 key
    key: '5d20f670d207ac0bf8868daf78d9da8f'
  },
  log: {
    disabled: false
  },
  particles: {
    color: '#dedede', // String类型。默认'#dedede'。粒子颜色。
    particleOpacity: 0.7, // Number类型。默认。粒子透明度。
    particlesNumber: 10, // Number类型。默认80。粒子数量。
    shapeType: 'circle', // String类型。默认'circle'。可用的粒子外观类型有：'circle', 'edge', 'triangle', 'polygon', 'star'。
    particleSize: 80, // Number类型。默认80。单个粒子大小。
    linesColor: '#dedede', // String类型。默认'#dedede'。线条颜色。
    linesWidth: 1, // Number类型。默认1。线条宽度。
    lineLinked: true, // 布尔类型。默认true。连接线是否可用。
    lineOpacity: 0.4, // Number类型。默认0.4。线条透明度。
    linesDistance: 150, // Number类型。默认150。线条距离。
    moveSpeed: 5, // Number类型。默认3。粒子运动速度。
    hoverEffect: true, // 布尔类型。默认true。是否有hover特效。
    hoverMode: true, // String类型。默认true。可用的hover模式有:  // 'grab', 'repulse', 'bubble'。
    clickEffect: true, // 布尔类型。默认true。是否有click特效。
    clickMode: true // String类型。默认true。可用的click模式有: 'push', 'remove', 'repulse', 'bubble'。
  },
  api: {
    baseUrlDev: 'http://antsman.cn:3000',
    // baseUrlDev:'http://localhost:3000',
    baseUrlPro: 'http://antsman.cn:3000'
  },
  cc: {
    view: true,
    ajax: true,
    cc: true
  },
  theway: {
    menu: [
      { name: '插入API模板', type: 'el-button', attr: 'plain', size: 'small', visable: true },
      { name: '插入表格模板', type: 'el-button', attr: 'plain', size: 'small', visable: true },
      { name: '格式化json', type: 'el-button', attr: 'plain', size: 'small', visable: true }
    ],
    template: {
      api_doc_template: '\n    \n**简要描述：** \n\n- 用户注册接口\n\n**请求URL：** \n- ` http://xx.com/api/user/register `\n  \n**请求方式：**\n- POST \n\n**参数：** \n\n|参数名|必选|类型|说明|\n|:----    |:---|:----- |-----   |\n|username |是  |string |用户名   |\n|password |是  |string | 密码    |\n|name     |否  |string | 昵称    |\n\n **返回示例**\n\n``` \n  {\n    "error_code": 0,\n    "data": {\n      "uid": "1",\n      "username": "12154545",\n      "name": "吴系挂",\n      "groupid": 2 ,\n      "reg_time": "1436864169",\n      "last_login_time": "0",\n    }\n  }\n```\n\n **返回参数说明** \n\n|参数名|类型|说明|\n|:-----  |:-----|-----                           |\n|groupid |int   |用户组id，1：超级管理员；2：普通用户  |\n\n **备注** \n\n- 更多返回错误代码请看首页的错误代码描述\n\n\n',
      database_doc_template: '\n    \n-  用户表，储存用户信息\n\n|字段|类型|空|默认|注释|\n|:----    |:-------    |:--- |-- -|------      |\n|uid    |int(10)     |否 |  |             |\n|username |varchar(20) |否 |    |   用户名  |\n|password |varchar(50) |否   |    |   密码    |\n|name     |varchar(15) |是   |    |    昵称     |\n|reg_time |int(11)     |否   | 0  |   注册时间  |\n\n- 备注：无\n\n\n',
      json_beautify (t) {
        return '\n ``` \n ' + JSON.parse(t) + ' \n\n ```\n\n'
      }

    }
  }

}

export default { ...setup }
