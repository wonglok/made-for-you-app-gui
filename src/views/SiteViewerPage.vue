<template>
  <div v-if="notFound" class="center-title full">
    Site Not Found
  </div>
  <div v-else-if="siteIDNum" ref="mounter" class="w-full h-full">
    <div v-if="app === 'loading'" class="center-title loading-area w-full h-full">
    </div>
  </div>
  <div v-else class="center-title full">
    Not Found
  </div>
</template>

<script>
import * as API from '../api/api'
import * as Preview from '../api/preview'
export default {
  props: {
    siteID: {},
    pageKey: {}
  },
  components: {
    // ...require('../views-ui/index.js')
  },
  computed: {
    siteIDNum () {
      return this.siteID || (this.$route.params.siteID)
    },
    previewPageKey () {
      return this.pageKey || (this.$route.query.previewPageKey) || false
    }
  },
  data () {
    return {
      notFound: false,
      app: 'loading'
    }
  },
  async mounted () {
    if (!this.siteIDNum) {
      return
    }

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

    this.app = await API.makeSiteApp({ siteID: this.siteIDNum })
    if (this.app === false) {
      this.notFound = true
      return
    }
    this.preview = await Preview.makePreviewer({ app: this.app, mounter: this.$refs.mounter, previewPageKey: this.previewPageKey })
  }
}
</script>

<style>
.full{
  width: 100%;
  height: 100%;
}
html,body{
  margin: 0px;
  width: 100%;
  height: 100%;
}
.w-full{
  width: 100%;
}
.h-full{
  height: 100%;
}
.center-title{
  font-family: Arial, Helvetica, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
}

@keyframes loading {
    0%{background-position:50% 0%}
    50%{background-position:51% 100%}
    100%{background-position:50% 0%}
}
.loading-area{
  background: linear-gradient(45deg, #ffffff, #e1e1e1);
  background-size: 400% 400%;

  animation: loading 2s ease infinite;
}
</style>
