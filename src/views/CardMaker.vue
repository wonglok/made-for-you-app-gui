<template>
  <div>
    <CardMakerEngine :cardID="cardID"></CardMakerEngine>
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
