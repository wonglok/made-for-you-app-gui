<template>
  <div class="w-full">
    <div class="flex lg:justify-between bg-white text-xl rounded-full text-gray-500 p-2 my-3 lg:mx-5 enterbox lg:w-5/6">
      <div class="ml-4 p-3 w-full">
        <input v-model="card.title" type="text" class="outline-none w-full" placeholder="To try out, Give your site a title" @keydown.enter="createWizard">
      </div>
      <div class=" cursor-pointer w-32 bg-brand-primary hover:bg-purple-500 flex p-3 flex justify-center rounded-full transition-bg transition-500"  @click="createWizard">
        <img class="select-none" src="../../assets/images/arrow-right.svg" alt="">
      </div>
    </div>

    <!-- <div class="flex text-gray-600 pl-12">
      Let's go!
    </div> -->

    <!-- use the modal component, pass in the prop -->
    <PopupBox v-if="showLoading" @close="showLoading = false" :locked="true">
      <div>
        <SpinnerGrid />
      </div>
    </PopupBox>
  </div>
</template>

<script>
// import * as API from '../../api/api'
export default {
  components: {
    ...require('../index.js')
  },
  data () {
    return {
      showLoading: false,
      card: {
        title: ''
      }
    }
  },
  methods: {
    createWizard () {
      this.showLoading = true

      // API.createCard({ title: this.card.title || 'My New Card' })
      //   .then((data) => {
      //     console.log(data)
      //     setTimeout(() => {
      //       let cardID = data._id
      //       this.$router.push({
      //         path: `/builder/${cardID}`
      //       })
      //       this.showLoading = false
      //     }, 1)
      //   }, () => {
      //     this.showLoading = false
      //   })
    }
  }
}
</script>

<style scoped lang="postcss">
</style>
