import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "first" */ '../views/Home.vue')
  },
  {
    path: '/about',
    component: () => import(/* webpackChunkName: "first" */ '../views/About.vue')
  },
  {
    path: '/my-cards',
    component: () => import(/* webpackChunkName: "first" */ '../views/MyCards.vue')
  },
  {
    path: '/connect',
    component: () => import(/* webpackChunkName: "first" */ '../views/Connect.vue')
  },
  {
    path: '/admin',
    // beforeEnter: (to, from, next) => {
    // },
    component: () => import(/* webpackChunkName: "first" */ '../views/CardAdmin.vue')
  },
  {
    path: '/card-maker/:cardID',
    component: () => import(/* webpackChunkName: "first" */ '../views/CardMaker.vue')
  }
  // {
  //   path: '',
  //   component: () => import(/* webpackChunkName: "first" */ '../views-ui/AppBox.vue'),
  //   children: [
  //     {
  //       path: '/home',
  //       name: 'home',
  //       component: () => import(/* webpackChunkName: "first" */ '../views/Home.vue')
  //     },

  //     // {
  //     //   path: '/lok',
  //     //   name: 'lok',
  //     //   component: () => import(/* webpackChunkName: "first" */ '../views/GL.vue')
  //     // },
  //     {
  //       path: '/create',
  //       name: 'create',
  //       component: () => import(/* webpackChunkName: "first" */ '../views/LetsCreate.vue')
  //     },
  //     {
  //       path: '/give',
  //       name: 'give',
  //       component: () => import(/* webpackChunkName: "first" */ '../views/Give.vue')
  //     },
  //     {
  //       path: '/inspire',
  //       name: 'inspire',
  //       component: () => import(/* webpackChunkName: "first" */ '../views/Inspire.vue')
  //     },
  //     {
  //       path: '/contact',
  //       name: 'contact',
  //       component: () => import(/* webpackChunkName: "first" */ '../views/Contact.vue')
  //     }
  //   ]
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
