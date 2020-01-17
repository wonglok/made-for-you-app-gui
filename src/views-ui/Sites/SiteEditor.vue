<template>
  <div class="w-full h-hull bg-white" v-if="app">
    <SiteToolbarTop :app="app"></SiteToolbarTop>

    <div class="app-content flex flex-row">
      <div class="nav-col">

      </div>
      <div class="working-area">
        <CodeArea v-if="app.mode === 'code'"></CodeArea>
        <AssetArea v-if="app.mode === 'asset'"></AssetArea>
        <PreviewArea v-if="app.mode === 'preview'"></PreviewArea>
        <Layout3DArea v-if="app.mode === 'layout'"></Layout3DArea>
        <TimelineArea v-if="app.mode === 'timeline'"></TimelineArea>
        <SnippetArea v-if="app.mode === 'snippet'"></SnippetArea>
        <StoreArea v-if="app.mode === 'store'"></StoreArea>
      </div>
      <div class="preview-col"></div>
    </div>

    <!-- <div>
      SiteEditor {{ siteID }}
    </div> -->
    <div>
      <!-- {{ easing }} -->
      <!-- <CubicBezierEditor @easing="(v) => { easing = v }"></CubicBezierEditor> -->
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
      this.app = await API.makeEditorApp()
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
