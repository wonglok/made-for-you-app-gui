import BezierEasing from 'bezier-easing'
import VueRouter from 'vue-router'
import Vue from 'vue'
// import Entry from '../views-preview/Kit-Preview/Entry.vue'
// import CP from '../views-preview/index.js'

export const bezierMaker = ([b0, b1, b2, b3]) => {
  return BezierEasing(b0, b1, b2, b3)
}

export const makePreviewer = async ({ app, mounter, previewPageKey }) => {
  let api = {
    vue: false,
    router: false,
    app
  }
  let routes = []

  let initMods = (moduleItem, code) => {
    let env = {
      moduleName: moduleItem.key,
      codeName: code.key,
      codeVal: code.value,
      async run () { return code.value },
      clean () {},
      app,
      modules:
      app.modules,
      module: moduleItem,
      code
    }
    // eslint-disable-next-line
    let starterFn = new Function('env', `
      (async function(){
        ${code.value}
      }())
    `)
    starterFn(env)

    return env
  }

  let myModules = {}
  for (var knmods in app.modules) {
    let mod = app.modules[knmods]
    myModules[mod.key] = myModules[mod.key] || {}
    for (var kncode in mod.codes) {
      let code = mod.codes[kncode]
      myModules[mod.key][code.key] = initMods(mod, code)
    }
  }

  app.modules.filter(e => e.type === 'page').forEach((mod) => {
    routes.push({
      path: `/${mod.key}`,
      component: {
        template: `<div ref="page" class="full"></div>`,
        data () {
          return {
            main: mod.codes.find(c => c.key === 'main')
          }
        },
        async beforeDestroy () {
          let main = this.main
          let env = myModules[mod.key][main.key]
          env.clean()
        },
        async mounted () {
          let main = this.main
          if (main) {
            let env = myModules[mod.key][main.key]
            await env.run({
              getEnv: (mk, ck) => {
                return myModules[mk][ck]
              },
              myModules,
              router,
              route: this.$route,
              mounter: this.$refs['page'],
              page: mod,
              pageKey: mod.key
            })
          } else {
          }
        }
      }
    })
  })

  routes.push({
    path: '/404',
    component: {
      template: `<div class="full flex justify-center items-center">Home Not Found</div>`
    }
  })
  routes.push({
    path: '/needs-to-add-mainjs',
    component: {
      template: `<div class="full flex justify-center items-center">Please add main.js</div>`
    }
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
      if (previewPageKey) {
        router.push('/' + previewPageKey)
      } else {
        router.push('/404')
      }
    }
  }).$mount(mounter)

  return api
}
