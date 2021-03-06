import Vue from 'vue'
import VueRouter from 'vue-router'
import footTabbar from './footTabbar'
Vue.use(VueRouter)

const routes = [{
    path: "/",
    redirect: "/login"
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import("@/views/login"),
    meta: {
      title: "登录",
    }
  },
  ...footTabbar
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
