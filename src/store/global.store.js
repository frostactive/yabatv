/** mutation types */
const set_cart = 'set_cart'
const set_is_inner = 'set_is_inner'

/** state */
const state = {
  cart: {},
  isInner: false
}

/** getters */
const getters = {
  cart: state => state.cart,
  isInner: state => state.isInner
}

/** mutations */
const mutations = {
  [set_cart](state, data) {
    state.cart = data
  },
  [set_is_inner](state, data) {
    state.isInner = data
  }
}

/** actions */
const actions = {
  setIsInner ({ commit }, data) {
    commit(set_is_inner, data)
  },
  setCart ({ commit }, data) {
    commit(set_cart, data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
