<template>
  <div class="max-w-sm mx-auto">
    <router-view></router-view>
    <TabBar></TabBar>
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
</style>
