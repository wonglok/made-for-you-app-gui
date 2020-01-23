<template>
  <div>
    <input class="m-1 rounded-lg px-0 py-1 border border-gray-300 focus:outline-none focus:bg-white focus:border-gray-500" type="range" min="0" max="100" step="0.01" @input="onChange" v-model="editable">
    <input placeholder="Number" class="m-1 rounded-lg px-3 py-1 border border-gray-300 focus:outline-none focus:bg-white focus:border-gray-500" type="number" min="0" max="100" step="0.01" @input="onChange" v-model="editable">
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
