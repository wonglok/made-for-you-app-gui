<template>
  <div>
    <transition name="fade">
      <div class="fixed top-0 left-0 w-full h-full closer z-10" v-if="show.configCode" @click="show.configCode = false"></div>
    </transition>
    <transition name="fade">
      <div class="absolute tooltip rounded-lg mt-2 py-2 text-left px-2 border border-gray-200 bg-white hover:bg-gray-100 z-20" v-if="show.configCode">
        <div class="text-sm ml-1 mb-2">Edit Code Properties</div>
        <div class="text-xs">
          <div>
            <input autofocus class="ml-1 rounded-lg px-3 py-1 border border-gray-300 focus:outline-none focus:bg-white focus:border-gray-500" type="text" @keydown.enter="onKeyEnter" v-model="name" @input="slugify" />
            <select @change="updateModuleType" v-model="code.type" class="inline-block appearance-none bg-white border border-gray-200 text-gray-700 px-3 py-1 rounded focus:outline-none focus:bg-white focus:border-gray-500">
              <option value="js">📑 JavaScript</option>
              <option value="html">📑 HTML</option>
              <option value="css">📑 CSS</option>
              <option value="vue">📑 Vue</option>
              <option value="vert">🌈 Vertex Shader</option>
              <option value="frag">🌈 Fragment Shader</option>
            </select>
          </div>
          <div class="ml-1 mt-3 flex justify-between">
            <button class="px-3 rounded-lg py-1 border border-red-500 text-red-500 hover:bg-red-400 hover:text-white  mr-1" @click="removeCode()">Remove</button>
            <button class="px-3 rounded-lg py-1 border border-blue-400 hover:bg-blue-400 bg-blue-500 text-white" @click="show.configCode = false">OK</button>
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
    code: {},
    mod: {},
    show: {},
    app: {}
  },
  data () {
    return {
      name: this.code.key
    }
  },
  watch: {
    'show.configCode' () {
      if (!this.show.configCode) {
        this.$root.$emit('reload-iframe')
      }
    }
  },
  methods: {
    onKeyEnter () {
      this.slugify()
      this.show.configCode = false
    },
    slugify () {
      this.code.key = slugify(this.name, {
        replace: '_'
      })
      this.updateCodeKey()
    },
    removeCode () {
      if (window.prompt('Please type "' + `${this.code.key}.${this.code.type}` + '" to confirm remove this code?') === `${this.code.key}.${this.code.type}`) {
        API.removeCode({
          codeID: this.code._id,
          userID: this.app.userID
        })

        this.mod.codes.splice(this.mod.codes.findIndex(c => c._id === this.code._id), 1)
        this.show.configCode = false
      }
    },
    updateCodeKey () {
      API.updateCode({
        userID: this.app.userID,
        code: {
          _id: this.code._id,
          key: this.code.key
        }
      })
    },
    updateModuleType () {
      API.updateCode({
        userID: this.app.userID,
        code: {
          _id: this.code._id,
          type: this.code.type
        }
      })
    }
  },
  created () {
    this.$root.$on('close-all-dark-overlay', () => {
      this.show.configCode = false
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
