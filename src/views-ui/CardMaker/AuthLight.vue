<template>
  <div>
    <div v-if="core.canEdit">
      You can edit now.
    </div>
    <div v-if="!core.canEdit">
      You need to login to Enable Editing.
    </div>
    <div v-if="!core.canEdit">
      <input type="password" class="bg-red-200" v-model="core.password" @keydown.enter="checkBoth()" />
    </div>
  </div>
</template>

<script>
import * as API from '../../api/api'

export default {
  props: {
    cardID: {},
    core: {}
  },
  data () {
    return {
      creationID: API.CreationDevice.uuid,
      password: '',
      card: false
    }
  },
  async mounted () {
  },
  methods: {
    async checkBoth () {
      this.core.checkAdmin({ cardID: this.cardID, password: this.core.password })
    }
  }
}
</script>

<style>

</style>
