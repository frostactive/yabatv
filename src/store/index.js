import Vue from 'vue'
import Vuex from 'vuex'
import global from './global.store'
import auth from './auth.store'
import film from './film.store'
import concession from './concession.store'

Vue.use(Vuex)

const store = new Vuex.Store({
  namespaced: true,
  state: {},
  mutations: {},
  actions: {},
  modules: {}
})

store.registerModule('global', global)
store.registerModule('auth', auth)
store.registerModule('film', film)
store.registerModule('concession', concession)

const handleDefault = () => {
  if (localStorage.getItem('currentUser')) {
    const user = JSON.parse(localStorage.getItem('currentUser'))
    store.commit('auth/set_user', user)
  }
}

handleDefault()
export default store
