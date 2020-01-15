<template>
  <form class="create-site" @submit.prevent="createSite">
    <div class="brand-title">
      Create Site
    </div>
    <div>
      <input type="text" placeholder="Site Title" class="p-3 mx-3 mb-3 ml-0 rounded-lg text-gray-700 w-64" v-model="create.title" />
      <div class="brand-btn" @click="createSite">Submit</div>
    </div>
  </form>
</template>

<script>
import * as API from '../../api/api'
export default {
  data () {
    return {
      bug: '',
      create: {
        title: ''
      }
    }
  },
  methods: {
    createSite () {
      if (API.Token.Profile && this.create.title) {
        this.bug = ''
        API.createSite({
          owner: API.Token.Profile,
          title: this.create.title
        })
          .then((data) => {
            this.create.title = ''
            this.$emit('ok', data)
          }, (msg) => {
            this.bug = msg
          })
      }
    }
  }
}
</script>

<style scoped lang="postcss">

</style>
