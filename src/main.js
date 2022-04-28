import Vue from 'vue'
import App from './App.vue'

// import router, the main store, vuetify, and axios
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from 'axios'

Vue.config.productionTip = false
// set axios as property of the vue object
Vue.prototype.$axios = axios

new Vue({
  axios,
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
