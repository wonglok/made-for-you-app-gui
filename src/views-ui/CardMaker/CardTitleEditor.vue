<template>
  <div>
    <div v-if='core.ready'>
      <input :class="{ 'bg-gray-200': !core.canEdit, 'bg-green-300': core.canEdit }" type="text" :disabled="!core.canEdit" v-model="core.card.displayName">
      <span>
        {{ core.saving ? 'Saving' : '' }}
      </span>
      <pre>{{ core.card }}</pre>

      <!-- <PopupBox v-if="open" @close="open = false" :locked="true">
        <div class="bg-white p-6" @click="open = false">
          I love to dance.
        </div>
      </PopupBox> -->

      <button @click="test">Test</button>
    </div>
    <div v-else>
      Loading...
    </div>
  </div>
</template>

<script>
export default {
  props: {
    core: {}
  },
  data () {
    return {
      open: false
    }
  },
  components: {
    // ...require('../index.js')
  },
  methods: {
    async test () {
      this.open = true

      // let mod = await import('../../api/api.js')
      // mod.getDeviceCards()
      // let res = this.core.listRenderables({ pageAt: 0, perPage: 25, search: '' })
      // res.then((data) => {
      //   console.log(data)
      // })

      // let renderable = {
      //   "_id": "5e029fc0e159702057dcd60f",
      //   "js": {
      //     "omg": "1234"
      //   },
      //   "meta": {
      //     "omg": "1234"
      //   },
      //   "title": "my-title",
      //   "createdAt": "2019-12-24T23:31:12.221Z",
      //   "updatedAt": "2019-12-24T23:39:15.527Z",
      //   "__v": 0,
      //   "slug": "my-title",
      //   "displayName": "my-title",
      //   "preview": null,
      //   "id": "5e029fc0e159702057dcd60f"
      // }
      // let newitem = {
      //   // "_id": "5e05f182af8f722af961b909",
      //   "usermeta": {
      //     "myuserdata": 123 + Math.random(),
      //     "myuserdata2": 1234 + Math.random()
      //   },
      //   "renderable": renderable
      // }
      // this.core.card.renderables.push(newitem)
    }
  }
}
</script>

<style>

</style>
