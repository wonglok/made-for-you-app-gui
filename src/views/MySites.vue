<template>
  <div class=" bg-brand-secondary min-h-full">
    <div class="max-w-6xl mx-auto">
      <NavRow></NavRow>

      <div>
        Temp Sites
      </div>
      <div v-if="tempSites">
        <pre>{{ tempSites }}</pre>
      </div>
      <div v-else>
        Loading...
      </div>
    </div>
  </div>
</template>

<script>
import * as API from '../api/api'
export default {
  components: {
    ...require('../views-ui')
  },
  data () {
    return {
      tempSites: false
    }
  },
  async mounted () {
    API.getDeviceCards()
      .then(data => {
        this.tempSites = data
      })
  }
}
</script>

<style lang="postcss">

</style>
