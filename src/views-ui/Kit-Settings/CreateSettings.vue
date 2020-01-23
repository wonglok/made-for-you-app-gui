<template>
  <div class="m-2 pr-6 p-3 border inline-block bg-white rounded-lg sticky topper shadow-md">
    <div class="text-xs mt-1 ml-1">
      <input placeholder="setting keyname" autofocus class="m-1 rounded-lg px-3 py-1 border border-gray-300 focus:outline-none focus:bg-white focus:border-gray-500" type="text" v-model="value.key" />
      <SettingsTypeSelect @change="() => {}" :obj="value"></SettingsTypeSelect>

      <div class="inline-block py-1 px-2 ml-1 border border-gray-200 text-white bg-blue-400 hover:bg-blue-300 rounded-lg cursor-pointer" @click="createValue()">Create</div>
    </div>
  </div>
</template>

<script>
import * as API from '../../api/api'

export default {
  components: {
    ...require('../index.js')
  },
  props: {
    app: {},
    mod: {}
  },
  data () {
    return {
      value: {
        key: 'new-setting-item',
        type: 'string'
      }
    }
  },
  methods: {
    getDefaultValue ({ type }) {
      return ({
        string: '',
        number: 0,
        vec2: {
          x: 0,
          y: 0
        },
        vec3: {
          x: 0,
          y: 0,
          z: 0
        },
        vec4: {
          x: 0,
          y: 0,
          z: 0,
          w: 0
        },
        color: 'rgba(255,255,255,0.5)',
        easing: [0, 1, 0, 1]
      })[type]
    },
    createValue () {
      API.createValue({
        siteID: this.app.siteID,
        userID: this.app.userID,
        moduleID: this.mod._id,
        key: this.value.key,
        value: this.getDefaultValue({ type: this.value.type }),
        type: this.value.type
      }).then((val) => {
        this.mod.values.push(val)
        return API.updateModule({ mod: this.mod, userID: this.app.userID })
      }).then(() => {
        this.$emit('scroll-bottom')
      })
    }
  }
}
</script>

<style scoped>
.topper{
  z-index: 100;
  top: 8px;
}
</style>
