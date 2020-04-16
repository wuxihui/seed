import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/base.less'
import router from './router'
import store from './store'
import commonJS from './common/js'
import _ from "lodash"


Vue.config.productionTip = false

Vue.use(ElementUI)

Vue.prototype.commonJS = commonJS;
Vue.prototype.ElementUI = ElementUI;

Vue.prototype._ = _;

window.vue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')