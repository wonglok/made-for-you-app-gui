<template>
  <div class="w-full">
    <LayoutHeader>
      <span @click="openFrame" class="mr-1 cursor-pointer">🖥 </span>
      <span @click="reloadPage" class="mr-1 cursor-pointer">🔄</span>
      <input type="checkbox" class="mr-1" v-model="autoSync">
      <span>
        Preview:
      </span>
      <select v-model="pageKey" @change="syncOtherPages">
        <option :value="mod.key" :key="mod._id" v-for="mod in pages">{{ mod.key }}</option>
      </select>
    </LayoutHeader>
    <LayoutContent class="flex justify-center">
      <iframe class="object-contain object-center" v-if="pageKey" ref="iframe" :class="{ ['around']: around, [type]: true, ['border-bottom']: bottom }" frameboder="0" :src="`/inside-iframe/${app.siteID}?previewPageKey=${pageKey}&r=${randomID}`"></iframe>
    </LayoutContent>
  </div>
</template>

<script>
export default {
  props: {
    page: {
      default: 'home'
    },
    around: {
      default: false
    },
    bottom: {
      default: ''
    },
    type: {
      default: 'phone'
    },
    syncAll: {
      default: true
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
      pageKey: this.page
    }
  },
  watch: {
    currentPage () {
      if (this.currentPage && this.currentPage.type === 'page' && this.autoSync) {
        this.pageKey = this.currentPage.key
      }
    },
    code () {
      if (this.currentPage && this.currentPage.type === 'page' && this.autoSync) {
        this.pageKey = this.currentPage.key
      }
    }
  },
  computed: {
    currentPage () {
      return this.app.current.module
    },
    code () {
      return this.app.current.code
    },
    pages () {
      return this.app.modules.filter(m => m.type === 'page')
    }
  },
  mounted () {
    if (this.currentPage && this.currentPage.type === 'page' && this.autoSync) {
      this.pageKey = this.currentPage.key
    }
    if (this.syncAll) {
      this.$root.$on('load-page-frame', (page) => {
        if (this.autoSync) {
          this.pageKey = page
        }
      })
    }
    this.$root.$on('reload-iframe', () => {
      this.reloadPage()
      if (this.win && this.win.location && this.win.reload) {
        this.win.location.reload()
      }
    })
    this.$root.$emit('reload-iframe')
  },
  methods: {
    syncOtherPages () {
      this.$root.$emit('load-page-frame', this.pageKey)
    },
    reloadPage () {
      this.randomID = (Math.random() * 10000000).toFixed(0)
      if (this.win && this.win.location && this.win.location.reload) {
        this.win.location.reload()
      }
    },
    getAllSessionItems () {
      let items = []
      for (var i = 0; i < sessionStorage.length; i++) {
        let kn = sessionStorage.key(i)
        items.push({
          key: kn,
          value: sessionStorage.getItem(kn)
        })
      }
      return items
    },
    openFrame () {
      let url = `/inside-iframe/${this.app.siteID}?previewPageKey=${this.pageKey}&r=${this.randomID}`
      let ww = 1080
      let fts = `top=${window.screenTop},left=${window.outerWidth},width=${ww},height=${ww},menubar=no,location=no,resizable=no,scrollbars=no,status=no`
      this.win = window.open(url, 'preview-window', fts)
      let ttt = setInterval(() => {
        if (this.win) {
          let items = this.getAllSessionItems()
          this.win.postMessage({
            type: 'sessionStorage',
            data: items
          }, location.origin)
        } else {
          clearInterval(ttt)
        }
      }, 60 / 1000)
    }
  }
}

</script>

<style scoped lang="postcss">
.phone{
  width: 320px;
  height: calc(320px * 16 / 9);
}
.phone-xs{
  width: 292px;
  height: calc(292px * 16 / 9);
}
.border-bottom{
  border-bottom: #D3D3D3 solid 1px;
}
.tab-v{
  width: 320px;
  height: calc(320px * 4 / 3);
}
.tab-h{
  width: 400px;
  height: calc(400px * 3 / 4);
}
.phone-xl{
  width: 292px;
  height: calc(292px / 0.4618226601);
}
.area{
  width: 100%;
  height: 100%;
}
.around{
  @apply mt-3;
  border: #D3D3D3 solid 1px;
}
</style>
