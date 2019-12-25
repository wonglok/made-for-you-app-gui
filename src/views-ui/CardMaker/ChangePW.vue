<template>
  <div v-if="core.ready">
    <div v-if="!core.cardMatchDevice">
      <div>
        You need an old password to udpate the password.
      </div>
      <div>
        Old Password: <input class="bg-blue-200" type="text" v-model="password" @keydown.enter="setAdminPW()">
      </div>
    </div>
    <div v-else>
      You can change Password.
    </div>

    <div>
      New Password: <input class="bg-green-200" type="text" v-model="newPassword" @keydown.enter="setAdminPW()">
    </div>
    <div v-if="msg">
      {{ msg }}
    </div>
  </div>
  <div v-else>
    Loading...
  </div>
</template>

<script>
// import * as API from '../../api/api'

export default {
  props: {
    cardID: {},
    core: {}
  },
  data () {
    return {
      msg: '',
      password: '',
      newPassword: ''
    }
  },
  async mounted () {
  },
  methods: {
    async setAdminPW () {
      this.msg = ''
      this.core.updatePW({ password: this.password, newPassword: this.newPassword })
        .then(() => {
          this.password = ''
          this.newPassword = ''
          this.msg = 'Password Changed Successfully'
        }, () => {
          this.msg = 'Cannot Change Password'
        })
        .then(() => {
          this.core.checkDevice()
        })
    }
  }
}
</script>

<style>

</style>
