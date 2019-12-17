<template>
  <div class="full" ref="mounter">
  </div>
</template>

<script>
import * as GLIntro from '../Lok/GLs/GLIntro'
export default {
  components: {
  },
  data () {
    return {
      rAPI: false
    }
  },
  async mounted () {
    this.rAPI = await GLIntro.install({ mounter: this.$refs['mounter'], vm: this })
  },
  beforeDestroy () {
    this.rAPI.clean()
  }
}
</script>

<style lang="postcss">
</style>
