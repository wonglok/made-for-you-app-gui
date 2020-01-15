<template>
  <div class="flex items-center">
    <router-link exact-active-class="font-bold " to="/">
      <div class="mx-6 hover:underline cursor-pointer">
        Home
      </div>
    </router-link>
    <router-link exact-active-class="font-bold " to="/about">
      <div class="mx-6 mr-3 hover:underline  cursor-pointer">
        About Lok
      </div>
    </router-link>
    <!-- <a target="_blank" exact-active-class="font-bold " href="https://github.com/wonglok/made-for-you-app-gui" to="/gallery" >
      <div class="mx-6 hover:underline  cursor-pointer">
        Github ↗️
      </div>
    </a> -->
    <!-- <router-link exact-active-class="font-bold " v-if="TKN.Profile" to="/profile">
      <div class="mx-6 hover:underline  cursor-pointer">
        My Sites
      </div>
    </router-link> -->

    <router-link to="/connect"  v-if="!TKN.Profile">
      <div class="cursor-pointer mx-6 px-6 py-4 text-lg font-title rounded-full bg-brand-primary text-white hover:bg-purple-400 transition-bg transition-500">
        <span class="select-none">Register / Login</span>
      </div>
    </router-link>
    <router-link to="/profile"  v-if="TKN.Profile">
      <div class="cursor-pointer mx-6 px-6 py-4 text-lg font-title rounded-full bg-brand-primary text-white hover:bg-purple-400 transition-bg transition-500">
        <span class="select-none">Profile</span>
      </div>
    </router-link>

    <div v-if="TKN.Profile" class="py-5 px-6 rounded-full inline-block text-purple-600 border border-purple-600 hover:border-purple-400 cursor-pointer bg-transparent hover:text-white hover:bg-purple-400 transition-bg transition-500" @click="logout">Logout</div>
  </div>
</template>

<script>
import * as API from '../../api/api'
export default {
  data () {
    return {
      TKN: API.Token
    }
  },
  methods: {
    async logout () {
      API.logout()
      this.$router.push('/')
    }
  }
}
</script>

<style>

</style>
