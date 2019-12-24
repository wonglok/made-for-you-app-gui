<template>
  <div class="flex justify-between h-16 bg-white border-gray-500 border-b">
    <div class="inline-block h-16 w-16 flex justify-center items-center border-r border-gray-500 border-b cursor-pointer">
      <router-link to="/">
        <img src="../../assets/images/logo.svg" alt="Logo">
      </router-link>
    </div>
    <div class="inline-block nav-title font-title font-black px-3 flex items-center">
      <router-link to="/">
        MadeForYouApp.com
      </router-link>
    </div>
    <div class="inline-block w-16 h-16 flex justify-center items-center bg-white border-gray-500 border-l border-b cursor-pointer"  @click="$emit('menu-click')">
      <img src="../../assets/icons/menu.svg" alt="Menu">
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped lang="postcss">
.nav-title{
  /* font-family: 'Work Sans', Avenir, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"; */
  font-weight: black;
  font-size: 20px;
}
</style>
