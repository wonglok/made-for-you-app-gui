import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import store from './store'
import './app.postcss'
import '@fortawesome/fontawesome-free/css/all.css'

import * as API from './api/api.js'
// API.initCreationDevice()
API.initJWT()

Vue.config.productionTip = false

new Vue({
  router,
  // store,
  render: h => h(App)
}).$mount('#app')
