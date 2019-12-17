<template>
  <div class="flex items-center flex-col">
    <router-view></router-view>
    <TabBar></TabBar>
  </div>
</template>

<script>
export default {
  name: 'tab-app',
  components: {
    TabBar: require('./TabBar.vue').default
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped lang="postcss">

</style>
