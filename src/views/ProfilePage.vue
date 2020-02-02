<template>
  <div class=" bg-brand-secondary min-h-full">
    <div class="max-w-6xl mx-auto">
      <NavRow></NavRow>
      <!-- <div>
        Temp Sites Created on this machine.
      </div> -->
      <div class="px-5 pb-10">
        <CreateSite @ok="$refs['sites'] && $refs['sites'].$emit('load')"></CreateSite>
        <PackageListing :isTemplate="true"></PackageListing>
        <ListSite ref="sites"></ListSite>
      </div>
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
