import BaseClient from './base.client'

export default class AuthClient extends BaseClient {
  constructor () {
    super ()
  }

  getVideos () {
    return this.get('/v1/videos')
  }

  getVideo (video) {
    return this.get(`/v1/videos/${video}`)
  }
}
