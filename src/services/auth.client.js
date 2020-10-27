import BaseClient from './base.client'

export default class AuthClient extends BaseClient {
  constructor () {
    super ()
  }

  login (userData) {
    return this.post('/v1/login', userData)
  }

  register (userData) {
    return this.post('/v1/signup', userData)
  }

  initResetPassword (data) {
    return this.post('/v1/initiate-reset-password', data)
  }

  resetPassword (data) {
    return this.post('/v1/reset-password', data)
  }

  resendVerificationEmail (data) {
    return this.post('/v1/resend-verification-email', data)
  }

  verifyEmail (params) {
    return this.get('/v1/verify-email', params)
  }
}
