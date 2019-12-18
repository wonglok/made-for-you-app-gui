<template>
  <Scroller>
    <div class="pinbtm top-0 left-0 full">
      <div class="h-full w-full lg:max-w-lg mx-auto">
        <MagicBG></MagicBG>
      </div>
    </div>
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
        <p class="pb-3">
          Feature Under Development.
        </p>
        <div class="w-full py-2">
          Register to Save to Cloud.
        </div>
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
