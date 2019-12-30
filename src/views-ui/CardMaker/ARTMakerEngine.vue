<template>
  <div class="min-h-full bg-teal-200">
  </div>
</template>

<script>
import * as API from '../../api/api'
export default {
  components: {
    ...require('../index.js')
  },
  props: {
    cardID: {}
  },
  data () {
    return {
      core: API.makeCardEditor({ cardID: this.cardID, vm: this })
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
