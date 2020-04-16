import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

/**
 * [异步组件加载函数]
 * @param  {[string]} name [组件名称]
 * @return {[promise]}      [组件]
 */

const asyncPage = (name) => {
  return resolve => require([`@/page/${name}`], resolve);
}

const Home = asyncPage("Home");

const router = new VueRouter({
  routes: [
      { 
        path: "/",
        name: "home",
        component: Home
      }
  ]
})

//全局路由守卫导航
// router.beforeEach((to, from, next) => {})

export default router
