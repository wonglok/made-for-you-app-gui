<template>
  <div class="menu h-full w-full">
    <transition name="fade">
      <NavRowFullscreen @close="open = false" v-if="small && open" />
    </transition>
    <NavRowMobile v-if="small" @menu-click="open = !open" />
    <NavRowDesktop v-if="!small" />
  </div>
</template>

<script>
export default {
  components: {
    NavRowMobile: require('./NavRowMobile.vue').default,
    NavRowFullscreen: require('./NavRowFullscreen.vue').default,
    NavRowDesktop: require('./NavRowDesktop.vue').default
  },
  data () {
    this.$root.$open = false
    return {
      open: false,
      small: true
    }
  },
  watch: {
    open () {
      this.$root.$open = this.$open
      this.$root.$forceUpdate()
    }
  },
  mounted () {
    this.small = this.isSmall()
    window.addEventListener('resize', () => {
      this.small = this.isSmall()
    })
  },
  methods: {
    isSmall () {
      function convertRemToPixels (rem) {
        return rem * parseFloat(getComputedStyle(document.documentElement).fontSize)
      }

      if (window.innerWidth <= convertRemToPixels(64)) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.menu{
  position: sticky;
  top: 0px;
}
</style>
