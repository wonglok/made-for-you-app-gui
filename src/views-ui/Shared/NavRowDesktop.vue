<template>
  <div class="py-5 flex justify-between items-center">
    <Logo></Logo>
    <NavButtons></NavButtons>
  </div>
</template>

<script>
export default {
  components: {
    Logo: require('./Logo.vue').default,
    NavButtons: require('./NavButtons.vue').default
  }
}
</script>

<style>

</style>
