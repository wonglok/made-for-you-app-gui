<template>
  <div class="w-full h-full bg-gray-200">
    <div class="w-full h-full overflow-x-hidden relative" ref="scroller">
      <div :key="'storeomgomgomg'" :class="{ 'visible': page === 'store' }" class="px-6">
        <div class="text-5xl font-title pt-2">
          Creative Code Store
        </div>
        <div class="font-title text-xl text-gray-500">Discover what's possible with Web Graphics Library...</div>
        <div class="w-full">
          <div class="flex flex-wrap justify-between py-6">
            <div :key="ft._id" v-for="(ft, fi) in featureds" class="relative mx-2 w-72" :class="{ 'ml-0': fi === 0, 'mr-0': ((fi + 1) % 3) === 0 }">
              <div class="relative w-full view-height rounded-lg bg-gray-200">
                <iframe v-if="page === 'store'" class="rounded-lg w-full h-full" frameboder="0" :src="`/inside-iframe/${ft.site._id}`"></iframe>
                <div @click="exploreCode(ft.site)" :target="'_' + ft.site.slug" class="absolute cursor-pointer block top-0 left-0 w-full h-full"></div>
              </div>
              <div class="actions mt-2">
                <div class="brand-btn brand-btn-primary" @click="cloneSite(ft.site)">Clone Site</div>
                <div class="brand-btn brand-btn-ok" @click="exploreCode(ft.site)">View Code</div>
                <a class="brand-btn brand-btn-minor realtive" :href="`/site-id/${ft.site._id}`" :target="'_' + ft.site.slug" >View Site</a>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="text-5xl font-title pt-2">
          Search Packages
        </div> -->
        <div class="w-full pb-20">
          <PackageListing @explore="exploreCode($event)"></PackageListing>
        </div>
      </div>
      <PackageViewer class="fixed package-viewer left-0 w-full bg-white" @back="page = 'store'" v-if="page === 'explore' && exploreSiteID" @bottom="toBottom" :app="app" :siteID="exploreSiteID"></PackageViewer>
    </div>
  </div>
</template>

<script>
import * as API from '../../api/api'
// import { Carousel, Slide } from 'vue-carousel'
export default {
  props: {
    app: {
      default: false
    }
  },
  components: {
    // Carousel,
    // Slide,
    ...require('../index.js')
  },
  data () {
    return {
      page: 'store',
      exploreSiteID: false,
      featureds: []
    }
  },
  async mounted () {
    this.featureds = (await API.getFeatured({ type: 'store' })).slice(0, 3)
    this.$on('bottom', () => {
      this.toBottom()
    })
  },
  methods: {
    exploreCode (site) {
      this.page = 'explore'
      this.exploreSiteID = site._id
    },
    toBottom () {
      this.$nextTick(() => {
        if (this.$refs.scroller) {
          this.$refs.scroller.scrollTop = this.$refs.scroller.scrollHeight
        }
      })
    },
    async cloneSite (site) {
      if (window.confirm('Clone and remix site?')) {
        let userID = API.Token.Profile._id
        let result = await API.cloneSite({ site, userID })
        window.location.assign(`/site-editor/${result._id}`)
      }
    }
  }
}
</script>

<style scoped lang="postcss">
.fixed-col{
  width: 192px;
  border-right: #D3D3D3 solid 1px;
}
.remain-col{
  width: calc(100% - 192px * 3);
}
.view-height{
  height: 30rem;
}
.package-viewer{
  top: 64px;
  height: calc(100% - 64px);
}
</style>
