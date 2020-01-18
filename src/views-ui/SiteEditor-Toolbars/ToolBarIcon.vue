<template>
  <div class="mx-2 inline-flex justify-center items-center flex-col icon-top">
    <div class="icon-holder cursor-pointer flex justify-center object-contain object-center" @click="$emit('on')">
      <slot name="icon"></slot>
    </div>
    <div class="text-center cursor-pointer text-xs icon-font"  @click="$emit('on')">
      <slot name="name"></slot>
    </div>
    <div class="light" :class="{ on: isOn }"></div>
  </div>
</template>

<script>
export default {
  props: {
    isOn: {
      default: false
    }
  }
}
</script>

<style scoped>
.icon-top{
  padding-top: 8px;
}
.icon-font{
  padding-top: 2px;
  color: #6F6F6F;
}
.icon-holder{
  height: 27px;
}
.light{
  opacity: 0;
  transition: opacity 1s;
}
.light.on{
  opacity: 1;
  margin-top: 0px;
  border-radius: 5px;
  width: 3px;
  height: 3px;
  background-color: rgb(127, 255, 127);
  box-shadow: 0px 1px 5px 1.5px lime;
}
</style>
