<template>
  <div :class="{ 'bg-green-200' : app.selected.codeID === code._id }" class="relative text-xs py-1 px-2 hover:bg-blue-200 flex justify-between rowhover hover:text-black flex justify-between items-center">
    <div class="pl-2 text-xs w-full overflow-hidden cursor-defaults cursor-pointer hover:underline" @click="$emit('select', code); app.selected.codeID = code._id">
      <span v-if="code.type === 'frag'">🌈</span>
      <span v-else-if="code.type === 'vert'">🌈</span>
      <span v-else-if="code.type === 'js'">☕️</span>
      <span v-else>🗂</span>

      {{ code.key }}.{{ code.type }}{{ isDirty ? '*' : '' }}
    </div>
    <img class="cursor-pointer ml-1 h-4 hidden showme"  @click="$root.$emit('close-all-dark-overlay'); show.configCode = true; " src="./img/gear.svg" alt="">
    <CodeEntryConfig :code="code" :mod="mod" :app="app" :show="show"></CodeEntryConfig>
  </div>
</template>

<script>
export default {
  components: {
    ...require('../index.js')
  },
  props: {
    code: {},
    app: {},
    mod: {}
  },
  methods: {
    close (ev) {
      if (ev.keyCode === 27) {
        this.show.configCode = false
      }
    }
  },
  mounted () {
    setInterval(() => {
      if (Object.keys(this.app.dirtyFiles).includes(this.code._id)) {
        this.isDirty = true
      } else {
        this.isDirty = false
      }
    })

    window.addEventListener('keydown', this.close)
  },
  beforeDestroy () {
    window.addEventListener('keydown', this.close)
  },
  data () {
    return {
      isDirty: false,
      show: {
        configCode: false
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
