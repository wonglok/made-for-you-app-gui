<template>
  <div>
    <input class="m-1 rounded-lg px-3 py-1 border border-gray-300 focus:outline-none focus:bg-white focus:border-gray-500" type="text" @change="onChange" v-model="editable">
  </div>
</template>

<script>
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
      editable: String(this.value.value)
    }
  },
  methods: {
    onChange () {
      this.value.value = this.editable
      this.$emit('change')
    }
  }
}
</script>

<style lang="postcss" socped>

</style>
