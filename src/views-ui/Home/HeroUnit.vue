<template>
  <div class="flex justify-center items-center">
    <div class="flex flex-col pb-6 lg:flex-row lg:justify-between">
      <div class="flex justify-end lg:w-5/12 lg:order-2 h-64 lg:h-full">
        <img class="p-5 object-center object-contain floating" src="../../assets/images/marginalia-uploading.png" alt="illustration">
      </div>
      <div class="p-6 py-6 lg:py-20 lg:order-1 lg:w-9/12">
        <div class="py-4 font-title font-black text-4xl lg:text-6xl tracking-tighter leading-none text-black">
          Code fancy mobile sites with Visual Effect
        </div>
        <!-- <img src="../../assets/outlines/hero-h1.svg" alt="Heartfelt eCards with visual effects!"> -->
        <div class="pt-2 text-gray-700 text-2xl lg:text-2xl">
          Next level creative coding for your experiments.
        </div>
        <div class="lg:h-12"></div>
        <MakeCardCTA></MakeCardCTA>
        <!-- <GoDash v-if="Token.Profile"></GoDash> -->
      </div>
    </div>
  </div>
</template>

<script>
import * as API from '../../api/api'
export default {
  components: {
    ...require('../')
    // CTAMakeCard: require('../Shared/CTAMakeCard.vue').default
  },
  data () {
    return {
      Token: API.Token
    }
  }
}
</script>

<style scoped lang="postcss">
@keyframes floating {
  from {
    transform: translateY(-5px);
  }
  to{
    transform: translateY(5px);
  }
}

.floating {
  z-index: 0;
  animation: floating 1s ease-in-out 0s infinite alternate both;
}
</style>
