<template>
  <div class="h-full w-full">
    <div class="code-row">
      <LayoutHeader class="relative">
        <div class="w-full h-full flex justify-between">
          <div class="inline-flex justify-center items-center ml-2 w-5">
            <!-- <img class="cursor-pointer" src="./img/search.svg" /> -->
          </div>

          <div class="inline-flex justify-start items-center pl-1 pr-1">
            Codes
          </div>

          <div class="inline-flex justify-center items-center mr-2 w-5">
            <img v-show="!readOnly" class="cursor-pointer" src="./img/plus.svg" @click="$root.$emit('close-all-dark-overlay'); show.createCodeEntry = true;" />
          </div>
        </div>
      </LayoutHeader>
      <LayoutContent class="overflow-scroll scrolling-touch">
        <div :key="code._id" v-for="code in app.current.module.codes">
          <CodeEntry :readOnly="readOnly" :app="app" :mod="mod" :code="code"></CodeEntry>
        </div>
      </LayoutContent>
    </div>
    <CodeEntryCreate :app="app" :show="show" :mod="mod"></CodeEntryCreate>
    <div class="setting-row">
      <LayoutHeader>
        <div class="w-full h-full flex justify-between">
          <div class="inline-flex justify-center items-center ml-2 w-5">
            <!-- <img class="cursor-pointer" src="./img/search.svg" /> -->
          </div>

          <div class="inline-flex justify-start items-center pl-1 pr-1">
            Settings
          </div>

          <div class="inline-flex justify-center items-center mr-2 w-5">
            <img v-show="!readOnly" class="cursor-pointer" src="./img/plus.svg" @click="showAdder = !showAdder" />
          </div>
        </div>
      </LayoutHeader>

      <LayoutContent class="overflow-scroll scrolling-touch" ref="scroller">
        <CreateSettings v-if="showAdder" :mode="'mini'" :app="app" :mod="app.current.module"></CreateSettings>
        <div class="flex justify-start items-baseline flex-wrap mt-2">
          <SettingsModifier :readOnly="readOnly" :mode="'mini'" class="" :key="val._id" v-for="val in app.current.module.values" :value="val" :app="app" :mod="app.current.module" ></SettingsModifier>
        </div>
      </LayoutContent>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    readOnly: { default: false },
    app: {},
    mod: {}
  },
  components: {
    ...require('../index.js')
  },
  watch: {
    showAdder () {
      let scroller = this.$refs['scroller'].$el
      if (scroller) {
        scroller.scrollTop = 0
      }
    },
    mod () {
      this.app.current.module.values = this.app.current.module.values.sort(this.byTitle)
      this.app.current.module.codes = this.app.current.module.codes.sort(this.byTitle)
    }
  },
  mounted () {
    this.app.current.module.values = this.app.current.module.values.sort(this.byTitle)
    this.app.current.module.codes = this.app.current.module.codes.sort(this.byTitle)
  },
  data () {
    return {
      showAdder: false,
      show: {
        createCodeEntry: false
      }
    }
  },
  methods: {
    byTitle (a, b) {
      if (a.key > b.key) {
        return 1
      } else if (a.key < b.key) {
        return -1
      } else if (a.key === b.key) {
        return 0
      }
    }
  }
}
</script>

<style scoped lang="postcss">
.code-row{
  height: 185px;
}
.setting-row{
  height: calc(100% - 185px);
}
</style>
