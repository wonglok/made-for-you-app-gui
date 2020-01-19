<template>
  <div class="w-full h-full">
    <PreviewPhone class="w-full h-full" type="area" v-if="app" :app="app"></PreviewPhone>
  </div>
</template>

<script>
export default {
  props: {
    app: {}
  },
  components: {
    ...require('../index.js')
  }
}
</script>

<style scoped lang="postcss">
</style>
