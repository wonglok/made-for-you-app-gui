<template>
  <div class="flex items-center flex-col">
    <router-view></router-view>
    <div class=" h-32">
    </div>
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

<style scoped>
</style>
