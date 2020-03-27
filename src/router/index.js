import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

/**
 * [异步组件加载函数]
 * @param  {[string]} name [组件名称]
 * @return {[promise]}      [组件]
 */

const asyncPages = (name) => {
  return resolve => require([`@/pages/${name}`], resolve);
}

const RadarMessage = asyncPages("radar/RadarMessage");
const RadarComShareMessage = asyncPages("radar/RadarComShareMessage");
const PlateManagement = asyncPages("plate/PlateManagement");
const WarZoneComponent = asyncPages("plate/WarZoneComponent");
const PlateList = asyncPages("plate/PlateList");
const PlateComponent = asyncPages("plate/PlateComponent");
const CacheMessage = asyncPages("system/CacheMessage");
const OperaTionLog = asyncPages("indexAlgorithm/OperaTionLog");

const router = new VueRouter({
  routes: [
    {
    path: "/",
    name: "index",
    component: () => import('../pages/Index.vue'),
    children: [
    {
      path: "/plateManagement",
      name: "plateManagement",
      component: PlateManagement
    },
    {
      path: "/cacheMessage",
      name: "cacheMessage",
      component: CacheMessage
    },
    {
      path: "/warZoneComponent",
      name: "warZoneComponent",
      component: WarZoneComponent
    },
    {
      path: "/radarMessage",
      name: "radarMessage",
      component: RadarMessage
    },
    {
      path: "/radarComShareMessage",
      name: "radarComShareMessage",
      component: RadarComShareMessage
    },
    {
      path: "/operaTionLog",
      name: "operaTionLog",
      component: OperaTionLog
    },
    {
      path: "/plateList",
      name: "plateList",
      component: PlateList
    },
    {
      path: "/plateComponent",
      name: "plateComponent",
      component: PlateComponent
    },
    {
      path: "*",
      redirect: "/plateManagement"
    }
    ]
  }
]
})

//全局路由守卫导航
// router.beforeEach((to, from, next) => {})

export default router
