<template>
  <div class="bg-brand-secondary w-full min-h-full">
    <div class="max-w-6xl mx-auto flex flex-col">
      <NavRow></NavRow>
      <HeroUnit></HeroUnit>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    ...require('../views-ui')
  }
}
</script>

<style lang="postcss">

</style>
