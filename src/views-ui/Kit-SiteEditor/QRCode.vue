<template>
  <div>
    <a :target="`_${app.siteID}`" :href="`${guiURL}/runner.html?siteID=${app.siteID}`">
      <VueQrcode :value="`${guiURL}/runner.html?siteID=${app.siteID}`" :options="{ width: 289 }"></VueQrcode>
    </a>
  </div>
</template>

<script>
import VueQrcode from '@chenfengyuan/vue-qrcode'
import * as API from '../../api/api.js'
export default {
  props: {
    app: {}
  },
  components: {
    VueQrcode
  },
  data () {
    return {
      guiURL: API.remoteURL
    }
  }
}
</script>

<style scoped lang="postcss">
</style>
