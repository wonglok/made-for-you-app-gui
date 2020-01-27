<template>
  <div>
    <VueQrcode :value="`${guiURL}/site-id/${app.siteID}`" :options="{ width: 292 }"></VueQrcode>
  </div>
</template>

<script>
import VueQrcode from '@chenfengyuan/vue-qrcode'
// import * as API from '../../api/api.js'
export default {
  props: {
    app: {}
  },
  components: {
    VueQrcode
  },
  data () {
    return {
      guiURL: `${location.protocol}//${location.host}`
    }
  }
}
</script>

<style scoped lang="postcss">
</style>
