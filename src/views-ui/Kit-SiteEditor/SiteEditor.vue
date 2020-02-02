<template>
  <div class="w-full h-hull bg-white" v-if="app">
    <SiteEditorNav :app="app"></SiteEditorNav>

    <div class="app-content flex justify-around items-baseline" v-if="app.mode === 'preview'">
      <PreviewPhone :around="true" type="phone" v-if="app" :app="app"></PreviewPhone>
      <PreviewPhone :around="true" type="phone-xl" v-if="app" :app="app"></PreviewPhone>
      <div class="inline-flex justify-center items-center flex-col">
        <PreviewPhone :around="true" type="tab-h" v-if="app" :app="app"></PreviewPhone>
        <QRCode v-if="app" :app="app"></QRCode>
      </div>
    </div>
    <div class="app-content flex justify-around items-center" v-else-if="app.mode === 'snippet'">
      <SnippetArea :app="app" v-if="app.mode === 'snippet'"></SnippetArea>
    </div>
    <div class="app-content flex justify-around items-center" v-else-if="app.mode === 'store'">
      <StoreArea :app="app" v-if="app.mode === 'store'"></StoreArea>
    </div>
    <div class="app-content flex justify-around items-center" v-else-if="app.mode === 'package'">
      <PackageArea :app="app" v-if="app.mode === 'package'"></PackageArea>
    </div>

    <div v-else class="app-content flex flex-row">
      <div class="nav-col">
        <ModuleBrowser :app="app"></ModuleBrowser>
      </div>

      <div class="working-area">

        <!-- <StoreArea :app="app" v-if="app.mode === 'store'"></StoreArea> -->
        <!-- <SettingsArea :app="app" v-if="app.mode === 'settings'"></SettingsArea> -->
        <!-- <PackageArea :app="app" v-if="app.mode === 'package'"></PackageArea> -->

        <CodeArea :app="app" v-if="app.mode === 'code'"></CodeArea>
        <AssetArea :app="app" v-if="app.mode === 'asset'"></AssetArea>
        <Layout3DArea :app="app" v-if="app.mode === 'layout'"></Layout3DArea>
        <TimelineArea :app="app" v-if="app.mode === 'timeline'"></TimelineArea>
      </div>

      <div class="preview-col">
        <PreviewPhone :type="'phone-xl'" :bottom="true" v-if="app" :app="app"></PreviewPhone>
        <QRCode v-if="app" :app="app"></QRCode>
      </div>
    </div>
  </div>
  <div v-else-if="app === null" class="">
    <div class="h-full w-full text-3xl flex justify-center items-center flex-col">
      <div>
        Sorry, We can't load your site. 😭
      </div>
      <div @click="$router.push('/profile')" class="hover:underline cursor-pointer">
        ⬅️ Back to Profile
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
      this.app = await API.makeSiteApp({ siteID: this.siteID, userID: API.Token.Profile._id })
        .then(api => api, () => null)

      if (this.app && this.app.site.userID !== this.app.userID) {
        this.app = null
      }
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
  width: calc(100% - 180px - 292px);
}
.preview-col{
  height: 100%;
  width: 292px;
  background-color: #FAFAFA;
  border-left: #D3D3D3 solid 1px;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  overflow-x: hidden;
}
</style>
