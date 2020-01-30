<template>
  <div class="px-1 mr-1">
    <input placeholder="Your words..." class="m-1 w-full rounded-lg py-1 px-2 border border-gray-300 focus:outline-none focus:bg-white focus:border-gray-500" type="text" @change="onChange" v-model="editable">
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
      editable: this.value.value
    }
  },
  methods: {
    onChange () {
      this.value.value = this.editable
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
