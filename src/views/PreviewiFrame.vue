<template>
  <div class="w-full h-full">
    <iframe class="w-full h-full" ref="iframe" frameboder="0" :src="`/runner.html?siteID=${$route.params.siteID}`"></iframe>
  </div>
</template>

<script>
export default {
}
</script>

<style>

</style>
