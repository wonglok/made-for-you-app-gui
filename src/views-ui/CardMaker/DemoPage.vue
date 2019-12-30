<template>
  <div>
    <div>
      <div class=" text-2xl">
        Change Password
      </div>
      <ChangePW :core="core" :cardID="cardID"></ChangePW>
    </div>
    <div>
      <div class=" text-2xl">
        Editor
      </div>
      <AuthLight :core="core" :cardID="cardID"></AuthLight>
      <CardTitleEditor :core="core" :cardID="cardID"></CardTitleEditor>
    </div>
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
