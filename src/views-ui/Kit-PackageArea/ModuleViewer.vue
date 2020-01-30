<template>
  <div class="h-full w-full" v-if="anotherApp && anotherApp.current.module">
    <div class="flex h-full w-full border-l border-r border-b">
      <div class="fix-col">
        <CodeBrowser v-if="anotherApp" :app="anotherApp" :mod="anotherApp.current.module" :readOnly="true"></CodeBrowser>
      </div>
      <div class="remain-col border-r border-b">
        <CodeEditorBox v-if="anotherApp" :readOnly="true" :mod="anotherApp.current.module" :app="anotherApp" :code="anotherApp.current.code" class="h-full w-full"></CodeEditorBox>
      </div>
    </div>
  </div>
</template>

<script>
import * as API from '../../api/api.js'
export default {
  components: {
    ...require('../index.js')
  },
  props: {
    modID: {},
    app: {},
    siteID: {}
  },
  data () {
    return {
      anotherApp: false
    }
  },
  async mounted () {
    this.anotherApp = await API.makeSiteApp({ siteID: this.siteID })
    let pages = this.anotherApp.modules.filter(m => m._id === this.modID)
    if (pages[0]) {
      let prefer = pages.find(e => e.key === 'home')
      if (!prefer) {
        prefer = pages[0]
      }
      this.anotherApp.selected.moduleID = prefer._id
      let codes = pages[0].codes
      if (codes && codes[0]) {
        this.anotherApp.selected.codeID = codes[0]._id
      }
    }
  },
  methods: {
    async cloneModule (md) {
      if (window.confirm(`Clone module: ${md.key}?`)) {
        await API.cloneModule({
          sourceSiteID: this.siteID,
          sourceModuleID: md._id,
          currentSiteID: this.app.siteID,
          currentUserID: this.app.userID
        })
        this.app.modules = await API.getSiteModules({ siteID: this.app.siteID })
        this.app.mode = 'code'
      }
    }
  }
}
</script>

<style scoped lang="postcss">
.fix-col{
  width: 200px;
}
.remain-col{
  width: calc(100% - 200px);
}
.module-section{
  height: 600px;
}
</style>
