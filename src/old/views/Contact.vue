<template>
  <Scroller>
    <div class="relative">
      <TitleUI>
        <p slot="default">
          Contact us
        </p>
        <p slot="subtitle">
          Thanks for learning more about us.
          <br />
          (System under development)
        </p>
      </TitleUI>
      <div class="mx-4 my-4">
        <div class="w-full">
          <router-link to="/" class="underline">About this project.</router-link>
        </div>
        <p class="py-3">
          author: twitter.com/wonglok831
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
