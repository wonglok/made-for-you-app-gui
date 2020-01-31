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

  /* eslint-disable */
  // long version
  function loadExt (files, after) {
    var _this=this;
    _this.files = files;
    _this.js = [];
    _this.head = document.getElementsByTagName("head")[0];
    _this.after = after || function(){};
    _this.loadStyle = function(file) {
      var link = document.createElement("link");
      link.rel = "stylesheet";
      link.type = "text/css";
      link.href = file;
      _this.head.appendChild(link);
    };
    _this.loadScript = function(i) {
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = _this.js[i];
      var loadNextScript = function() {
        if (++i < _this.js.length) _this.loadScript(i);
        else _this.after();
      };
      script.onload = function() { loadNextScript() };
      _this.head.appendChild(script);
    }
    for (var i=0;i<_this.files.length;i++) {
      if (/\.js$|\.js\?/.test(_this.files[i])) _this.js.push(_this.files[i])
      if (/\.css$|\.css\?/.test(_this.files[i])) _this.loadStyle(_this.files[i])
    }
    if (_this.js.length>0) _this.loadScript(0);
    else _this.after();
  }
  /* eslint-enable */

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
      // placeholder only
      async run () { console.log('running a placeholder function'); return code.value },
      getAnyCode: (mk, ck) => {
        let mod = MyModules[mk]
        if (!mod) {
          throw new Error(mk + ' module not found')
        }
        if (!mod[ck]) {
          throw new Error(ck + ' module code not found')
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
          let str = sessionStorage.getItem(obj._id)
          try { str = JSON.parse(str) } catch (e) {}
          if (str || str === '' || str === 0) {
            obj.value = str
          }
          return obj
        }
        return {
          get value () {
            let obj = get()
            if (obj) {
              return obj.value
            } else {
              return false
            }
          },
          get,
          getColor: () => {
            let obj = get()
            return getColorFromHex8(obj.value)
          },
          getHex8: () => {
            let obj = get()
            return getColorFromHex8(obj.value)
          },
          getEasing: () => {
            let obj = get()
            return makeEasing(obj.value)
          },
          stream: (streamFunction, type = 'none') => {
            let obj = get()
            if (!obj) {
              throw new Error(keyName + 'setting value not found.')
            }
            console.log(obj.key, obj.value)
            let intervalTimer = setInterval(() => {
              let str = sessionStorage.getItem(obj._id)
              try { str = JSON.parse(str) } catch (e) {}
              if ((str || str === '' || str === 0)) {
                obj.value = str
                if (type === 'hex') {
                  streamFunction((obj.value + '').slice(0, 7))
                } else {
                  streamFunction(obj.value)
                }
              }
            })
            if (type === 'hex') {
              streamFunction((obj.value + '').slice(0, 7))
            } else {
              streamFunction(obj.value)
            }
            env._.clean[Math.random()] = () => {
              clearInterval(intervalTimer)
            }
          }
        }
      },
      getAnySetting: (modName, keyName) => {
        let mod = mods.find(m => m.key === modName)
        return env.makeValueReader(mod)(keyName)
      },
      getSetting: (keyName) => {
        let modName = modItem.key
        let mod = mods.find(m => m.key === modName)
        return env.makeValueReader(mod)(keyName)
      },
      getOtherCode: (mk, ck) => env.getAnyCode(mk, ck),
      getCode: (codeKey) => env.getAnyCode(modItem.key, codeKey),
      getPackageCode: (codeKey) => env.getAnyCode(modItem.key, codeKey),
      stream (streamFunction) {
        let intervalTimer = setInterval(() => {
          let value = sessionStorage.getItem(code._id) || ''
          if (value && value !== code.value) {
            code.value = value
            streamFunction(code.value)
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
            setTimeout(() => {
              window.dispatchEvent(new Event('resize'))
            }, 100)
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
