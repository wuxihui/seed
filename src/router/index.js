import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: "/",
      name: "login",
      component: () => import('../pages/Login.vue')
    },
    {
    path: "/index",
    name: "",
    component: () => import('../pages/Index.vue'),
    children: [{
      path: "/system",
      name: "system",
      component: () => import('../pages/System.vue')
    },
    {
      path: "/resources",
      name: "resources",
      component: () => import('../pages/Resources.vue')
    },
    {
      path: "/teach",
      name: "teach",
      component: () => import('../pages/Teach.vue')
    },
    {
      path: "/content",
      name: "content",
      component: () => import('../pages/Content.vue')
    },
    {
      path: "/approval",
      name: "approval",
      component: () => import('../pages/Approval.vue')
    },
    {
      path: "/propaganda",
      name: "propaganda",
      component: () => import('../pages/Propaganda.vue')
    }, 
    {
      path: "/operate",
      name: "operate",
      component: () => import('../pages/Operate.vue')
    },
    {
      path: "/column",
      name: "column",
      component: () => import('../pages/Column.vue')
    },
    {
      path: "/interface",
      name: "interface",
      component: () => import('../pages/Interface.vue')
    },
    {
      path: "/liveBroadcast",
      name: "liveBroadcast",
      component: () => import('../pages/LiveBroadcast.vue')
    },
    {
      path: "/warZone",
      name: "warZone",
      component: () => import('../pages/toolMessage/WarZone.vue')
    },
    {
      path: "/radar",
      name: "radar",
      component: () => import('../pages/toolMessage/Radar.vue')
    },
    {
      path: "/radarComponent",
      name: "radarComponent",
      component: () => import('../pages/toolMessage/RadarComponent.vue')
    }
    ]
  }
]
})

//全局路由守卫导航
// router.beforeEach((to, from, next) => {})

export default router
