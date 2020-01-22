<template>
  <div>
    <transition name="fade">
      <div class="fixed top-0 left-0 w-full h-full closer z-10" v-if="show.configModule" @click="show.configModule = false"></div>
    </transition>
    <transition name="fade">
      <div class="absolute tooltip rounded-lg mt-2 py-2 text-left px-2 border border-gray-200 bg-white hover:bg-gray-100 z-20" v-if="show.configModule">
        <div class="text-sm ml-1 mb-2">Config Module</div>
        <div class="text-xs">
          <div>
            <select @change="updateModuleType" v-model="mod.type" class="inline-block appearance-none bg-white border border-gray-200 text-gray-700 px-3 py-1 rounded focus:outline-none focus:bg-white focus:border-gray-500">
              <option value="page">Page</option>
              <option value="code">Code</option>
            </select>
            <input autofocus class="ml-1 rounded-lg px-3 py-1 border border-gray-300 focus:outline-none focus:bg-white focus:border-gray-500" type="text" @keydown.enter="onKeyEnter" v-model="name" @input="slugify" />
          </div>
          <div class="ml-1 mt-3 flex justify-between">
            <button class="px-3 rounded-lg py-1 border border-red-500 text-red-500 hover:bg-red-400 hover:text-white  mr-1" @click="removeModule()">Remove</button>
            <button class="px-3 rounded-lg py-1 border border-blue-400 hover:bg-blue-400 bg-blue-500 text-white" @click="show.configModule = false">OK</button>
          </div>
        </div>
        <!-- <div class="text-xs ml-4 mb-1 hover:underline cursor-pointer" @click="addModule({ type: 'page' })">Page</div>
        <div class="text-xs ml-4 mb-1 hover:underline cursor-pointer" @click="addModule({ type: 'code' })">Code</div> -->
      </div>
    </transition>
  </div>
</template>

<script>
import * as API from '../../api/api'
import slugify from 'slugify'
export default {
  props: {
    mod: {},
    show: {},
    app: {}
  },
  data () {
    return {
      name: this.mod.key
    }
  },
  watch: {
    'show.configModule' () {
      if (!this.show.configModule) {
        this.$root.$emit('reload-iframe')
      }
    }
  },
  methods: {
    onKeyEnter () {
      this.slugify()
      this.show.configModule = false
    },
    slugify () {
      this.mod.key = slugify(this.name, {
        replace: '_'
      })
      this.updateModuleKey()
    },
    removeModule () {
      if (window.prompt('Please type "' + this.mod.key + '" to confirm remove this module?') === this.mod.key) {
        API.removeModule({
          moduleObj: this.mod,
          moduleID: this.mod._id,
          userID: this.app.userID
        }).then(() => {
          return API.getSiteModules({ siteID: this.app.siteID })
            .then((data) => {
              this.app.modules = data
            })
        })
        this.show.configModule = false
      }
    },
    updateModuleKey () {
      API.updateModule({
        userID: this.app.userID,
        mod: {
          _id: this.mod._id,
          key: this.mod.key
        }
      })
    },
    updateModuleType () {
      API.updateModule({
        userID: this.app.userID,
        mod: {
          _id: this.mod._id,
          type: this.mod.type
        }
      })
    }
  },
  created () {
    this.$root.$on('close-all-dark-overlay', () => {
      this.show.configModule = false
    })
  }
}
</script>

<style scoped>
.tooltip{
  top: 0px;
  right: calc((-200px) + (-10px));
  /* width: 200px; */
}

.closer{
  background-color: rgba(0,0,0,0.3)
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
