<template>
  <div>
    <AuthIndicator :cardID="cardID"></AuthIndicator>
    <ChangePW :cardID="cardID"></ChangePW>
  </div>
</template>

<script>
// import * as API from '../../api/api'
export default {
  components: {
    ...require('../index.js')
  },
  props: {
    cardID: {}
  },
  data () {
    return {
    }
  },
  async mounted () {
  },
  methods: {
  }
}
</script>

<style>

</style>
