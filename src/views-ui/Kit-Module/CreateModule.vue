<template>
  <div>
    <transition name="fade">
      <div class="fixed top-0 left-0 w-full h-full closer z-0" v-if="show.createModule" @click="show.createModule = false"></div>
    </transition>
    <transition name="fade">
      <div class="absolute tooltip rounded-lg mt-2 py-2 text-left px-2 border border-gray-200 bg-white hover:bg-gray-100 z-10" v-if="show.createModule">
        <div class="text-sm ml-1 mb-2">Add Module</div>
        <div class="text-xs ml-4 mb-1 hover:underline cursor-pointer" @click="addModule({ type: 'page' })">Page</div>
        <div class="text-xs ml-4 mb-1 hover:underline cursor-pointer" @click="addModule({ type: 'code' })">Code</div>
      </div>
    </transition>
  </div>
</template>

<script>
import * as API from '../../api/api'

export default {
  props: {
    show: {},
    app: {}
  },
  methods: {
    addModule ({ type = 'code' }) {
      API.createModule({
        key: `justCreated`,
        type: type,
        userID: this.app.userID,
        siteID: this.app.siteID
      }).then(() => {
        return API.getSiteModules({ siteID: this.app.siteID })
          .then((data) => {
            this.app.modules = data
          })
      })
      this.show.createModule = false
    },
    close (ev) {
      if (ev.keyCode === 27) {
        this.show.createModule = false
      }
    }
  },
  created () {
    this.$root.$on('close-all-dark-overlay', () => {
      this.show.createModule = false
    })
  },
  mounted () {
    window.addEventListener('keydown', this.close)
  },
  beforeDestroy () {
    window.addEventListener('keydown', this.close)
  }
}
</script>

<style scoped>
.tooltip{
  top: 0px;
  right: calc((-150px) + (-10px));
  width: 150px;
}

.closer{
  background-color: rgba(0,0,0,0.3)
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
