import AuthClient from '@/services/auth.client'
const service = () => new AuthClient()

/** mutations types */
const set_user = 'set_user'

/** state */
const state = {
  user: {}
}

/** getters */
const getters = {
  user: state => state.user
}

/** mutations */
const mutations = {
  [set_user](state, data) {
    state.user = data
  }
}

/* set localstorage on auth */
function setCurrentAuthCred (data) {
  // write token to ls
  localStorage.setItem('currentUser', JSON.stringify(data.user))
  localStorage.setItem('jwt', data.jwt)
}

/** actions */
const actions = {
  login ({ commit }, payload) {
    return service()
      .login(payload)
      .then(response => {
        commit(set_user, response.user)
        /* set credentials */
        setCurrentAuthCred(response)
        return Promise.resolve()
      })
  },
  register ({ commit }, payload) {
    return service()
      .register(payload)
      .then(response => {
        commit(set_user, response.user)
        /* set credentials */
        setCurrentAuthCred(response)
        return Promise.resolve()
      })
  },
  // eslint-disable-next-line no-empty-pattern
  initResetPassword ({}, payload) {
    return service()
      .initResetPassword(payload)
      .then(response => {
        return Promise.resolve(response)
      })
  },
  // eslint-disable-next-line no-empty-pattern
  resetPassword ({}, payload) {
    return service()
      .resetPassword(payload)
      .then(response => {
        return Promise.resolve(response)
      })
  },
  // eslint-disable-next-line no-empty-pattern
  resendVerificationEmail ({}, payload) {
    return service()
      .resendVerificationEmail(payload)
      .then(response => {
        return Promise.resolve(response)
      })
  },
  // eslint-disable-next-line no-empty-pattern
  verifyEmail ({}, payload) {
    return service()
      .verifyEmail(payload)
      .then(response => {
        return Promise.resolve(response)
      })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
