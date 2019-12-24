<template>
  <div class="bg">
    <div class="home-container">
      <div class="py-24 px-6 flex flex-col lg:flex-row justify-between items-start">
        <div class="lg:w-5/12">
          <Logo></Logo>
          <div class="text-md font-title pt-6 leading-normal text-gray-700">
            MadeForYouApp is a pro-creation invetion for you to be the dream person you want to be with.
          </div>
        </div>
        <div class="lg:w-3/12">
          <div class="title-height text-xl font-title font-black tracking-tighter text-black">Site Map</div>
          <div class="text-md font-title tracking-tighter text-black">
            Home
          </div>
          <div class="text-md font-title tracking-tighter text-black">
            Card Maker
          </div>
          <div class="text-md font-title tracking-tighter text-black">
            Card Gallery
          </div>
          <div class="text-md font-title tracking-tighter text-black">
            Our Story
          </div>
          <div class="text-md font-title tracking-tighter text-black">
            <a target="_blank" href="https://github.com/wonglok/made-for-you-app-gui">Github ↗️</a>
          </div>
        </div>
        <div class="lg:w-3/12">
          <div class="title-height text-xl font-title font-black tracking-tighter text-black">Credits</div>
          <div class="text-md font-title tracking-tighter text-black">
            Illustration by icons8.com/ouch
          </div>
          <div class="text-md font-title tracking-tighter text-black">
            Design by niceverynice.com
          </div>
        </div>
      </div>
      <div class="flex justify-end py-6 px-6 pb-12">
        <a target="_blank" href="https://twitter.com/WongLok831"><img class="p-3" src="../../assets/icons/twitter.svg" alt="Twitter"></a>
        <a target="_blank" href="https://www.instagram.com/wonglok831/"><img class="p-3" src="../../assets/icons/ig.svg" alt="Instagram"></a>
        <a target="_blank" href="https://www.facebook.com/okWealthy/"><img class="p-3" src="../../assets/icons/fb.svg" alt="Facebook"></a>
        <a target="_blank" href="https://github.com/wonglok/made-for-you-app-gui"><img class="p-3" src="../../assets/icons/github.svg" alt="Github"></a>
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
.title-height{
  height: 72px;
  display: flex;
  align-items: center;
}

</style>
