import BezierEasing from 'bezier-easing'
import VueRouter from 'vue-router'
import Vue from 'vue'
// import Entry from '../views-preview/Kit-Preview/Entry.vue'
// import CP from '../views-preview/index.js'

export const bezierMaker = ([b0, b1, b2, b3]) => {
  return BezierEasing(b0, b1, b2, b3)
}

export const makePreviewer = async ({ app, mounter }) => {
  let api = {
    vue: false,
    router: false,
    app
  }
  let routes = [
    {
      path: '/404-home',
      component: {
        template: `<div class="full flex">Home Not Found</div>`
      }
    }
  ]

  app.modules.filter(m => m.type === 'page').forEach((pageMod) => {
    routes.push({
      path: `/${pageMod.key}`,
      component: {
        template: `<div ref="page" class="full">home</div>`,
        mounted () {
          let main = pageMod.codes.find(c => c.key === 'main' && c.type === 'js')
          // eslint-disable-next-line
          let fn = new Function('env', main.value)
          fn({ app })
        }
      }
    })
  })

  let router = api.router = new VueRouter({
    mode: 'abstract',
    base: process.env.BASE_URL,
    routes
  })

  api.vue = new Vue({
    data () {
      return {
        api: api
      }
    },
    router: router,
    template: `<router-view></router-view>`,
    mounted () {
      let home = app.modules.find(m => m.key === 'home')
      if (home) {
        router.push('/home')
      } else {
        router.push('/404-home')
      }
    }
  }).$mount(mounter)

  return api
}
