<template>
  <div :class="{
    'shadow-md text-xs w-56 m-2 p-4 border border-gray-400 rounded-lg inline-block': mode === 'full',
    'text-xs border-b mb-3 w-full': mode === 'mini'
  }">

    <div class="flex hover-row">
      <input placeholder="setting keyname" autofocus :class="{ 'text-green-700 ': mode === 'mini' }" class="m-1 namer rounded-lg px-3 py-1 border border-gray-300 focus:outline-none focus:bg-white focus:border-gray-500" type="text" @change="updateValue" v-model="value.key" />
      <img src="./img/trash.svg" class="hidden trash w-3 ml-1 cursor-pointer" alt="Remove this settings" @click="removeValue()">
    </div>
    <div class="flex">
      <!-- <SettingsTypeSelect :disabled="true" @change="updateValue" :obj="value"></SettingsTypeSelect> -->
      <!-- <div class="inline-block py-1 px-2 ml-1 border border-gray-200 text-white bg-red-400 hover:bg-red-300 rounded-lg cursor-pointer" @click="removeValue()">Remove</div> -->
    </div>

    <div class="overflow-x-hidden">
      <SettingForString v-if="value.type === 'string'" @change="updateValue" :value="value" :app="app" :mod="mod"></SettingForString>
      <SettingForColor v-if="value.type === 'color'" @change="updateValue" :value="value" :app="app" :mod="mod"></SettingForColor>
      <SettingForEasing v-if="value.type === 'easing'" @change="updateValue" :value="value" :app="app" :mod="mod"></SettingForEasing>
      <SettingForNumber v-if="value.type === 'number'" @change="updateValue" :value="value" :app="app" :mod="mod"></SettingForNumber>
      <SettingForVec2 v-if="value.type === 'vec2'" @change="updateValue" :value="value" :app="app" :mod="mod"></SettingForVec2>
      <SettingForVec3 v-if="value.type === 'vec3'" @change="updateValue" :value="value" :app="app" :mod="mod"></SettingForVec3>
      <SettingForVec4 v-if="value.type === 'vec4'" @change="updateValue" :value="value" :app="app" :mod="mod"></SettingForVec4>
    </div>
  </div>
</template>

<script>
import * as API from '../../api/api'
export default {
  props: {
    value: {},
    app: {},
    mod: {},
    mode: {
      default: 'full'
    }
  },
  components: {
    ...require('../index')
  },
  methods: {
    updateValue () {
      return API.updateValue({ value: this.value, userID: this.app.userID })
    },
    removeValue () {
      if (window.confirm(`delete ${this.value.key} ?`)) {
        API.removeValue({ valueID: this.value._id, userID: this.app.userID })
          .then(() => {
            this.mod.values.splice(this.mod.values.findIndex(v => v._id === this.value._id), 1)
            this.$forceUpdate()
            return API.updateModule({ mod: this.mod, userID: this.app.userID })
          })
      }
    }
  }
}
</script>

<style lang="postcss" socped>
.namer{
  display: inline-block;
  width: 100%;
}
.hover-row:hover .namer{
  display: inline-block;
  width: 80%;
}
.hover-row:hover .trash{
  display: inline-block;
}
</style>
