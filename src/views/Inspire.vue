<template>
  <Scroller>
    <div class="relative">
      <TitleUI>
        <p slot="default">
          Inspirational Content
        </p>
        <p slot="subtitle">
          Be Fun and Have Fun.
        </p>
      </TitleUI>
      <div class="mx-4 my-4">
        <div class="w-full">
          Love is in the Air.
        </div>
        <p class="py-3">
          Feature Under Development.
        </p>
      </div>

    </div>
  </Scroller>
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
