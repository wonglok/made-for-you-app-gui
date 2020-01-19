<template>
  <div class="w-full h-full">
    <LayoutHeader>
      <span @click="reload" class="mx-2 cursor-pointer">🔄</span>
      <span>
        Preview:
      </span>
      <select v-model="app.selected.previewPageID">
        <option :value="mod._id" :key="mod._id" v-for="mod in pages">{{ mod.key }}</option>
      </select>
    </LayoutHeader>
    <LayoutContent>
      <iframe ref="iframe" class="phone" frameboder="0" :src="`/preview/${app.siteID}?pageID=${app.selected.previewPageID}`"></iframe>
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
  },
  computed: {
    pages () {
      return this.app.modules.filter(m => m.type === 'page')
    }
  },
  mounted () {
    this.$root.$on('reload-iframe', () => {
      this.reload()
    })
  },
  methods: {
    reload () {
      this.$refs['iframe'].contentWindow.location.reload()
    }
  }
}
</script>

<style scoped>
.phone{
  width: 240px;
  height: calc(240px * 16 / 9);
  border-bottom: silver solid 1px;
}
</style>
