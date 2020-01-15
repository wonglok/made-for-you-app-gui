<template>
  <div>
    <div class="brand-title">
      Sites
    </div>
    <table class="table-auto bg-white shadow-xl  rounded-lg rounded-br-none rounded-bl-none">
      <thead>
        <tr>
          <th class="px-4 py-2">Title</th>
          <th class="px-4 py-2" colspan="1">Date Created</th>
          <th class="px-4 py-2" colspan="3">Actions</th>
        </tr>
      </thead>
      <tbody v-if="sites.length > 0">
        <tr :key="site._id" v-for="site in sites" class="hover:bg-gray-100">
          <td class="border px-4 py-2">{{ site.title }}</td>
          <td class="border px-4 py-2">{{ ago(site.createdAt) }}</td>
          <td class="cursor-pointer border px-4 py-2 text-blue-500 select-none hover:underline" @click="goView(site)">
            View
          </td>
          <td class="cursor-pointer border px-4 py-2 text-green-500 select-none hover:underline" @click="goEdit(site)">
            Edit
          </td>
          <td class="cursor-pointer border px-4 py-2 text-red-500 select-none hover:underline" @click="goDelete(site)">
            Delete
          </td>
        </tr>
      </tbody>
      <tbody v-if="sites.length === 0">
        <tr>
          <td colspan="4" class="px-4 py-2 text-center border">
            - No Data -
          </td>
        </tr>
      </tbody>
    </table>

    <ConfirmName ref="removeSite">
    </ConfirmName>

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
      dialogue: false,
      sites: [],
      bug: ''
    }
  },
  mounted () {
    this.load()
    this.$on('load', this.load)
  },
  methods: {
    async load () {
      if (API.Token.Profile) {
        this.bug = ''
        API.listSite({
          owner: API.Token.Profile,
          pageAt: 0,
          perPage: 15,
          search: ''
        })
          .then((data) => {
            this.sites = data
          }, (msg) => {
            console.log(msg)
            this.bug = msg
          })
      }
    },
    ago (v) {
      return moment(v).calendar()
    },
    goView () {
      console.log('go view')
    },
    goEdit (site) {
      // console.log('go edit')
      this.$router.push({
        path: `/site-editor/${site.slug}/${site._id}`
      })
    },
    async goDelete (site) {
      this.$refs['removeSite'].pop({
        confirm: site.slug,
        ok: async () => {
          await API.removeSite({ site })
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
