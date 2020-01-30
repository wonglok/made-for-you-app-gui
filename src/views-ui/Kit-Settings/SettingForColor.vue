<template>
  <div class="m-2">
    <!-- <input class="m-1 rounded-lg px-3 py-1 border border-gray-300 focus:outline-none focus:bg-white focus:border-gray-500" type="text" @change="onChange" v-model="editable"> -->
    <Chrome :style="{ width: '100%' }" :value="editable" @input="onChange"></Chrome>
  </div>
</template>

<script>
import { Chrome } from 'vue-color'
import _ from 'lodash'

export default {
  props: {
    readOnly: {},
    value: {},
    app: {},
    mod: {}
  },
  components: {
    Chrome,
    ...require('../index')
  },
  data () {
    return {
      editable: String(this.value.value || '#f0f0f0')
    }
  },
  methods: {
    onChange (color) {
      this.value.value = `${color.hex8}`
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
