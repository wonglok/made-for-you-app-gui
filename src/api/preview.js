import BezierEasing from 'bezier-easing'
import VueRouter from 'vue-router'
import Vue from 'vue'
// import Entry from '../views-preview/Kit-Preview/Entry.vue'
// import CP from '../views-preview/index.js'

export const makeEasing = ([b0, b1, b2, b3]) => {
  return BezierEasing(b0, b1, b2, b3)
}

export const makePreviewer = async ({ app, mounter, previewPageKey }) => {
  let api = {
    vue: false,
    router: false,
    app
  }
  let routes = []

  let SetupTasks = []
  let initCode = (modItem, code, myModules, setups) => {
    let env = {
      get moduleName () {
        return modItem.key
      },
      get codeName () {
        return code.key
      },
      get text () {
        return code.value
      },
      async run () { return code.value },
      getCode: (mk, ck) => {
        let mod = myModules[mk]
        if (!mod) {
          throw new Error('module not found')
        }
        if (!mod[ck]) {
          throw new Error('module code not found')
        }
        return mod[ck]
      },
      stream (streamFunction) {
        let intervalTimer = setInterval(() => {
          let value = sessionStorage.getItem(code._id) || ''
          if (value !== code.value) {
            code.value = value
            setTimeout(() => {
              streamFunction(code.value)
            })
          }
        })
        streamFunction(code.value)
        env._.clean[Math.random()] = () => {
          clearInterval(intervalTimer)
        }
      },
      app,
      modules: app.modules,
      module: modItem,
      moduleID: modItem._id,
      code,
      _: {
        loop: {},
        resize: {},
        clean: {}
      }
    }

    if (code.type === 'js') {
      // eslint-disable-next-line
      let StarterFn = new Function('env', `
        async function initFunc () {
          try {
            ${code.value}
          } catch (e) {
            console.error(e);
          }
        }
        return initFunc();
      `)

      setups.push(async () => StarterFn(env))
    }
    return env
  }

  let myModules = {}
  for (var knmods in app.modules) {
    let mod = app.modules[knmods]
    myModules[mod.key] = myModules[mod.key] || {}
    for (var kncode in mod.codes) {
      let code = mod.codes[kncode]
      myModules[mod.key][code.key] = initCode(mod, code, myModules, SetupTasks)
    }
  }

  await Promise.all(SetupTasks.map(fnc => fnc()))

  app.modules.filter(e => e.type === 'page').forEach((mod) => {
    routes.push({
      path: `/${mod.key}`,
      component: {
        template: `<div ref="page" class="full"></div>`,
        data () {
          return {
            rAFID: 0
          }
        },
        async beforeDestroy () {
          let main = mod.codes.find(c => c.key === 'main')
          if (main) {
            let env = myModules[mod.key][main.key]
            let cleans = env._.clean
            for (var cleanKN in cleans) {
              cleans[cleanKN]()
            }
            cancelAnimationFrame(this.rAFID)
          }
        },
        async mounted () {
          let main = mod.codes.find(c => c.key === 'main')
          if (main) {
            let env = myModules[mod.key][main.key]
            let api = {
              getCode: env.getCode,
              goTo: (path, query = {}) => {
                return this.$router.push({
                  path,
                  query
                })
              },

              getPageQuery: () => {
                return this.$route.query
              },

              loop: (fn) => {
                env._.loop[Math.random() + ''] = fn
              },
              resize: (fn) => {
                env._.resize[Math.random() + ''] = fn
              },
              clean: (fn) => {
                env._.clean[Math.random() + ''] = fn
              },

              // myModules,
              // page: mod,
              // router,
              // route: this.$route,
              mounter: this.$refs['page']
            }
            let looper = () => {
              this.rAFID = requestAnimationFrame(looper)
              let loops = env._.loop
              for (var loopKN in loops) {
                loops[loopKN]()
              }
            }
            this.rAFID = requestAnimationFrame(looper)
            let resize = () => {
              let resizes = env._.resize
              for (var resizeKN in resizes) {
                resizes[resizeKN]()
              }
            }
            window.addEventListener('resize', resize, false)
            api.clean(() => {
              window.removeEventListener('resize', resize, false)
            })

            await env.run(api)

            window.dispatchEvent(new Event('resize'))
          }
        }
      }
    })
  })

  routes.push({
    path: '/needs-to-add-mainjs',
    component: {
      template: `<div class="full flex justify-center items-center">Please add main.js</div>`
    }
  })

  routes.push({
    path: '/*',
    component: {
      template: `<div class="full flex justify-center items-center">Page Not Found</div>`
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
        router.push('/home')
      }
    }
  }).$mount(mounter)

  return api
}
