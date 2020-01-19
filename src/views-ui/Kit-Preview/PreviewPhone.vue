<template>
  <div class="w-full h-full">
    <LayoutHeader>
      <span @click="reload" class="mr-1 cursor-pointer">🔄</span>
      <input type="checkbox" class="mr-1" v-model="autoSync">
      <span>
        Preview:
      </span>
      <select v-model="pageKey">
        <option :value="mod.key" :key="mod._id" v-for="mod in pages">{{ mod.key }}</option>
      </select>
    </LayoutHeader>
    <LayoutContent>
      <iframe ref="iframe" :class="{ [type]: true }" frameboder="0" :src="`/preview/${app.siteID}?previewPageKey=${pageKey}&r=${randomID}`"></iframe>
    </LayoutContent>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      default: 'phone'
    },
    app: {}
  },
  components: {
    ...require('../index.js')
  },
  data () {
    return {
      randomID: 0,
      autoSync: true,
      pageKey: this.app.modules.filter(m => m.type === 'page')[0].key
    }
  },
  watch: {
    currentPage () {
      if (this.currentPage && this.currentPage.type === 'page' && this.autoSync) {
        this.pageKey = this.currentPage.key
      }
    }
  },
  computed: {
    currentPage () {
      return this.app.current.module
    },
    pages () {
      return this.app.modules.filter(m => m.type === 'page')
    }
  },
  mounted () {
    this.$root.$on('reload-iframe', () => {
      if (this.currentPage && this.currentPage.type === 'page' && this.autoSync) {
        this.pageKey = this.currentPage.key
      }
      this.reload()
    })
  },
  methods: {
    reload () {
      this.randomID = (Math.random() * 10000000).toFixed(0)
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
.area{
  width: 100%;
  height: 100%;
}
</style>
