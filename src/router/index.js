import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'intro',
    component: () => import(/* webpackChunkName: "first" */ '../views/Intro.vue')
  },
  {
    path: '',
    component: () => import(/* webpackChunkName: "first" */ '../views-ui/AppBox.vue'),
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import(/* webpackChunkName: "first" */ '../views/Home.vue')
      },
      // {
      //   path: '/lok',
      //   name: 'lok',
      //   component: () => import(/* webpackChunkName: "first" */ '../views/GL.vue')
      // },
      {
        path: '/create',
        name: 'create',
        component: () => import(/* webpackChunkName: "first" */ '../views/LetsCreate.vue')
      },
      {
        path: '/give',
        name: 'give',
        component: () => import(/* webpackChunkName: "first" */ '../views/Give.vue')
      },
      {
        path: '/inspire',
        name: 'inspire',
        component: () => import(/* webpackChunkName: "first" */ '../views/Inspire.vue')
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
