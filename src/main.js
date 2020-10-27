import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueTheMask from 'vue-the-mask'
import Vuelidate from 'vuelidate'
import axios from 'axios'

Vue.config.productionTip = false
Vue.use(Vuelidate)
Vue.use(VueTheMask)

// Add a 401 response interceptor
axios.interceptors.response.use(
  function(response) {
    return response
  },
  function(error) {
    if (401 === error.response.status) {
      this.$router.push({ name: 'login' })
    } else {
      return Promise.reject(error)
    }
  }
)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
