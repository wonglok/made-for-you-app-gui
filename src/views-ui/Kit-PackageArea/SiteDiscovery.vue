<template>
  <div class="pt-4 px-4">
    <div class="m-2">
      <div class="text-md text-gray-500">
        Package Sharing
      </div>
      <div class="mt-4">
        <Switches :color="'green'" label type-bold="true" v-model="app.site.canShare"></Switches>
      </div>
    </div>
    <div class="m-2">
      <div class="text-md text-gray-500">
        Display Name
      </div>
      <input placeholder="title" class="text-lg p-2 placeholder-gray-700 rounded-lg bg-gray-200" type="text" v-model="app.site.title" />
    </div>
    <div class="m-2">
      <div class="text-md text-gray-500">
        Description
      </div>
      <textarea cols="40" rows="5" placeholder="description" class="text-lg p-2 placeholder-gray-700 resize-y rounded-lg bg-gray-200" v-model="app.site.desc"></textarea>
    </div>
    <div class="m-2">
      <div class="text-md text-gray-500">
        Submit
      </div>
      <button class="text-lg p-2 px-4 placeholder-gray-700 rounded-lg" :class="{ 'bg-gray-200': msg === 'Submit', 'bg-blue-200': msg === 'Loading', 'bg-green-200': msg === 'OK', 'bg-red-200': msg === 'Failed' }" :disabled="msg === 'Loading'" @click="updateSite">{{ msg }}</button>
    </div>
    <!-- <pre>{{ app.site }}</pre> -->
  </div>
</template>

<script>
import Switches from 'vue-switches'
import * as API from '../../api/api.js'

export default {
  props: {
    app: {}
  },
  components: {
    Switches,
    ...require('../index.js')
  },
  data () {
    return {
      msg: 'Submit'
    }
  },
  methods: {
    async updateSite () {
      this.msg = 'Loading'
      await API.updateSite({ site: this.app.site, userID: this.app.userID })
        .then(() => {
          this.msg = 'OK'
        }, () => {
          this.msg = 'Failed'
        })
      setTimeout(() => {
        this.msg = 'Submit'
      }, 1000)
    }
  }
}
</script>

<style scoped lang="postcss">

</style>
