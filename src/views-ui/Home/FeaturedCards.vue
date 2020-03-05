<template>
  <div class="bg my-12">
    <div class="home-container">
      <div class="px-6 py-4 font-title font-black text-5xl tracking-tighter leading-none text-black">
        Featured Works
      </div>
      <div class="flex flex-col lg:flex-row justify-center items-center lg:justify-between px-3 py-6">
        <div :key="ft._id" v-for="(ft, fi) in featureds" :class="{ 'item-transform': true, [`item-${fi}`]: true }" class="relative rounded-lg m-3 w-72 h-128 max-w-full bg-white border border-gray-500">
          <iframe v-if="ft.site" class="w-full h-full rounded-lg" frameboder="0" :src="`/inside-iframe/${ft.site._id}`"></iframe>
          <a v-if="ft.site" class="inline-block h-full w-full absolute top-0 left-0" target="_blank" :href="`/runner.html?siteID=${ft.site._id}`">
          </a>
        </div>
        <!-- <div class=" rounded-lg m-3 w-64 h-64 xl:w-72 xl:h-72 bg-white border border-green-500">
          <iframe class="w-full h-full" frameboder="0" :src="`/inside-iframe/${'5e226b84dfaa69312b37e987'}`"></iframe>
        </div>
        <div class=" rounded-lg m-3 w-64 h-64 xl:w-72 xl:h-72 bg-white border border-blue-500">
          <iframe class="w-full h-full" frameboder="0" :src="`/inside-iframe/${'5e226b84dfaa69312b37e987'}`"></iframe>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import * as API from '../../api/api.js'
export default {
  data () {
    return {
      featureds: []
    }
  },
  async mounted () {
    this.featureds = await API.getFeatured({ type: 'landing' })
    console.log(this.featureds)
  }
}
</script>

<style scoped lang="postcss">
.bg{
  background-color: #ffffff;
}
.h-128 {
  height: 32rem;
}
.h-144 {
  height: 48rem;
}

/* @media screen and (min-width: 1920px) {
  .item-0{
    transform: perspective(100vmin) scale(0.9) rotateY(-15deg) rotateX(25deg);
  }
  .item-1{
    transform: perspective(100vmin) scale(0.9) rotateY(-15deg) rotateX(25deg);
  }
  .item-2{
    transform: perspective(100vmin) scale(0.9) rotateY(-15deg) rotateX(25deg);
  }
  .item-transform{
    transition: transform 0.5s;
  }
  .item-transform:hover{
    transform: perspective(100vmin);
    transition: transform 0.5s;
  }
} */

</style>
