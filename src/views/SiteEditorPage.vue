<template>
  <div class="w-full h-full flex justify-center items-center">
    <div class="text-center lg:hidden">
      <div class="brand-title">Sorry... 😭</div>
      <p>
        Please use desktop 🖥 / laptop 💻
      </p>
      <p>
        to visit the 3D visual effect site editor.
      </p>
      <p>
        <button class="brand-btn brand-btn-primary mt-6" @click="$router.go(-1)">⬅️ Back</button>
      </p>
      <p>
        <button class="brand-btn brand-btn-secondary border border-blue-400 mt-6" @click="$router.push({ path: `/site-id/${siteID}` })">👀 View Site</button>
      </p>
    </div>
    <SiteEditor class="hidden lg:block w-full h-full" :siteID="siteID"></SiteEditor>
  </div>
</template>

<script>
export default {
  components: {
    ...require('../views-ui/index.js')
  },
  computed: {
    siteID () {
      return this.$route.params.siteID
    }
  }
}
</script>

<style>

</style>
