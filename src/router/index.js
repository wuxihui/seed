import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

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
      component: () => import("../pages/plate/PlateManagement.vue")
    },
    {
      path: "/cacheMessage",
      name: "cacheMessage",
      component: () => import('../pages/system/CacheMessage.vue')
    },
    {
      path: "/warZoneComponent",
      name: "warZoneComponent",
      component: () => import("../pages/plate/WarZoneComponent.vue")
    },
    {
      path: "/radarMessage",
      name: "radarMessage",
      component: () => import("../pages/radar/RadarMessage.vue")
    },
    {
      path: "/radarComShareMessage",
      name: "radarComShareMessage",
      component: () => import("../pages/radar/RadarComShareMessage.vue")
    },
    {
      path: "/operaTionLog",
      name: "operaTionLog",
      component: () => import("../pages/indexAlgorithm/OperaTionLog.vue")
    },
    {
      path: "/plateList",
      name: "plateList",
      component: () => import("../pages/plate/PlateList.vue")
    },
    {
      path: "/plateComponent",
      name: "plateComponent",
      component: () => import("../pages/plate/PlateComponent.vue")
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
