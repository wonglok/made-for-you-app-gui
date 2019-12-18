<template>
  <div class="full" ref="mounter">
  </div>
</template>

<script>
import * as MagicBG from '../Lok/GLs/MagicBG'
export default {
  components: {
  },
  data () {
    return {
      rAPI: false
    }
  },
  async mounted () {
    this.rAPI = await MagicBG.install({ mounter: this.$refs['mounter'], vm: this })
  },
  beforeDestroy () {
    this.rAPI.clean()
  }
}
</script>

<style lang="postcss">
</style>
