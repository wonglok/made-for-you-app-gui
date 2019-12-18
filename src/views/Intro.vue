<template>
  <div class="full flex items-center">
    <div class="relative full max-w-sm h-full w-full lg:max-w-lg mx-auto app-box relative border-on-large bg-white-trans">
      <div class="lg:overflow-y-auto lg:scrolling-touch h-full w-full">
        <MagicBG class="pinbtm top-0 left-0"></MagicBG>
        <div class="absolute z-40">
          <div class="mx-4 pt-5">
            <img class="w-full" src="../assets/images/noisy.png" alt="Social is noisy. Let's be what's meant to be.">
          </div>

          <div class="px-6 pt-5">
            <h2 class="text-2xl font-bold">
              Made For You App.com
            </h2>
            <p class="my-4">
              When the Social World is too noisy,
              all we really want is
              <span class="green-label">realness</span>, <span class="blue-label">kindness</span>, and <span class="red-label">love</span>. 💎
            </p>
            <p class="my-4">
              The quickest way to have real love is to
              <br />
              <span class="orange-label">Be love and 🤲🏻 Give Love.</span>
            </p>
            <p class="my-4">
              Let’s ❤️ love yourself
              <br />
              a little bit more everyday
              <br />
              by making and giving more.
            </p>
          </div>

          <div class="h-32"></div>
        </div>
      </div>

      <div class="pt-1 pinbtm z-50 w-full bottom-0 left-0 flex justify-center">
        <router-link to="/create" class="block pb-5 px-4 max-w-sm lg:max-w-lg mx-auto">
          <img class="cursor-pointer" src="../assets/images/craft-cta.png" alt="Social is noisy. Let's be what's meant to be.">
        </router-link>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'save',
  components: {
    ...require('../views-ui/UIs.js').default
    // TabBar: require('./TabBar.vue').default
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="postcss">
.app-box{
  max-width: 32rem;
  max-height: calc(32rem * 16 / 9);
}
@media screen and (min-height: 57rem) {
  .border-on-large{
    @apply border border-gray-400 rounded-lg;
  }
}
.pinbtm{
  position: fixed;
}
@media screen and (min-height: 57rem) {
  .pinbtm{
    position: absolute;
  }
}
.bg-white-trans{
  background-color: rgba(255,255,255,0.2);
}
</style>
