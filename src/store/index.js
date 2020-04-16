import Vue from 'vue'
import Vuex from 'vuex'
import home from './home'

Vue.use(Vuex)

export default new Vuex.Store({
  //模块化
  modules: {
      home
    }
})
