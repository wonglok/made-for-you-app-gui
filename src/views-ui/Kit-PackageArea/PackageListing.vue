<template>
  <div>
    <!-- <div class="brand-title">
      Sites
    </div> -->
    <div>
      <input type="text" placeholder="Search Template" class="font-title placeholder-black border-b border-gray-900 focus:outline-none text-4xl p-3 pb-0 px-0 my-2 bg-transparent" v-model="search" @keydown.enter="load()">
      <button class="px-6 py-2 hover:opacity-75 focus:outline-none mx-2 bg-white text-green-400 border-green-500 rounded-full shadow-xl" @click="pageAt += 1; load()">Next</button>
      <button class="px-6 py-2 hover:opacity-75 focus:outline-none mx-2 bg-white text-blue-400 border-blue-500 rounded-full shadow-xl" @click="pageAt += -1; load()">Previous</button>
    </div>
    <table class="bg-white pt-5 border-gray-700 shadow-xl rounded-lg rounded-br-none rounded-bl-none max-w-full inline-block overflow-x-auto scrolling-touch">
      <thead>
        <tr>
          <th class="px-4 py-2">Title</th>
          <th class="px-4 py-2" colspan="1">Date Updated</th>
          <th class="px-4 py-2" colspan="5">Actions</th>
        </tr>
      </thead>
      <tbody v-if="sites && sites.length > 0" class="">
        <tr :key="site._id" v-for="site in sites" class="hover:bg-gray-100">
          <!-- <td class="border px-4 py-2 text-center">{{ site.canShare ? `💎` : `` }}</td> -->
          <td class="border px-4 py-2">{{ site.title }}</td>
          <td class="border px-4 py-2">{{ ago(site.updatedAt) }}</td>
          <td class="cursor-pointer border px-4 py-2 text-orange-500 select-none hover:underline" @click="goClone(site)">
            Clone
          </td>
          <td v-if="!isTemplate" class="cursor-pointer border px-4 py-2 text-green-500 select-none hover:underline" @click="$emit('explore', site)">
            View Code
          </td>
          <td class="cursor-pointer border px-4 py-2 text-blue-500 select-none hover:underline">
            <a class="w-full h-full inline-block" target="_blank" :href="`/site-id/${site._id}`">
              View Site
            </a>
          </td>
        </tr>
      </tbody>
      <!-- type="module" -->
      <tbody v-if="sites && sites.length === 0">
        <tr>
          <td colspan="5" class="px-4 py-2 text-center border">
            - No Data -
          </td>
        </tr>
      </tbody>
      <tbody v-if="sites === false">
        <tr>
          <td colspan="5" class="px-4 py-2 text-center border">
            Loading...
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import * as API from '../../api/api'
import moment from 'moment'

export default {
  props: {
    isTemplate: {
      default: false
    }
  },
  data () {
    return {
      pageAt: 0,
      perPage: 10,
      search: '',
      sites: false
    }
  },
  watch: {
    search () {
      this.pageAt = 0
    }
  },
  async mounted () {
    this.load()
  },
  methods: {
    async load () {
      this.sites = await API.getSitePackages({ search: this.search, perPage: this.perPage, pageAt: this.pageAt })
    },
    async goClone (site) {
      if (window.confirm('clone site?')) {
        let userID = API.Token.Profile._id
        let result = await API.cloneSite({ site, userID })
        this.$router.push(`/site-editor/${result._id}`)
      }
    },
    ago (v) {
      return moment(v).calendar()
    }
  }
}
</script>

<style scoped lang="postcss">

</style>
