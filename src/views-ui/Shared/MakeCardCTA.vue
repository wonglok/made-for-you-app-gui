<template>
  <div class="w-full">
    <div v-if="!Token.Profile" class="flex lg:justify-between bg-white text-xl rounded-full text-gray-500 p-2 my-3 lg:mx-5 enterbox lg:w-5/6">
      <div class="ml-4 p-3 w-full">
        <form @submit.prevent="" autocomplete="login" >
          <input v-model="auth.username" type="text" class="outline-none w-full" placeholder="What's your username?" @keyup="checkUsername" @keydown.enter="loginWizard">
        </form>
      </div>
      <div class=" cursor-pointer w-32 bg-brand-primary hover:bg-purple-500 flex p-3 flex justify-center rounded-full transition-bg transition-500"  @click="loginWizard">
        <img class="select-none" src="../../assets/images/arrow-right.svg" alt="">
      </div>
    </div>
    <div v-if="Token.Profile" class="flex lg:justify-between  bg-white text-xl rounded-full text-gray-500 p-2 my-3 lg:mx-5 enterbox lg:w-5/6">
      <div class="ml-2 p-3 pl-4 w-full text-gray-700 cursor-pointer rounded-full hover:bg-gray-200 mx-4 p-3" @click="goDash">
        Welcome Back! <span class="hidden lg:inline"> Let's Create!</span>
      </div>
      <div class=" cursor-pointer w-32 bg-brand-primary hover:bg-purple-500 flex p-3 flex justify-center rounded-full transition-bg transition-500"  @click="goDash">
        <img class="select-none" src="../../assets/images/arrow-right.svg" alt="">
      </div>
    </div>

    <!-- <div class="flex text-gray-600 pl-12">
      Let's go!
    </div> -->

    <!-- use the modal component, pass in the prop -->
    <PopupBox v-if="showAuthBox" @close="showAuthBox = false" :locked="false">
      <div class="bg-purple-200 mx-6 p-12 rounded-lg">
        <LoginRegister :startwith="startwith" :focusat="startwith === 'login' ? 'login-password' : ''" :username="auth.username" @successful="goDash"></LoginRegister>
        <!-- <SpinnerGrid /> -->
      </div>
    </PopupBox>
  </div>
</template>

<script>
import * as API from '../../api/api'
export default {
  components: {
    ...require('../index.js')
  },
  data () {
    return {
      startwith: 'register',
      Token: API.Token,
      showAuthBox: false,
      auth: {
        username: ''
      }
    }
  },
  methods: {
    goDash () {
      this.showAuthBox = false
      setTimeout(() => {
        this.$router.push('/profile')
      }, 100)
    },
    checkUsername () {
      if (this.auth.username.length > 4) {
        this.startwith = 'register'
        API.checkUsernameTaken({ username: this.auth.username })
          .then((e) => {
            this.startwith = 'login'
            this.showAuthBox = true
          }, (e) => {
            this.startwith = 'register'
          })
      }
    },
    loginWizard () {
      this.showAuthBox = true
      // this.$router.push({
      //   path: '/connect',
      //   query: {
      //     username: this.auth.username
      //   }
      // })

      // this.showAuthBox = true

      // API.createCard({ title: this.auth.username || 'My New Card' })
      //   .then((data) => {
      //     console.log(data)
      //     setTimeout(() => {
      //       let cardID = data._id
      //       this.$router.push({
      //         path: `/builder/${cardID}`
      //       })
      //       this.showAuthBox = false
      //     }, 1)
      //   }, () => {
      //     this.showAuthBox = false
      //   })
    }
  }
}
</script>

<style scoped lang="postcss">
</style>
