<template>
  <div class="full" ref="mounter">
  </div>
</template>

<script>
import * as Landing from '../Lok/GLs/Landing'
export default {
  components: {
  },
  data () {
    return {
      rAPI: false
    }
  },
  async mounted () {
    this.rAPI = await Landing.install({ mounter: this.$refs['mounter'], vm: this })
  },
  beforeDestroy () {
    this.rAPI.clean()
  }
}
</script>

<style lang="postcss">
.homebtn{
  /* background-color: white; */
}
.aroundbtn{
  padding: 20px;
  border-radius: 200px;
  position: absolute;
  display: block;
  bottom: 20px;
  right: 20px;
  z-index: 100000;
  background-color: rgba(0,0,0,0.6);
}
</style>
