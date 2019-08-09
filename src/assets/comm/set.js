let set = {
  home:{
    menu:[
      {
        name:'calendar',
        index:"1",
        path:'/calendar'
      },{
        name:'我的工作台',
        index:"2",
        path:'/',
        child:[
          { name:'地图',index:"1",path:'mapg' },
          { name:'选项二',index:"2",path:'/' },
        ]
      },{
        name:'消息中心',
        index:"3",
        path:'/about'
      }
    ]
  },
  map:{
    // 高德地图 key
    key:"5d20f670d207ac0bf8868daf78d9da8f"
  }
}

export default { set }
