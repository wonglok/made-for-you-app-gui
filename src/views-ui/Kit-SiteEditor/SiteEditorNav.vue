<template>
  <div class="site-tool-bar-top overflow-hidden" :class="{ 'shadow-xl--': app.mode === 'store' }">
    <div class="float-left">
      <ToolBarIcon :isOn="app.mode === 'home'" @on="$router.push('/profile')" class="ml-3">
        <img slot="icon" src="./img/home.svg" alt="Home">
        <span slot="name">Home</span>
      </ToolBarIcon>

      <div class="inline-block ml-12 divider"></div>

      <ToolBarIcon :isOn="app.mode === 'code'" @on="app.mode = 'code'; $forceUpdate()" class="">
        <img slot="icon" src="./img/code.svg" alt="Code">
        <span slot="name">Code</span>
      </ToolBarIcon>

      <ToolBarIcon class="" :isOn="app.mode === 'package'" @on="app.mode = 'package'; $forceUpdate()" >
        <img slot="icon" src="./img/package.svg" alt="Package">
        <span slot="name">Package</span>
      </ToolBarIcon>

      <!-- <ToolBarIcon class="" :isOn="app.mode === 'asset'" @on="app.mode = 'asset'; $forceUpdate()" >
        <img slot="icon" src="./img/asset.svg" alt="Asset">
        <span slot="name">Asset</span>
      </ToolBarIcon>

      <ToolBarIcon :isOn="app.mode === 'layout'" @on="app.mode = 'layout'; $forceUpdate()" >
        <img slot="icon" src="./img/layout.svg" alt="3D Layout">
        <span slot="name">3D Layout</span>
      </ToolBarIcon>

      <ToolBarIcon :isOn="app.mode === 'timeline'"  @on="app.mode = 'timeline'; $forceUpdate()" >
        <img slot="icon" src="./img/timeline.svg" alt="Timeline">
        <span slot="name">Timeline</span>
      </ToolBarIcon> -->
    </div>

    <div class="float-right">
      <ToolBarIcon :isOn="app.mode === 'snippet'" @on="app.mode = 'snippet'; $forceUpdate()" class="">
        <img slot="icon" src="./img/snippet.svg" alt="Snippet">
        <span slot="name">Snippets</span>
      </ToolBarIcon>

      <ToolBarIcon class="" :isOn="app.mode === 'store'" @on="app.mode = 'store'; $forceUpdate()" >
        <img slot="icon" src="./img/store.svg" alt="Store">
        <span slot="name">Store</span>
      </ToolBarIcon>

      <ToolBarIcon class="" :isOn="app.mode === 'preview'" @on="app.mode = 'preview'; $forceUpdate()" >
        <img slot="icon" src="./img/devices.svg" alt="Preview">
        <span slot="name">Preview</span>
      </ToolBarIcon>

      <ToolBarIcon class="mr-3" :isOn="false" @on="openPage" >
        <img slot="icon" src="./img/safari.svg" alt="Preview">
        <span slot="name">Open</span>
      </ToolBarIcon>

    </div>
    <div class=" clearfix"></div>
  </div>
</template>

<script>
export default {
  props: {
    app: {
      require: true
    }
  },
  components: {
    ...require('../index.js')
  },
  methods: {
    openPage () {
      window.open(`/runner.html?siteID=${this.app.siteID}`)
    }
  }
}
</script>

<style scoped lang="postcss">
.site-tool-bar-top{
  width: 100%;
  height: 64px;
  background-image: linear-gradient(0deg, #D2D2D2 0%, #E5E5E5 95%);
}
</style>
