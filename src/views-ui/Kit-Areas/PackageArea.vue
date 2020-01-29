<template>
  <div class="w-full h-full text-xs">
    <LayoutHeader>
      Package Settings
    </LayoutHeader>
    <LayoutContent>
      <SiteDiscovery :app="app"></SiteDiscovery>
    </LayoutContent>
  </div>
</template>

<script>
export default {
  props: {
    app: {}
  },
  components: {
    ...require('../index.js')
  }
}
</script>

<style scoped lang="postcss">
.fixed-col{
  width: 192px;
  border-right: #D3D3D3 solid 1px;
}
.remain-col{
  width: calc(100% - 192px * 3);
}
</style>
