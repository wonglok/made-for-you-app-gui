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
    // siteID () {
    //   return this.$route.params.siteID
    // },
    previewPageKey () {
      return this.$route.query.previewPageKey || 'home'
    }
  },
  props: {
    itemID: {
      default () {
        return this.$route.params.itemID
      }
    }
  },
  data () {
    return {
      app: false
    }
  },
  async mounted () {
    let item = await API.getTimeStoreItem({ itemID: this.itemID })
    let getSiteFn = async () => {
      return item.versions[item.versions.length - 1].site
    }
    let getSiteModulesFn = async () => {
      return item.versions[item.versions.length - 1].modules
    }

    this.app = await API.makeSiteApp({ siteID: `_${(Math.random() * 1000000).toFixed(0)}`, getSiteFn, getSiteModulesFn })
    this.preview = await Preview.makePreviewer({ app: this.app, mounter: this.$refs.mounter, previewPageKey: this.previewPageKey })
  }
}
</script>

<style>
</style>
