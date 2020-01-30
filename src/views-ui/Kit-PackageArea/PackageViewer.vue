<template>
  <div class="h-full w-full" v-if="otherApp && otherApp.current.module">
    <section class="cta-area px-6 flex justify-between items-center">
      <div class="text-5xl font-title hover:underline cursor-pointer inline-block" @click="$emit('back')">
        ← Back
      </div>
      <div class="">
        <button @click="cloneModule(otherApp.current.module)" class="brand-btn brand-btn-primary text-lg mb-0 mr-0">Clone "{{ otherApp.current.module.key }}" Module</button>
      </div>
    </section>
    <div class="flex h-full w-full border-l border-b">
      <div class="fix-col border-r">
        <LayoutHeader>Explore Modules</LayoutHeader>
        <LayoutContent>
          <div class="text-sm ml-2 mt-3 text-gray-600 font-bold" v-if="otherApp.modules.filter(e => e.type === 'page').length > 0">
            Pages
          </div>
          <div class :key="mod._id" v-for="mod in otherApp.modules.filter(e => e.type === 'page')">
            <ModuleEntry :readOnly="true" :app="otherApp" @select="v => selectMod(v)" :mod="mod"></ModuleEntry>
          </div>
          <div class="text-sm ml-2 mt-3 text-gray-600 font-bold" v-if="otherApp.modules.filter(e => e.type === 'code').length > 0">
            Shared Modules
          </div>
          <div class :key="mod._id" v-for="mod in otherApp.modules.filter(e => e.type === 'code')">
            <ModuleEntry :readOnly="true" :app="otherApp" @select="v => selectMod(v)" :mod="mod"></ModuleEntry>
          </div>
        </LayoutContent>
      </div>
      <div class="fix-col">
        <CodeBrowser v-if="otherApp" :app="otherApp" :mod="otherApp.current.module" :readOnly="true"></CodeBrowser>
      </div>
      <div class="remain-col border-r border-b">
        <CodeEditorBox v-if="otherApp" :readOnly="true" :mod="otherApp.current.module" :app="otherApp" :code="otherApp.current.code" class="h-full w-full"></CodeEditorBox>
      </div>
      <div class="phone-col">
        <PreviewPhone :around="false" type="phone-xs" v-if="otherApp" :app="otherApp"></PreviewPhone>
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
    app: {},
    siteID: {}
  },
  data () {
    return {
      otherApp: false
    }
  },
  watch: {
  },
  async mounted () {
    this.otherApp = await API.makeSiteApp({ siteID: this.siteID })
  },
  methods: {
    selectMod (mod) {
      this.otherApp.selected.moduleID = mod._id
    },
    async cloneModule (mod) {
      if (window.confirm(`Clone module: ${mod.key}?`)) {
        await API.cloneModule({
          sourceSiteID: this.siteID,
          sourceModuleID: mod._id,
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
.phone-col{
  width: 292px;
}
.remain-col{
  width: calc(100% - 200px - 292px);
}
.module-section{
  height: 600px;
}
</style>
