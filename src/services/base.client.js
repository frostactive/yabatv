import axios from 'axios'

export default class BaseClient {
  constructor (options) {
    let headers = {} 
    const token = localStorage.getItem('jwt')
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
    const defaultOptions = {
      baseURL: process.env.VUE_APP_API_DOMAIN,
      headers,
      ...options
    }
    this.client = axios.create(defaultOptions)

    // Add a 401 response interceptor
    this.client.interceptors.response.use(
      function(response) {
        return response
      },
      function(error) {
        if (error.response.status === 403) {
          // clear ls
          localStorage.clear('jwt')
          window.location.href = '/app'
        }
        return Promise.reject(error)
      }
    )
  }

  get (route, params) {
    return this.client
      .get(route, params ? { params } : null)
      .then(response => response.data)
  }

  post (route, body, params) {
    return this.client
      .post(route, body, params)
      .then(response => response.data)
  }

  put (route, body, params) {
    return this.client
      .put(route, body, params)
      .then(response => response.data)
  }

  patch (route, body, params) {
    return this.client
      .patch(route, body, params)
      .then(response => response.data)
  }

  delete (route, body, params) {
    return this.client
      .delete(route, { data: body }, params)
      .then(response => response.data)
  }
}