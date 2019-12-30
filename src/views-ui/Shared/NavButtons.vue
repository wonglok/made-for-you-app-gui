<template>
  <div class="flex items-center">
    <router-link exact-active-class="font-bold " to="/">
      <div class="mx-6 hover:underline cursor-pointer">
        Home
      </div>
    </router-link>
    <router-link exact-active-class="font-bold " to="/about">
      <div class="mx-6 hover:underline  cursor-pointer">
        Creator's Story
      </div>
    </router-link>
    <router-link exact-active-class="font-bold " to="/my-cards">
      <div class="mx-6 hover:underline  cursor-pointer">
        My Cards
      </div>
    </router-link>
    <a target="_blank" exact-active-class="font-bold " href="https://github.com/wonglok/made-for-you-app-gui" to="/gallery" >
      <div class="mx-6 hover:underline  cursor-pointer">
        Github ↗️
      </div>
    </a>
    <router-link to="/connect">
      <div class="cursor-pointer mx-6 px-8 py-4 text-lg font-title rounded-full bg-brand-primary text-white hover:bg-purple-400 transition-bg transition-500">
        <span class="select-none">Register / Login</span>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
}
</script>

<style>

</style>
