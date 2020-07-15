import Vue from 'vue'
import Router from 'vue-router'
import Stack from './views/stack.vue'
import Home from './views/Home.vue'
import Index from './views/index.vue'
import MapG from './views/map-g.vue'
import Calendar from './views/calendar.vue'
import Css3 from './views/css3.vue'
import Qrcode from './views/qrcode.vue'
import Theway from './views/theway.vue'
import Way from './views/way.vue'
import WayDetail from './views/wayDetail.vue'
import Lotto from './views/lotto.vue'

Vue.use(Router);
let routes = [
  // 注释
  // { path: '/user/:id/name/:name',
  //   redirect: to => {},
  //   component: Home,
  //   meta: { requiresAuth: true },
  //   beforeEnter: (to, from, next) => {
  //     // 守卫
  //   },
  //   children: [
  //     { path: '/home', name: 'home', component: Home }
  //   ]
  // },

  // 正式数据
  { path: '/', name: 'stack', component: Stack },
  { path: '/stack', name: 'stack', component: Stack },
  { path: '/home',
    name: 'home',
    component: Home,
    children: [
      { path: '/mapg', name: 'mapg', component: MapG },
      { path: '/calendar', name: 'calendar', component: Calendar }
    ]
  },
  { path: '/about', name: 'about', component: () => import('./views/About.vue') },
  { path: '/css3', name: 'css3', component: Css3 },
  { path: '/qrcode', name: 'qrcode', component: Qrcode },
  { path: '/theway', name: 'theway', component: Theway },
  { path: '/way', name: 'way', component: Way },
  { path: '/waydetail', name: 'waydetail', component: WayDetail },
  { path: '/lotto', name: 'lotto', component: Lotto },


];

/**
 * 批量导入
 * @param r
 */
function importPages(r){
  r.keys().forEach(key=>{
    routes.push({path:(key.split('.')[1]),name:((key.split(/[.\/]/))[2]),component:()=>r(key)})
  })
}
importPages(require.context('./views/threejs',true,/\.vue$/,'lazy'));
importPages(require.context('./views/test',true,/\.vue$/,'lazy'));
importPages(require.context('./views/doc',true,/\.vue$/,'lazy'));

const router = new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior (to, from, savedPosition) {
    // 滚动位置
    if (savedPosition) { // 后退/前进按钮
      return savedPosition
    } else if (to.hash) {
      return {
        selector: to.hash
        // , offset: { x: 0, y: 10 }
      }
    } else {
      return { x: 0, y: 0 }
    }
  }
});

// 守卫
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    // if (!auth.loggedIn()) {
    // if (1) {
    //   next({
    //     path: '/login',
    //     query: { redirect: to.fullPath }
    //   })
    // }
    next()
  } else {
    next() // make sure to always call next()!
  }
})
// 注册全局
// router.beforeResolve((to, from) => {
//   // `to` and `from` are both route objects
// })

// router.beforeRouteEnter((to, from, next) => { next() })
// router.beforeRouteUpdate((to, from, next) => { next() })
// // 防止用户意外离开未保存修改的路线
// router.beforeRouteLeave((to, from, next) => {
//   const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
//   if (answer) {
//     next()
//   } else {
//     next(false)
//   }
// })

// 调用
// this.$router.push(location, onComplete?, onAbort?)
// this.$router.replace(location, onComplete?, onAbort?)
// this.$router.go(n)



export default router
