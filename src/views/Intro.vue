<template>
  <div class="relative">
    <TitleUI>
      Made For You App.com
    </TitleUI>

    <div class="mx-4">
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

    <div class="mx-4 pt-1">
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
</style>
