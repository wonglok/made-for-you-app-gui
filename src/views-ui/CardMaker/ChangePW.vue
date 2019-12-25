<template>
  <div>
    <div v-if="!cardMatchesDeviceID">
      OLD: <input class="bg-blue-200" type="text" v-model="password" @keydown.enter="setAdminPW()">
    </div>
    <div v-else>
      Authorised by device <br />
      CreationDevice: {{ creationID }}
    </div>

    NEW: <input class="bg-green-200" type="text" v-model="newPassword" @keydown.enter="setAdminPW()">
    <!-- <pre>{{ card }}</pre> -->
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
      newPassword: '',
      cardMatchesDeviceID: false
    }
  },
  async mounted () {
    this.checkDeviceID()
  },
  methods: {
    async setAdminPW () {
      return API.setAdminPW({ cardID: this.cardID, password: this.password, newPassword: this.newPassword })
        .then((data) => {
          this.password = this.newPassword
          window.alert('pw changed')
        }, () => {
          window.alert('cannot chnage password')
        })
        .then(async () => {
          this.checkDeviceID()
        })
    },
    async checkDeviceID () {
      this.cardMatchesDeviceID = false
      return API.checkAdmin({ cardID: this.cardID })
        .then((data) => {
          if (data.ok) {
            this.cardMatchesDeviceID = true
          }
        }, () => {
          console.log('')
        })
    },
    // async checkBoth () {
    //   this.canWrite = false
    //   return API.checkAdmin({ cardID: this.cardID, password: this.password })
    //     .then((data) => {
    //       if (data.ok) {
    //         this.canWrite = true
    //       }
    //     }, () => {
    //       console.log('')
    //     })
    // },
    // async loadCard () {
    //   return API.getCard({ cardID: this.cardID })
    //     .then((data) => {
    //       this.card = data
    //     }, () => {
    //     })
    // },
    async updateCard () {
      return API.getCard({ cardID: this.cardID, password: this.password })
        .then((data) => {
          this.card = data
        }, () => {
        })
    }
  }
}
</script>

<style>

</style>
