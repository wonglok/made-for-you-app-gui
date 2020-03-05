import Vue from 'vue'
import router from './router/runnerRouter'
import Runner from './views/SiteViewerPage.vue'
let params = new URLSearchParams(window.location.search)
new Vue({
  router,
  components: {
    Runner
  },
  data () {
    return {
      siteID: params.get('siteID') || false,
      pageKey: params.get('previewPageKey') || false
    }
  },
  template: `
    <Runner :pageKey="pageKey" :siteID="siteID"></Runner>
  `
}).$mount('#app')
