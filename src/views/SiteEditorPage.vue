<template>
  <SiteEditor :siteID="siteID"></SiteEditor>
</template>

<script>
export default {
  components: {
    ...require('../views-ui/index.js')
  },
  computed: {
    siteID () {
      return this.$route.params.siteID
    }
  }
}
</script>

<style>

</style>
