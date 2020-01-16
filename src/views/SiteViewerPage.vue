<template>
  <div class="w-full h-full flex justify-center items-center">
    Site Viewer Page
    <br>
    Site ID: {{ siteID }}
    <br>
    Underconstruction
  </div>
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
