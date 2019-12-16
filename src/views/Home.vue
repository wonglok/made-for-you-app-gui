<template>
  <div class="mx-auto max-w-sm">
    <div class="relative">
      <div class="p-4 text-2xl font-bold py-2 border-b border-gray-200">
        MadeForYouApp.com
      </div>

      <div class="p-4 mb-4">
        <img class="w-full" src="../assets/images/noisy.png" alt="Social is noisy. Let's be what's meant to be.">
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
      <div class="h-32 lg:hidden"></div>
    </div>

    <div class="mx-auto max-w-sm">
      <div class="fixed bottom-0 left-0 lg:relative w-full flex justify-center">
        <router-link to="/create" class="mt-4 p-4">
          <img class="my-shadow  w-full cursor-pointer" src="../assets/images/craft-cta.png" alt="Social is noisy. Let's be what's meant to be.">
        </router-link>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'home',
  components: {
  }
}
</script>

<style scoped>
.w-r25{
  width: 25rem;
}
.img-r25{
  width: 100%;
}
</style>
