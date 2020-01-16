<template>
  <div>
    <div>
      SiteEditor {{ siteID }}
    </div>
    <div>
      <CubicBezierEditor @update="(v) => { info = v }"></CubicBezierEditor>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    siteID: {}
  },
  data () {
    return {
      info: false
    }
  },
  components: {
    ...require('../index.js')
  }
}
</script>

<style>

</style>
