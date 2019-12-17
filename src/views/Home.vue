<template>
  <div class="relative">
    <TitleUI>
      <p slot="default">
        Home
      </p>
      <p slot="subtitle">
        A Place to Love.
      </p>
    </TitleUI>
    <div class="mx-4 my-4">
      <div class="w-full">
        Home Page
      </div>
      <p class="py-3">
        Feature Under Development.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'save',
  components: {
    ...require('../views-ui/UIs.js').default
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped>
</style>
