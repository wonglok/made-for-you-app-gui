<template>
  <div>
    <CMMain :cardID="cardID"></CMMain>
  </div>
</template>

<script>
export default {
  components: {
    ...require('../views-ui/index.js')
  },
  computed: {
    cardID () {
      return this.$route.params.cardID
    }
  }
}
</script>

<style>

</style>
