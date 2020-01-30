<template>
  <div class="">

    <div class="mb-1 px-1 flex items-center">
      <div class="mr-1">
        <input placeholder="Number" class="w-full rounded-lg px-3 py-1 border border-gray-300 focus:outline-none focus:bg-white focus:border-gray-500" type="text" min="0" max="100" step="0.01" @input="onChange" v-model="editable.x">
      </div>
      <div class="mr-1">
        <input placeholder="Number" class="w-full rounded-lg px-3 py-1 border border-gray-300 focus:outline-none focus:bg-white focus:border-gray-500" type="text" min="0" max="100" step="0.01" @input="onChange" v-model="editable.y">
      </div>
      <div class="mr-0">
        <input placeholder="Number" class="w-full rounded-lg px-3 py-1 border border-gray-300 focus:outline-none focus:bg-white focus:border-gray-500" type="text" min="0" max="100" step="0.01" @input="onChange" v-model="editable.z">
      </div>
    </div>
    <div class="px-2 mb-1">
      <input class="w-full rounded-lg px-0 border border-gray-300 focus:outline-none focus:bg-white focus:border-gray-500" type="range" min="0" max="100" step="0.01" @input="onChange" v-model="editable.x">
    </div>
    <div class="px-2 mb-1">
      <input class="w-full rounded-lg px-0 border border-gray-300 focus:outline-none focus:bg-white focus:border-gray-500" type="range" min="0" max="100" step="0.01" @input="onChange" v-model="editable.y">
    </div>
    <div class="px-2 mb-1">
      <input class="w-full rounded-lg px-0 border border-gray-300 focus:outline-none focus:bg-white focus:border-gray-500" type="range" min="0" max="100" step="0.01" @input="onChange" v-model="editable.z">
    </div>

  </div>
</template>

<script>
import _ from 'lodash'
export default {
  props: {
    value: {},
    app: {},
    mod: {},
    readOnly: {}
  },
  components: {
    ...require('../index')
  },
  data () {
    return {
      editable: {
        x: Number(this.value.value.x) || 0,
        y: Number(this.value.value.y) || 0,
        z: Number(this.value.value.z) || 0
      }
    }
  },
  methods: {
    onChange () {
      this.value.value = {
        x: Number(this.editable.x) || 0,
        y: Number(this.editable.y) || 0,
        z: Number(this.editable.z) || 0
      }
      sessionStorage.setItem(this.value._id, JSON.stringify(this.value.value))
      if (!this.readOnly) {
        this.debounceUpload()
      }
    },
    debounceUpload: _.debounce(function () {
      this.$emit('change')
    }, 500)
  }
}
</script>

<style lang="postcss" socped>
</style>
