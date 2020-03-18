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
      path: "/plateManagement",
      name: "plateManagement",
      component: () => import("../pages/plate/PlateManagement.vue")
    },
    {
      path: "/customSectionManage",
      name: "customSectionManage",
      component: () => import("../pages/customPlate/CustomSectionManage.vue")
    }
    ]
  }
]
})

//全局路由守卫导航
// router.beforeEach((to, from, next) => {})

export default router
