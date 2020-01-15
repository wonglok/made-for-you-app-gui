<template>
  <div class=" bg-brand-secondary min-h-full">
    <div class="max-w-6xl mx-auto">
      <NavRow></NavRow>

      <div>
        Temp Sites Created on this machine.
      </div>

    </div>
  </div>
</template>

<script>
// import * as API from '../api/api'
export default {
  components: {
    ...require('../index.js')
  },
  data () {
    return {
    }
  },
  async mounted () {
  }
}
</script>

<style lang="postcss">

</style>
