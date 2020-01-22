<template>
  <div>
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
        key: 'new-item',
        type: 'string'
      }
    }
  },
  methods: {
    createValue () {
      API.createValue({
        siteID: this.app.siteID,
        userID: this.app.userID,
        moduleID: this.mod._id,
        key: this.value.key,
        value: '',
        type: this.value.type
      }).then((val) => {
        this.mod.values.push(val)
        return API.updateModule({ mod: this.mod, userID: this.app.userID })
      })
    }
  }
}
</script>

<style>

</style>
