import FilmDTO from '@/entities/FilmDTO'

import MediaClient from '@/services/media.client'
const service = () => new MediaClient()

/** mutation types */
const set_films = 'set_films'
const set_current_film = 'set_current_film'

/** state */
const state = {
  films: [],
  currentFilm: {}
}

/** getters */
const getters = {
  films: state => state.films,
  currentFilm: state => state.currentFilm
}

/** mutations */
const mutations = {
  [set_films](state, data) {
    state.films = data
  },
  [set_current_film](state, data) {
    state.currentFilm = data
  }
}

/** actions */
const actions = {
  setCurrentFilm ({ commit }, data) {
    commit(set_current_film, data)
  },
  getVideos ({ commit }) {
    return service()
      .getVideos()
      .then(response => {
        const films = response.map(film => new FilmDTO(film))
        commit(set_films, films)
        Promise.resolve(response)
      })
  },
  getVideo ({ commit }, id) {
    return service()
      .getVideo(id)
      .then(response => {
        commit(set_current_film, new FilmDTO(response))
        Promise.resolve(response)
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
