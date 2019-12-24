<template>
  <div class="w-full">
    <div class="flex lg:justify-between bg-white text-xl rounded-full text-gray-500 p-2 my-3 lg:mx-5 enterbox lg:w-5/6">
      <div class="ml-4 p-3 w-full">
        <input v-model="card.title" type="text" class="outline-none w-full" placeholder="Name Your eCard" @keydown.enter="createWizard">
      </div>
      <div class=" cursor-pointer w-32 bg-brand-primary hover:bg-purple-500 flex p-3 flex justify-center rounded-full transition-bg transition-500"  @click="createWizard">
        <img class="select-none" src="../../assets/images/arrow-right.svg" alt="">
      </div>
    </div>

    <div class="flex text-gray-600 pl-12">
      No Login or Credit Card Required.
    </div>

    <!-- use the modal component, pass in the prop -->
    <PopupBox v-if="showCreating" @close="showCreating = false" :locked="true">
      <Spinner />
    </PopupBox>
  </div>
</template>

<script>
export default {
  components: {
    ...require('../index.js')
  },
  data () {
    return {
      showCreating: false,
      card: {
        title: ''
      }
    }
  },
  methods: {
    createWizard () {
      this.showCreating = true
      setTimeout(() => {
        this.showCreating = false
        let cardID = 'omgomgomgs'
        this.$router.push({
          path: `/card-maker/${cardID}`
        })
      }, 2000)
    }
  }
}
</script>

<style scoped lang="postcss">
</style>
