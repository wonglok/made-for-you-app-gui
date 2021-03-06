import Vue from 'vue'
import VueRouter from 'vue-router'
import * as API from '../api/api.js'

Vue.use(VueRouter)

let checkLogin = async (to, from, next) => {
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
}

const routes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "first" */ '../views/HomePage.vue')
  },
  {
    path: '/system',
    beforeEnter: (to, from, next) => {
      window.location.assign('https://api-ec2-3-91-80-85.creativecodelab.com/admin')
    }
  },
  {
    path: '/about',
    component: () => import(/* webpackChunkName: "first" */ '../views/AboutPage.vue')
  },
  {
    path: '/connect',
    component: () => import(/* webpackChunkName: "first" */ '../views/ConnectPage.vue')
  },
  {
    path: '/profile',
    beforeEnter: checkLogin,
    component: () => import(/* webpackChunkName: "first" */ '../views/ProfilePage.vue')
  },
  {
    path: '/admin',
    beforeEnter: checkLogin,
    component: () => import(/* webpackChunkName: "first" */ '../views/CardAdminPage.vue')
  },
  {
    path: '/site-editor/:siteID',
    beforeEnter: checkLogin,
    component: () => import(/* webpackChunkName: "second" */ '../views/SiteEditorPage.vue')
  },
  {
    path: '/site-id/:siteID',
    component: () => import(/* webpackChunkName: "second" */ '../views/PreviewiFrame.vue')
  },
  {
    path: '/inside-iframe/:siteID',
    component: () => import(/* webpackChunkName: "second" */ '../views/SiteViewerPage.vue')
  },
  {
    path: '/runner.html',
    component: () => import(/* webpackChunkName: "second" */ '../views/SiteViewerPage.vue')
  }
  // {
  //   path: '/inside-inventory/:itemID',
  //   component: () => import(/* webpackChunkName: "second" */ '../views/InvetoryViewerPage.vue')
  // }

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
