import BezierEasing from 'bezier-easing'
import VueRouter from 'vue-router'
import Vue from 'vue'
import { Color } from 'three'
// import Entry from '../views-preview/Kit-Preview/Entry.vue'
// import CP from '../views-preview/index.js'

export const makeEasing = (obj) => {
  return BezierEasing(obj.x, obj.y, obj.z, obj.w)
}

export const getColorFromHex8 = (hex8) => {
  return new Color(hex8.slice(0, hex8.length - 2).slice(1, hex8.length))
}

export const setColorFromHex8 = (color, hex8) => {
  return color.set(Number(hex8.slice(0, hex8.length - 2).slice(1, hex8.length)))
}

export const makePreviewer = async ({ app, mounter, previewPageKey }) => {
  let api = {
    vue: false,
    router: false,
    app
  }
  let routes = []

  let initCode = (mods, modItem, code, MyModules, setupPromiseTasks) => {
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
      getAnyCode: (mk, ck) => {
        let mod = MyModules[mk]
        if (!mod) {
          throw new Error('module not found')
        }
        if (!mod[ck]) {
          throw new Error('module code not found')
        }
        return mod[ck]
      },
      setColorFromHex8,
      makeValueReader: (modItem) => (keyName) => {
        let get = () => {
          let obj = modItem.values.find(e => e.key === keyName)
          if (!obj) {
            throw new Error(keyName + 'setting value not found.')
          }
          let str = sessionStorage.getItem(obj._id) || ''
          str = JSON.parse(str)
          if (str && str !== obj.value) {
            obj.value = str
          }
          return obj
        }
        return {
          get,
          getColor: () => {
            let obj = get()
            return getColorFromHex8(obj.value)
          },
          getEasingFunc: () => {
            let obj = get()
            return makeEasing(obj.value)
          },
          stream: (streamFunction) => {
            let obj = modItem.values.find(e => e.key === keyName)
            if (!obj) {
              throw new Error(keyName + 'setting value not found.')
            }
            let intervalTimer = setInterval(() => {
              let str = sessionStorage.getItem(obj._id) || ''
              str = JSON.parse(str)
              if (str && str !== obj.value) {
                obj.value = str
                setTimeout(() => {
                  streamFunction(obj.value)
                })
              }
            })
            streamFunction(obj.value)
            env._.clean[Math.random()] = () => {
              clearInterval(intervalTimer)
            }
          }
        }
      },
      getOtherSetting: (modName, keyName) => {
        let mod = mods.find(m => m.key === modName)
        return env.makeValueReader(mod)(keyName)
      },
      getSetting: (keyName) => {
        return env.makeValueReader(modItem)(keyName)
      },
      getOtherCode: (mk, ck) => env.getAnyCode(mk, ck),
      getCode: (codeKey) => env.getAnyCode(modItem.key, codeKey),
      getPackageCode: (codeKey) => env.getAnyCode(modItem.key, codeKey),
      stream (streamFunction) {
        let intervalTimer = setInterval(() => {
          let value = sessionStorage.getItem(code._id) || ''
          if (value && value !== code.value) {
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

      setupPromiseTasks.push(async () => StarterFn(env))
    }
    return env
  }

  let SetupTasks = []
  let MyModules = {}
  for (var knmods in app.modules) {
    let mod = app.modules[knmods]
    MyModules[mod.key] = MyModules[mod.key] || {}
    for (var kncode in mod.codes) {
      let code = mod.codes[kncode]
      MyModules[mod.key][code.key] = initCode(app.modules, mod, code, MyModules, SetupTasks)
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
            let env = MyModules[mod.key][main.key]
            for (var cleanKN in env._.clean) {
              env._.clean[cleanKN]()
            }

            for (var loopKN in env._.loop) {
              delete env._.loop[loopKN]
            }

            cancelAnimationFrame(this.rAFID)
          }
        },
        async mounted () {
          let main = mod.codes.find(c => c.key === 'main')
          if (main) {
            let env = MyModules[mod.key][main.key]
            let api = {
              goPage: (path, query = {}) => {
                return this.$router.push({
                  path,
                  query
                })
              },
              getQuery: () => {
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

              // MyModules,
              // page: mod,
              // router,
              // route: this.$route,
              mounter: this.$refs['page']
            }
            let looper = () => {
              this.rAFID = requestAnimationFrame(looper)
              for (var loopKN in env._.loop) {
                env._.loop[loopKN]()
              }
            }
            this.rAFID = requestAnimationFrame(looper)
            let resize = () => {
              for (var resizeKN in env._.resize) {
                env._.resize[resizeKN]()
              }
            }
            window.addEventListener('resize', resize, false)
            api.clean(() => {
              window.removeEventListener('resize', resize, false)
            })

            await env.run(api)
            window.dispatchEvent(new Event('resize'))
          } else {
            this.$router.push('/needs-to-add-mainjs')
          }
        }
      }
    })
  })

  routes.push({
    path: '/needs-to-add-mainjs',
    component: {
      template: `<div class="full flex justify-center items-center text-center p-5">Please add main.js to the current module / page</div>`
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
