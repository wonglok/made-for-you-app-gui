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
    <LayoutContent class="flex justify-center">
      <iframe class="object-contain object-center" v-if="pageKey" ref="iframe" :class="{ [type]: true }" frameboder="0" :src="`/preview/${app.siteID}?previewPageKey=${pageKey}&r=${randomID}`"></iframe>
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
      pageKey: false
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
      this.reload()
    })
    this.$root.$emit('reload-iframe')
  },
  methods: {
    reload () {
      if (this.currentPage && this.currentPage.type === 'page' && this.autoSync) {
        this.pageKey = this.currentPage.key
      } else {
        this.pageKey = 'home'
      }
      this.randomID = (Math.random() * 10000000).toFixed(0)
    }
  }
}
</script>

<style scoped>
.phone{
  width: 240px;
  height: calc(240px * 16 / 9);
}
.tab-v{
  width: 480px;
  height: calc(480px * 4 / 3);
}
.phone-xl{
  width: 376px;
  height: calc(376px * 2);
}
.area{
  width: 100%;
  height: 100%;
}
</style>
