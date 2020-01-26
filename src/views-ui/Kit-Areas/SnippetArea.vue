<template>
  <div class="w-full h-full flex">
    <div class="browser">
      <LayoutHeader>Snippets</LayoutHeader>
      <LayoutContent>
        <ul>

          <li :class="{ 'bg-teal-200': selected === item }" class="text-xs text-xs w-full overflow-hidden cursor-defaults cursor-pointer hover:underline" :key="idx" v-for="(item, idx) in items">
            <div class="text-xs py-1 px-2 hover:bg-blue-200 flex justify-between rowhover hover:text-black flex justify-between items-center" @click="selected = item">
              📑 {{ item.filename }}
            </div>
          </li>
        </ul>

      </LayoutContent>
    </div>
    <div class="content">
      <LayoutHeader>Snippet Code</LayoutHeader>
      <LayoutContent ref="rect">
        <Brace class="w-full h-full"  v-if="selected" :key="selected.key" :style="{ height }" :mode="'markdown'" :getter="() => { return selected.value }" :setter="() => {}" @save="() => {}"></Brace>
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
      rr: '_' + Math.random() + '',
      height: 0,
      selected: false,
      items: []
    }
  },
  mounted () {
    let basename = require('path').basename
    let ctx = require.context('raw-loader!../Snippets/', true, /\.md$/)
    let items = ctx.keys().map((key) => {
      return {
        key: key,
        filename: basename(key),
        value: ctx(key).default
      }
    })
    this.items = items
    this.selected = items[0]

    let setHeight = () => {
      if (this.$refs && this.$refs.rect && this.$refs.rect.$el) {
        this.height = (this.$refs.rect.$el.getBoundingClientRect().height) + 'px'
      }
    }
    setHeight()
    window.addEventListener('resize', setHeight)
  }
}
</script>

<style scoped lang="postcss">
.browser{
  width: 192px;
  height: 100%;
  border-right: #D3D3D3 solid 1px;
}
.content{
  width: calc(100% - 192px);
  height: 100%;
}
</style>
