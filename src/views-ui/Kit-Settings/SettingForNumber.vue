<template>
  <div class="">
    <div class="px-1">
      <input placeholder="Number" class="w-full rounded-lg px-3 py-1 border border-gray-300 focus:outline-none focus:bg-white focus:border-gray-500" type="number" min="0" max="100" step="0.01" @input="onChange" v-model="editable">
    </div>
    <div class="p-2">
      <input class="w-full rounded-lg py-1 border border-gray-300 focus:outline-none focus:bg-white focus:border-gray-500" type="range" min="0" max="100" step="0.01" @input="onChange" v-model="editable">
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  props: {
    value: {},
    app: {},
    mod: {}
  },
  components: {
    ...require('../index')
  },
  data () {
    return {
      editable: this.value.value
    }
  },
  methods: {
    onChange () {
      this.value.value = Number(this.editable)
      sessionStorage.setItem(this.value._id, JSON.stringify(this.value.value))
      this.debounceUpload()
    },
    debounceUpload: _.debounce(function () {
      this.$emit('change')
    }, 500)
  }
}
</script>

<style lang="postcss" socped>
</style>
