<template>
  <div class="w-full h-hull bg-white" v-if="app">
    <SiteToolbarTop :app="app"></SiteToolbarTop>

    <div class="app-content flex flex-row">
      <div class="nav-col">
        <ModuleColumn :app="app"></ModuleColumn>
      </div>

      <div class="working-area">
        <ModuleArea :app="app" v-if="app.mode === 'module'"></ModuleArea>
        <SettingsArea :app="app" v-if="app.mode === 'settings'"></SettingsArea>
        <AssetArea :app="app" v-if="app.mode === 'asset'"></AssetArea>
        <PreviewArea :app="app" v-if="app.mode === 'preview'"></PreviewArea>
        <Layout3DArea :app="app" v-if="app.mode === 'layout'"></Layout3DArea>
        <TimelineArea :app="app" v-if="app.mode === 'timeline'"></TimelineArea>
        <SnippetArea :app="app" v-if="app.mode === 'snippet'"></SnippetArea>
        <StoreArea :app="app" v-if="app.mode === 'store'"></StoreArea>
      </div>

      <div class="preview-col">
        <PreviewPhone :app="app"></PreviewPhone>
      </div>
    </div>

    <!-- <div>
      SiteEditor {{ siteID }}
    </div> -->
    <div>
      <!-- {{ easing }} -->
      <!-- <CubicBezierEditor @easing="(v) => { easing = v }"></CubicBezierEditor> -->
    </div>
  </div>
  <div v-else-if="app === null" class="">
    <div class="h-full w-full text-3xl flex justify-center items-center flex-col">
      <div>
        Sorry, Site Not Found 😭
      </div>
      <div @click="$router.go(-1)" class="hover:underline cursor-pointer">
        ⬅️ Back
      </div>
    </div>
  </div>
</template>

<script>
import * as API from '../../api/api'
export default {
  components: {
    ...require('../index.js')
  },
  props: {
    siteID: {}
  },
  data () {
    return {
      app: false,
      easing: false
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    async init () {
      this.app = await API.makeEditorApp({ siteID: this.siteID, userID: API.Token.Profile._id })
        .then(api => api, () => {
          return null
        })
    }
  }
}
</script>

<style scoped>
.app-content{
  width: 100%;
  height: calc(100% - 64px);
}
.nav-col{
  width: 180px;
  height: 100%;
  background-color: #FAFAFA;
  border-right: #D3D3D3 solid 1px;
}
.working-area{
  height: 100%;
  width: calc(100% - 180px - 240px);
}
.preview-col{
  height: 100%;
  width: 240px;
  background-color: #FAFAFA;
  border-left: #D3D3D3 solid 1px;
}
</style>
