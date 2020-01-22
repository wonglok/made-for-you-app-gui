<template>
  <div class="text-xs ml-1">
    <input placeholder="setting keyname" autofocus class="m-1 rounded-lg px-3 py-1 border border-gray-300 focus:outline-none focus:bg-white focus:border-gray-500" type="text" @change="updateValue" v-model="value.key" />

    <SettingsTypeSelect @change="updateValue" :obj="value"></SettingsTypeSelect>
    <div class="inline-block py-1 px-2 ml-1 border border-gray-200 text-white bg-red-400 hover:bg-red-300 rounded-lg cursor-pointer" @click="removeValue()">Remove</div>
    <SettingForString v-if="value.type === 'string'" @change="updateValue" :value="value" :app="app" :mod="mod"></SettingForString>
    <SettingForColorHEX v-if="value.type === 'colorHEX'" @change="updateValue" :value="value" :app="app" :mod="mod"></SettingForColorHEX>
  </div>
</template>

<script>
import * as API from '../../api/api'
export default {
  props: {
    value: {},
    app: {},
    mod: {}
  },
  components: {
    ...require('../index')
  },
  methods: {
    updateValue () {
      return API.updateValue({ value: this.value, userID: this.app.userID })
    },
    removeValue () {
      API.removeValue({ valueID: this.value._id, userID: this.app.userID })
        .then(() => {
          this.mod.values.splice(this.mod.values.findIndex(v => v._id === this.value._id), 1)
          this.$forceUpdate()
          return API.updateModule({ mod: this.mod, userID: this.app.userID })
        })
    }
  }
}
</script>

<style lang="postcss" socped>

</style>
