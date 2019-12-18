import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'intro',
    component: () => import(/* webpackChunkName: "intro" */ '../views/Intro.vue')
  },
  {
    path: '',
    component: () => import(/* webpackChunkName: "intro" */ '../views-ui/AppBox.vue'),
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
      },
      // {
      //   path: '/lok',
      //   name: 'lok',
      //   component: () => import(/* webpackChunkName: "lok" */ '../views/GL.vue')
      // },
      {
        path: '/create',
        name: 'create',
        component: () => import(/* webpackChunkName: "create" */ '../views/LetsCreate.vue')
      },
      {
        path: '/give',
        name: 'give',
        component: () => import(/* webpackChunkName: "give" */ '../views/Give.vue')
      },
      {
        path: '/inspire',
        name: 'inspire',
        component: () => import(/* webpackChunkName: "inspire" */ '../views/Inspire.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
