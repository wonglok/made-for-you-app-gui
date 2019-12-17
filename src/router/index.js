import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [

  {
    path: '',
    component: () => import(/* webpackChunkName: "tabapp" */ '../views-ui/TabApp.vue'),
    children: [
      {
        path: '/',
        name: 'intro',
        component: () => import(/* webpackChunkName: "intro" */ '../views/Intro.vue')
      },
      {
        path: '/home',
        name: 'home',
        component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
      },
      {
        path: '/lok',
        name: 'lok',
        // route level code-splitting
        // this generates a separate chunk (lok.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "lok" */ '../views/GL.vue')
      },
      {
        path: '/create',
        name: 'create',
        // route level code-splitting
        // this generates a separate chunk (create.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "create" */ '../views/CreateList.vue')
      },
      {
        path: '/save',
        name: 'save',
        // route level code-splitting
        // this generates a separate chunk (save.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "save" */ '../views/Save.vue')
      },
      {
        path: '/inspire',
        name: 'inspire',
        // route level code-splitting
        // this generates a separate chunk (inspire.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
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
