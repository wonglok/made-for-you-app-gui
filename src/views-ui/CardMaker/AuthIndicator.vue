<template>
  <div>
    <div>
        Mode: {{ canWrite ? 'You Can Edit' : 'You can read Only' }}
    </div>
    <div v-if="!canWrite">
      <input type="password" class="bg-red-200" v-model="password" @keydown.enter="checkBoth()" />
    </div>
  </div>
</template>

<script>
import * as API from '../../api/api'

export default {
  props: {
    cardID: {}
  },
  data () {
    return {
      creationID: API.CreationDevice.uuid,
      password: '',
      card: false,
      canWrite: false
    }
  },
  async mounted () {
    this.checkBoth()
  },
  methods: {
    async checkBoth () {
      this.canWrite = false
      return API.checkAdmin({ cardID: this.cardID, password: this.password })
        .then((data) => {
          if (data.ok) {
            this.canWrite = true
          }
        }, () => {
        })
        .then(() => {
          this.$emit('can-edit', this.canWrite)
        })
    }
  }
}
</script>

<style>

</style>
