<template>
  <div class="max-w-sm lg:max-w-lg mx-auto app-box">
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
.app-box{
}
</style>
