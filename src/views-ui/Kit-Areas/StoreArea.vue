<template>
  <div class="w-full h-full flex text-xs">
    <div class="fixed-col">
      <LayoutHeader>
        My Project
      </LayoutHeader>
      <LayoutContent>
        Content
      </LayoutContent>
    </div>
    <div class="fixed-col">
      <LayoutHeader>
        Module
      </LayoutHeader>
      <LayoutContent>
        Content
      </LayoutContent>
    </div>
    <div class="fixed-col">
      <LayoutHeader>
        Code
      </LayoutHeader>
      <LayoutContent>
        Content
      </LayoutContent>
    </div>
    <div class="remain-col">
      <LayoutHeader>
        My Packages
      </LayoutHeader>
      <LayoutContent>
        Content
      </LayoutContent>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    ...require('../index.js')
  },
  data () {
    return {
      itemID: ''
    }
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
