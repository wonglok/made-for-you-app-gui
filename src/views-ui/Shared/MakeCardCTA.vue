<template>
  <div class="w-full">
    <div v-if="!Token.Profile" class="flex lg:justify-between bg-white text-xl rounded-full text-gray-500 p-2 my-3 lg:mx-5 enterbox lg:w-5/6">
      <div class="ml-4 p-3 w-full">
        <input v-model="card.title" type="text" class="outline-none w-full" placeholder="What's your username?" @keydown.enter="loginWizard">
      </div>
      <div class=" cursor-pointer w-32 bg-brand-primary hover:bg-purple-500 flex p-3 flex justify-center rounded-full transition-bg transition-500"  @click="loginWizard">
        <img class="select-none" src="../../assets/images/arrow-right.svg" alt="">
      </div>
    </div>
    <div v-if="Token.Profile" class="flex lg:justify-between  bg-white text-xl rounded-full text-gray-500 p-2 my-3 lg:mx-5 enterbox lg:w-5/6">
      <div class="ml-2 p-3 pl-4 w-full text-gray-700 cursor-pointer rounded-full hover:bg-gray-200 mx-4 p-3" @click="goDash">
        Welcome Back! Let's Create!
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
        <LoginRegister startwith="register" :username="card.title" @successful="goDash"></LoginRegister>
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
      Token: API.Token,
      showAuthBox: false,
      card: {
        title: ''
      }
    }
  },
  methods: {
    goDash () {
      this.showAuthBox = false
      setTimeout(() => {
        this.$router.push('/profile')
      }, 550)
    },
    loginWizard () {
      this.showAuthBox = true
      // this.$router.push({
      //   path: '/connect',
      //   query: {
      //     username: this.card.title
      //   }
      // })

      // this.showAuthBox = true

      // API.createCard({ title: this.card.title || 'My New Card' })
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
