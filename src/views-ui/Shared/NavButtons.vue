<template>
  <div class="flex items-center">
    <router-link exact-active-class="font-bold " to="/">
      <div class="mx-6 hover:underline cursor-pointer">
        Home
      </div>
    </router-link>
    <router-link exact-active-class="font-bold " to="/about">
      <div class="mx-6 hover:underline  cursor-pointer">
        Our Story
      </div>
    </router-link>
    <router-link exact-active-class="font-bold " to="/gallery" >
      <div class="mx-6 hover:underline  cursor-pointer">
        Card Gallery
      </div>
    </router-link>
    <div class=" cursor-pointer mx-6 px-8 py-4 text-lg font-title font-black rounded-full bg-brand-primary text-white hover:bg-purple-400 transition-bg transition-500">
      <span class="select-none">Login</span>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
