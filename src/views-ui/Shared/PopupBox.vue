<template>
  <transition name="fademodal">
    <div class="modal-mask" :class="{ 'cursor-default': locked }">
        <transition name="fademodal">
          <div class="modal-close-layer" v-if="showme" @click="!locked && $emit('close')"></div>
        </transition>
        <transition name="fademodal">
          <div class="modal-close-btn" v-if="showme && !locked"  @click="$emit('close')">
            <img src="../../assets/icons/close-white-circle.svg" alt="">
          </div>
        </transition>
        <transition name="fadescale">
          <div class="wrapper" v-if="showme">
            <div class="container mx-auto">
              <slot></slot>
            </div>
          </div>
        </transition>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    locked: {
      default: false
    }
  },
  data () {
    return {
      showme: false
    }
  },
  mounted () {
    this.showme = true
  }
}
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: table;
  overflow: hidden;
}
.modal-close-layer{
  z-index: -1;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
}

.modal-close-btn{
  z-index: 2;
  position: absolute;
  top: 20px;
  right: 20px;
}
.modal-close-btn img{
  width: 40px;
  height: 40px;
  cursor: pointer;
}

.wrapper{
  display: table-cell;
  vertical-align: middle;
}
.container{
  display: flex;
  justify-content: center;
  align-items: center;
}

.fademodal-enter-active, .fademodal-leave-active {
  transition: opacity 1s, transform 1s;
  transform: scale(1.0);
}
.fademodal-enter, .fademodal-leave-to /* .fademodal-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: scale(1.0);
}

.fadescale-enter-active, .fadescale-leave-active {
  transition: opacity 1s, transform 1s;
  transform: scale(1.0);
  transition-delay: 0.15s;
}
.fadescale-enter, .fadescale-leave-to /* .fadescale-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: scale(0.5);
}

</style>
