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
      <AuthIndicator :core="core" :cardID="cardID"></AuthIndicator>
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
      core: API.makeEditor({ cardID: this.cardID })
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
