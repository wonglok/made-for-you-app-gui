<template>
  <div class=" bg-brand-secondary min-h-full">
    <div class="max-w-6xl mx-auto">
      <NavRow></NavRow>
      <!-- <div>
        Temp Sites Created on this machine.
      </div> -->
      <CreateSite @ok="$refs['sites'] && $refs['sites'].$emit('load')"></CreateSite>
      <ListSite ref="sites"></ListSite>
    </div>
  </div>
</template>

<script>
// import * as API from '../api/api'
export default {
  components: {
    ...require('../views-ui')
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
