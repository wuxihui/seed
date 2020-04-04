import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/base.less'
import router from './router'
import store from './store'
import moment from 'moment'
import _ from "lodash"

Vue.config.productionTip = false

Vue.use(ElementUI)

Vue.prototype.message = function(msg, type) {
  //信息提示
  if(msg && type) {
    return  ElementUI.Message({
        message: msg,
        type: type,
        offset: window.innerHeight / 2,
        duration: 1000
      });
  } else if(!msg && !type) {
    return "";
  }
}

Vue.prototype.formatCreateUpTime = function(time) {
  //TODO:时区修正
  if(time) {
    return  moment(time).format("YYYY-MM-DD");
  } else {
    return "";
  }
}

Vue.prototype.formatBuildTime = function(time) {
  //TODO:时区修正
  if(time) {
    return moment(time).format("YYYY-MM-DD HH:mm:ss");
  } else {
    return "";
  }
}

Vue.prototype._ = _;

window.vue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')