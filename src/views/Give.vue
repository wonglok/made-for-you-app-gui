<template>
  <div class="relative">
    <TitleUI>
      <p slot="default">
        Give it away
      </p>
      <p slot="subtitle">
        Love is real.
      </p>
    </TitleUI>
    <div class="mx-4">
      <p class="pb-3">
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
