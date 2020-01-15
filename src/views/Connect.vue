<template>
  <div class=" bg-brand-secondary min-h-full">
    <div class="max-w-6xl mx-auto">
      <NavRow></NavRow>
      <div class="mx-12 mt-10 lg:mx-0 lg:mt-0">
        <LoginRegister @successful="goDash"></LoginRegister>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    ...require('../views-ui')
  },
  methods: {
    goDash () {
      this.$router.push('/profile')
    }
  }
}
</script>

<style lang="postcss">
</style>
