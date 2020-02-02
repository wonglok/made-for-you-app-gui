<template>
  <div>
    <div>
      <input type="text" placeholder="Search My Sites" class=" max-w-full font-title placeholder-black border-b border-gray-900 focus:outline-none text-4xl p-3 pb-0 px-0 my-2 bg-transparent" v-model="search" @keydown.enter="load()">
      <button class="px-6 py-2 mb-3 hover:opacity-75 focus:outline-none mx-2 bg-white text-green-400 border-green-500 rounded-full shadow-xl" @click="pageAt += 1; load()">Next</button>
      <button class="px-6 py-2 mb-3 hover:opacity-75 focus:outline-none mx-2 bg-white text-blue-400 border-blue-500 rounded-full shadow-xl" @click="pageAt += -1; load()">Previous</button>
    </div>

    <table class="bg-white shadow-xl  rounded-lg rounded-br-none rounded-bl-none max-w-full inline-block overflow-x-auto scrolling-touch">
      <thead>
        <tr>
          <th class="px-4 py-2">Shared</th>
          <th class="px-4 py-2">Title</th>
          <th class="px-4 py-2" colspan="5">Actions</th>
          <th class="px-4 py-2" colspan="1">Date Created</th>
        </tr>
      </thead>
      <tbody v-if="sites && sites.length > 0" class="">
        <tr :key="site._id" v-for="site in sites" class="hover:bg-gray-100">
          <td @click="toggleShare(site)" class="border px-4 py-2 text-center cursor-pointer hover:bg-gray-300">{{ site.canShare ? `💎` : `` }}</td>
          <td class="border px-4 py-2">{{ site.title }}</td>
          <td class="cursor-pointer border px-4 py-2 text-blue-500 select-none hover:underline">
            <a class="w-full h-full inline-block" target="_blank" :href="`/site-id/${site._id}`">
              View
            </a>
          </td>
          <td class="cursor-pointer border px-4 py-2 text-green-500 select-none hover:underline">
            <a class="w-full h-full inline-block" target="_blank" :href="`/site-editor/${site._id}`">
              Edit
            </a>
          </td>
          <td class="cursor-pointer border px-4 py-2 text-blue-500 select-none hover:underline" @click="goClone(site)">
            Clone
          </td>
          <td class="cursor-pointer border px-4 py-2 text-orange-500 select-none hover:underline"  @click="goRename(site)">
            Rename
          </td>
          <td class="cursor-pointer border px-4 py-2 text-red-500 select-none hover:underline" @click="goDelete(site)">
            Delete
          </td>
          <td class="border px-4 py-2">{{ ago(site.createdAt) }}</td>

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

    <ConfirmCode ref="removeSite">
    </ConfirmCode>
  </div>
</template>

<script>
import * as API from '../../api/api'
import moment from 'moment'
export default {
  components: {
    ...require('../index')
  },
  data () {
    return {
      perPage: 100,
      pageAt: 0,
      search: '',
      dialogue: false,
      sites: false,
      bug: ''
    }
  },
  mounted () {
    this.load()
    this.$on('load', this.load)
  },
  watch: {
    search () {
      this.pageAt = 0
    }
  },
  methods: {
    async goClone (site) {
      if (window.confirm('clone site?')) {
        let userID = API.Token.Profile._id
        let result = await API.cloneSite({ site, userID })
        await this.load()
        console.log(JSON.stringify(result, null, '  '))
      }
    },
    async load () {
      if (API.Token.Profile) {
        this.bug = ''
        API.listSite({
          owner: API.Token.Profile,
          pageAt: this.pageAt,
          perPage: this.perPage,
          search: this.search
        })
          .then((data) => {
            this.sites = data
          }, (msg) => {
            // console.log(msg)
            this.bug = msg
          })
      }
    },
    ago (v) {
      return moment(v).calendar()
    },
    goView (site) {
      // console.log('go edit')
      this.$router.push({
        path: `/site-id/${site._id}`
      })
    },
    goEdit (site) {
      // console.log('go edit')
      this.$router.push({
        path: `/site-editor/${site._id}`
      })
    },
    async goRename (site) {
      let pmpt = window.prompt(`What's the new name for the site?`)
      if (pmpt) {
        site.title = pmpt
        await API.updateSite({
          site,
          userID: API.Token.Profile._id
        })
        await this.load()
      }
    },
    async toggleShare (site) {
      site.canShare = !site.canShare
      await API.updateSite({
        site,
        userID: API.Token.Profile._id
      })
      await this.load()
    },
    async goDelete (site) {
      this.$refs['removeSite'].pop({
        confirm: site.slug,
        ok: async () => {
          await API.removeSite({ site, userID: API.Token.Profile._id })
          this.sites.splice(this.sites.findIndex(s => s._id === site._id), 1)
          this.load()
        },
        fail: async () => {
        }
      })
    }
  }
}
</script>

<style>

</style>
