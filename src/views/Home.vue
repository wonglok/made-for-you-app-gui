<template>
  <div class="relative">
    <div class="mt-2 mx-4 text-2xl font-bold py-2 border-b border-gray-200">
      Made For You App.com
    </div>
    <div class="mx-4 my-4">
      <div class="w-full">
        <img class="w-full" src="../assets/images/noisy.png" alt="Social is noisy. Let's be what's meant to be.">
      </div>
      <p class="py-3">
        Feature Under Development.
      </p>
    </div>

    <div class="px-6">
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

    <div class="fixed bottom-0 left-0 lg:relative mt-4 p-4 flex justify-center">
      <router-link to="/create" class="">
        <img class="cursor-pointer" src="../assets/images/craft-cta.png" alt="Social is noisy. Let's be what's meant to be.">
      </router-link>
    </div>

  </div>
</template>

<script>
export default {
  name: 'save',
  components: {
    // TabBar: require('./TabBar.vue').default
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="postcss">
</style>
