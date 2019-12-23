<template>
  <div class="bg">
    <div class="home-container py-24">
      <div class="flex flex-col lg:flex-row justify-center items-center">
        <div>
          <img src="../../assets/images/puppy-waiting.png" alt="Puppt Waiting">
        </div>
        <div class="w-2/3">
          <div class="py-4 font-title font-black text-5xl tracking-tighter leading-none text-black">
            Little Puppy is waiting for you!
          </div>
          <div class="text-lg font-title leading-relaxed text-gray-700">
            Give your eCard a title to begin the journey of story telling!
          </div>
          <div class="pt-12">
            <CTAMakeCard></CTAMakeCard>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    ...require('../index.js')
  }
}
</script>

<style scoped lang="postcss">
.bg{
  background-color: rgb(228, 228, 228);
}
</style>
