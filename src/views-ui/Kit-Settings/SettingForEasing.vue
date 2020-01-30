<template>
  <div>
    <CubicBezierEditor :easing="easing" @easing="onChange"></CubicBezierEditor>
    <!-- <input class="m-1 rounded-lg px-3 py-1 border border-gray-300 focus:outline-none focus:bg-white focus:border-gray-500" type="text" @change="onChange" v-model="editable"> -->
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
    // let init = this.value.value
    // let easing = [0.12, 0.81, 0.23, 0.92]
    // if (init instanceof Array && init.length === 4) {
    //   init = easing
    // }
    return {
      easing: {
        x: this.value.value.x || 0.12,
        y: this.value.value.y || 0.81,
        z: this.value.value.z || 0.23,
        w: this.value.value.w || 0.92
      }
      // editable:
    }
  },
  methods: {
    onChange (easing) {
      this.value.value = easing
      // this.value.value = `${color.hex8}`
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
