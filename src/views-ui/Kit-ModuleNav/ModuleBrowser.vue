<template>
  <div>
    <LayoutHeader class="relative">
      <div class="w-full h-full flex justify-between">
        <div class="inline-flex justify-center items-center ml-2">
          <img class="cursor-pointer" src="./img/search.svg" />
        </div>

        <div class="inline-flex justify-start items-center pl-1 pr-1">
          <input class="input-filter text-xs" type="text" v-model="query" placeholder="All Modules" />
        </div>

        <div class="inline-flex justify-center items-center mr-2">
          <img class="cursor-pointer" src="./img/plus.svg" @click="$root.$emit('close-all-dark-overlay'); show.createModule = true; " />
        </div>

      </div>
      <CreateModule :show="show" :app="app"></CreateModule>
    </LayoutHeader>
    <div>
      <div class="text-sm ml-2 mt-3 text-gray-600 font-bold" v-if="getType('page').length > 0">
        Pages
      </div>
      <div class="" :key="mod._id" v-for="mod in getType('page')">
        <ModuleEntry :app="app" @select="v => app.selected.moduleID = v._id" :mod="mod"></ModuleEntry>
      </div>
      <div class="text-sm ml-2 mt-3 text-gray-600 font-bold" v-if="getType('code').length > 0">
        Reusable Module
      </div>
      <div class="" :key="mod._id" v-for="mod in getType('code')">
        <ModuleEntry :app="app" @select="v => app.selected.moduleID = v._id" :mod="mod"></ModuleEntry>
      </div>
      <!-- {{ modules }} -->
    </div>
  </div>
</template>

<script>
import * as API from '../../api/api'
export default {
  props: {
    app: {
      require: true
    }
  },
  components: {
    ...require('../index.js')
  },
  data () {
    return {
      show: {
        createModule: false
      },
      query: ''
    }
  },
  computed: {
    modules () {
      return this.app.modules
    }
  },
  methods: {
    getType (type = 'page') {
      return this.modules.filter(this.filterQuery).filter(m => m.type === type)
    },
    filterQuery (mod) {
      if (!this.query) {
        return true
      } else {
        let q = this.query
        let name = `@${mod.type}-${mod.key}`
        if (name.indexOf(q) !== -1) {
          return true
        }
      }
    },
    addModule ({ type = 'code' }) {
      API.createModule({
        key: `justCreated`,
        type: type,
        site: this.app.site
      }).then(() => {
        return API.getSiteModules({ siteID: this.app.siteID })
          .then((data) => {
            this.app.modules = data
          })
      })
      this.show.createModule = false
    }
  }
}
</script>

<style scoped>
.input-filter{
  background-color: #FAFAFA;
  /* border-bottom: silver solid 1px; */
}
</style>
