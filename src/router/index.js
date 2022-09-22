import { createRouter, createWebHistory } from "vue-router"
import { useAdminStore } from "../stores/admin.js"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "root",
      redirect: "adminlogin",
    },
    {
      path: "/adminlogin",
      name: "adminlogin",
      components: {
        body: () => import('../views/Main/body/AdminLogin.vue')
      },
      beforeEnter:()=>{
        const admin=useAdminStore()
        if(admin.isLogin){
          return {path:'/admin'}
        }
        else return true
      }
    },
    {
      path: "/admin",
      name: "admin",
      components: {
        body: () =>import('../views/Main/body/Admin.vue')
      },
      beforeEnter:()=>{
        const admin=useAdminStore()
        if(admin.isLogin){
          return true
        }
        else return {path:'/adminlogin'}
      }
    }
    // {
    //   path: "/",
    //   name: "home",
    //   component: () => import("../views/AboutView.vue"),
    // },
    // {
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import("../views/AboutView.vue"),
    // },
  ],
})

export default router
