<template>
  <div class="full">
    <section class="cta-area px-6 flex justify-between items-center">
      <div class="text-5xl font-title hover:underline cursor-pointer inline-block" @click="$emit('back')">
        ← Back
      </div>
      <div class="" v-if="md">
        <button @click="cloneModule(md)" class="brand-btn brand-btn-primary text-lg mb-0 mr-0">Clone "{{ anotherApp.current.module.key }}" Module</button>
      </div>
    </section>

    <section class="flex explore-area">
      <div class="h-full border-l border-b fix-col">
        <LayoutHeader>Explore Modules</LayoutHeader>
        <LayoutContent>
          <div class :key="mod._id" v-for="mod in anotherApp.modules">
            <ModuleEntry :readOnly="true" :app="anotherApp" @select="v => selectMod(v)" :mod="mod"></ModuleEntry>
          </div>
        </LayoutContent>
      </div>
      <div class="h-full remain-col">
        <keep-alive>
          <ModuleViewer v-if="md" :key="md._id + 'mviewer'" :around="false" :app="app" :modID="md._id" :siteID="siteID"></ModuleViewer>
        </keep-alive>
      </div>
    </section>
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
      viewing: false,
      anotherApp: false
    }
  },
  computed: {
    md () {
      if (this.anotherApp) {
        return this.anotherApp.modules.find(e => e._id === this.viewing)
      } else {
        return false
      }
    }
  },
  async mounted () {
    this.anotherApp = await API.makeSiteApp({ siteID: this.siteID })
    let mod = this.anotherApp.modules[0]
    let modID = false
    if (mod) {
      modID = mod._id
    }
    this.viewing = modID
  },
  methods: {
    selectMod (md) {
      this.anotherApp.selected.moduleID = md._id
      this.viewing = md._id
    },
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
.explore-area{
  height: calc(100% - 80px);
}
.cta-area{
  height: calc(80px);
}
</style>
