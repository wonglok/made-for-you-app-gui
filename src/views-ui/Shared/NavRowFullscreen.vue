<template>
  <div class="fixed z-40 top-0 left-0 bg-white w-full h-full">
    <div class="flex justify-between h-16 bg-white border-gray-500 border-b">
      <div class="inline-block h-16 w-16 flex justify-center items-center border-r border-gray-500 border-b cursor-pointer">
        <img src="../../assets/images/logo.svg" alt="Logo">
      </div>
      <div class="inline-block nav-title font-title font-black px-3 flex items-center">
        Menu
      </div>
      <div class="inline-block w-16 h-16 flex justify-center items-center bg-white border-gray-500 border-l border-b cursor-pointer"  @click="$emit('close')">
        <img src="../../assets/icons/close.svg" alt="Menu">
      </div>
    </div>

    <div class="mt-5 text-center">
      <router-link exact-active-class="font-bold " to="/">
        <div class="my-12 mx-6 hover:underline cursor-pointer">
          Home
        </div>
      </router-link>
      <router-link exact-active-class="font-bold " to="/about">
        <div class="my-12 mx-6 hover:underline  cursor-pointer">
          Our Story
        </div>
      </router-link>
      <router-link exact-active-class="font-bold " to="/gallery" >
        <div class="my-12 mx-6 hover:underline  cursor-pointer">
          Card Gallery
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="postcss">
.nav-title{
  font-family: 'Work Sans', Avenir, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-weight: black;
  font-size: 20px;
}
@keyframes floating {
  from {
    transform: translateZ(-5px);
  }
  to{
    transform: translateZ(5px);
  }
}

.floating{
  z-index: 0;
  animation: floating 1s ease-in-out 0s infinite alternate both;
}
</style>
