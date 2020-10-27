import ConcessionDTO from '@/entities/ConcessionDTO'

import MediaClient from '@/services/media.client'
const service = () => new MediaClient()

/** mutation types */
const set_concessions = 'set_concessions'
const set_current_concession = 'set_current_concession'

/** state */
const state = {
  concessions: [],
  currentConcession: {}
}

/** getters */
const getters = {
  concessions: state => state.concessions,
  currentConcession: state => state.currentConcession
}

/** mutations */
const mutations = {
  [set_concessions](state, data) {
    state.concessions = data
  },
  [set_current_concession](state, data) {
    state.currentConcession = data
  }
}

/** actions */
const actions = {
  setCurrentConcession ({ commit }, data) {
    commit(set_current_concession, data)
  },
  getConcessions ({ commit }) {
    return service()
      .getConcessions()
      .then(response => {
        let items = {}
        response.data.forEach(item => {
          if (!items[item.group]) {
            items[item.group] = []
          }
          let concession = new ConcessionDTO(item)
          items[item.group] = [
            ...items[item.group],
            concession
          ]
        });
        console.log(items)
        commit(set_concessions, items)
        Promise.resolve(response)
      })
  },
  getConcession ({ commit }, id) {
    return service()
      .getConcession(id)
      .then(response => {
        commit(set_current_concession, new ConcessionDTO(response.data))
        Promise.resolve(response)
      })
  },
  getConcessionShowtimes (_, id) {
    return service()
      .getConcessionShowtimes(id)
      .then(response => {
        Promise.resolve(response)
        return response
      })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
