<template>
  <div :class="{ 'bg-green-200' : app.selected.moduleID === mod._id }" class="relative text-xs py-1 px-2 hover:bg-blue-200 flex justify-between rowhover hover:text-black flex justify-between items-center">
    <div class="pl-2 text-xs w-full overflow-hidden cursor-defaults cursor-pointer hover:underline" @click="$emit('select', mod)">
      <span v-if="mod.type === 'code'">💎 {{ mod.key }}</span>
      <span v-if="mod.type === 'page'">📑 {{ mod.key }}</span>
    </div>

    <img v-if="!readOnly" class="cursor-pointer h-4 hidden showme"  @click="$root.$emit('close-all-dark-overlay'); show.configModule = true; " src="./img/gear.svg" alt="">
    <ConfigModule :mod="mod" :app="app" :show="show"></ConfigModule>
  </div>
</template>

<script>
export default {
  components: {
    ...require('../index.js')
  },
  props: {
    readOnly: {},
    app: {},
    mod: {}
  },
  methods: {
    close (ev) {
      if (ev.keyCode === 27) {
        this.show.configModule = false
      }
    }
  },
  mounted () {
    window.addEventListener('keydown', this.close)
  },
  beforeDestroy () {
    window.addEventListener('keydown', this.close)
  },
  data () {
    return {
      show: {
        configModule: false
      }
    }
  }
}
</script>

<style scoped>
.rowhover:hover .showme{
  display: inline-block;
}
</style>
