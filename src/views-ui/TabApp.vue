<template>
  <div class="full flex items-center">
    <div class="max-w-sm h-full w-full lg:max-w-lg mx-auto app-box relative border-on-large">
      <div class=" overflow-y-auto scrolling-touch h-full w-full">
        <router-view></router-view>
      </div>
      <TabBar></TabBar>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tab-app',
  components: {
    ...require('../views-ui/UIs.js').default
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped lang="postcss">
.app-box{
  max-width: 32rem;
  max-height: calc(32rem * 16 / 9);
}
@media screen and (min-height: 57rem) {
  .border-on-large{
    @apply border border-gray-400 rounded-lg;
  }
}
</style>
