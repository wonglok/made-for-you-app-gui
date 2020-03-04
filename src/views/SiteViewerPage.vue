<template>
  <div ref="mounter" class="w-full h-full"></div>
</template>

<script>
import * as API from '../api/api'
import * as Preview from '../api/preview'
export default {
  components: {
    // ...require('../views-ui/index.js')
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
    window.addEventListener('message', (evt) => {
      if (evt.origin === window.location.origin && evt.data) {
        if (evt.data.type === 'sessionStorage') {
          let items = evt.data.data
          items.forEach((obj) => {
            sessionStorage.setItem(obj.key, obj.value)
          })
        }
      }
    }, false)

    this.app = await API.makeSiteApp({ siteID: this.siteID })
    this.preview = await Preview.makePreviewer({ app: this.app, mounter: this.$refs.mounter, previewPageKey: this.previewPageKey })
  }
}
</script>

<style>
</style>
