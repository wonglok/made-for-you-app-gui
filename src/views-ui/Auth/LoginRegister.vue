<template>
  <div>

    <div v-if="mode === 'login'">
      <div class="text-2xl mb-3">
        Login Form
      </div>
      <form class="" autocomplete="login" @submit.prevent="goLogin">
        <input type="text" class="p-3 my-2 mr-3 rounded-lg" v-model="login.identifier" placeholder="E-mail / Username">
        <input type="password" class="p-3 my-2 mr-3 rounded-lg" v-model="login.password" placeholder="Password">
        <button class="p-3 my-2 bg-white rounded-lg">Login</button>
      </form>
      <div v-if="bug" class=" text-red-500 text-xs mt-4">{{ bug }}</div>
      <div class="mt-4 text-gray-700 text-xs font-light" @click="mode = 'register'">Switch to registration.</div>
    </div>

    <div v-if="mode === 'register'">
      <div class="text-2xl mb-3">
        Regisration Form
      </div>
      <form class="" autocomplete="registration" @submit.prevent="goRegister">
        <input type="text" class="p-3 my-2 mr-3 rounded-lg" v-model="register.username" placeholder="Username">
        <input type="password" class="p-3 my-2 mr-3 rounded-lg" v-model="register.password" placeholder="Password">
        <input type="email" class="p-3 my-2 mr-3 rounded-lg" v-model="register.email" placeholder="E-mail">
        <button class="p-3 my-2 bg-white rounded-lg">Register</button>
      </form>
      <div v-if="bug" class=" text-red-500 text-xs mt-4">{{ bug }}</div>
      <div class="mt-4 text-gray-700 text-xs font-light" @click="mode = 'login'">Switch to login.</div>
    </div>

  </div>
</template>

<script>
import * as API from '../../api/api.js'
export default {
  props: {
    username: {
      default: ''
    },
    startwith: {
      default: 'login'
    }
  },
  data () {
    return {
      bug: '',
      mode: this.startwith,
      login: {
        identifier: this.username || '',
        password: ''
      },
      register: {
        email: '',
        username: this.username || '',
        password: ''
      }
    }
  },
  watch: {
    mode () {
      this.bug = ''
    }
  },
  mounted () {
  },
  methods: {
    async goLogin () {
      this.bug = ''
      API.authorise({ identifier: this.login.identifier, password: this.login.password })
        .then(() => {
          this.$emit('successful')
        }, (err) => {
          if (
            err &&
            err.response &&
            err.response.data &&
            err.response.data.message &&
            err.response.data.message[0] &&
            err.response.data.message[0].messages &&
            err.response.data.message[0].messages[0] &&
            err.response.data.message[0].messages[0].message
          ) {
            this.bug = err.response.data.message[0].messages[0].message
          }
        })
    },
    goRegister () {
      this.bug = ''
      API.register({ username: this.register.username, password: this.register.password, email: this.register.email })
        .then(() => {
          this.$emit('successful')
        }, (err) => {
          if (
            err &&
            err.response &&
            err.response.data &&
            err.response.data.message &&
            err.response.data.message[0] &&
            err.response.data.message[0].messages &&
            err.response.data.message[0].messages[0] &&
            err.response.data.message[0].messages[0].message
          ) {
            this.bug = err.response.data.message[0].messages[0].message
          }
        })
    }
  }
}
</script>

<style lang="postcss" scoped>
</style>
