import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      auth:{
        home:{
          viewShow:false
        },
        index:{
          lock:false
        }
      }
  },
  mutations: {

  },
  actions: {

  }
})
