<template>
  <div ref="mounter" class="w-full h-full"></div>
</template>

<script>
import * as API from '../api/api'
import * as Preview from '../api/preview'
export default {
  components: {
    ...require('../views-ui/index.js')
  },
  computed: {
    siteID () {
      return this.$route.params.siteID
    },
    previewPageKey () {
      return this.$route.query.previewPageKey || false
    }
  },
  data () {
    return {
      app: false
    }
  },
  async mounted () {
    this.app = await API.makeSiteApp({ siteID: this.siteID })
    this.preview = await Preview.makePreviewer({ app: this.app, mounter: this.$refs.mounter, previewPageKey: this.previewPageKey })
  }
}
</script>

<style>
</style>
