import Vue from 'vue'
import VueRouter from 'vue-router'
import * as API from '../api/api.js'

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
    path: '/profile',
    beforeEnter: async (to, from, next) => {
      if (await API.checkLogin()) {
        next()
      } else {
        next({
          path: '/connect',
          query: {
            redirect: to.fullPath
          }
        })
      }
    },
    component: () => import(/* webpackChunkName: "first" */ '../views/Profile.vue')
  },
  {
    path: '/connect',
    component: () => import(/* webpackChunkName: "first" */ '../views/Connect.vue')
  },
  {
    path: '/admin',
    component: () => import(/* webpackChunkName: "first" */ '../views/CardAdmin.vue')
  },
  {
    path: '/site-editor/:slug/:siteID',
    component: () => import(/* webpackChunkName: "second" */ '../views/SiteEditorPage.vue')
  }

  // ,
  // {
  //   path: '/builder/:siteID',
  //   component: () => import(/* webpackChunkName: "first" */ '../views/SiteBuilder.vue')
  // }

  // {
  //   path: '/site/:slug',
  //   component: () => import(/* webpackChunkName: "first" */ '../views/SiteViewer.vue')
  // }

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
