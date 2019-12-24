<template>
  <div class="flex justify-center items-center">
    <div class="flex flex-col pb-6 lg:flex-row lg:justify-between">
      <div class="flex justify-end lg:w-5/12 lg:order-2 h-64 lg:h-full">
        <img class="p-5 object-center object-contain" src="../../assets/images/marginalia-uploading.png" alt="illustration">
      </div>
      <div class="p-6 py-6 lg:py-20 lg:order-1">
        <img src="../../assets/outlines/hero-h1.svg" alt="Heartfelt eCards with visual effects!">
        <div class="pt-8 text-gray-700 text-2xl lg:text-3xl">
          Write your essential message for your loved ones!
        </div>
        <MakeCardCTA></MakeCardCTA>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    ...require('../index.js')
    // CTAMakeCard: require('../Shared/CTAMakeCard.vue').default
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
