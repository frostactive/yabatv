<template>
  <div class="login">
    <v-container>
      <div class="text-center pt-6">
        <h1>Yaba TV</h1>
      </div>
      <v-row class="justify-center">
        <v-col class="col-4">
          <v-card class="mx-auto pa-4" outlined>
            <v-list-item three-line>
              <v-list-item-content>
                <div class="overline mb-4">Email Verification</div>
                <v-row
                  class="text-center">
                  <v-col>
                    <loader
                      v-if="isWorking"
                      style="height: 300px;"
                      message="Activating your email ..." />
                    <div
                      v-else>
                      <div
                        v-if="isVerified">
                        <v-btn icon large class="mt-10 mb-4 check-icon">
                          <v-icon large class="success--text">check</v-icon>
                        </v-btn>
                        <h3>Account activated</h3>
                        <p class="mt-3 text--secondary px-10 mb-10">Awesome! Login to start enjoying data-free media content.</p>
                        <v-btn
                          type="submit"
                          color="primary"
                          elevation="0"
                          block
                          large
                          :to="{ 'name': 'login' }"
                        >
                          Login
                        </v-btn>
                      </div>
                      <div
                        class="pa-10 pb-0"
                        v-else>
                        <v-btn icon large class="mb-4 check-icon">
                          <v-icon large class="error--text">report_off</v-icon>
                        </v-btn>
                        <h3>Account activation failed</h3>
                        <p class="mt-3 mb-10 text--secondary">We were unable to verify your email, your token might be expired or invalid.</p>
                        <v-btn
                          class="github-button primary--text"
                          small
                          outlined
                          :to="{ 'name': 'resendverification' }">
                          <v-icon class="mr-1" style="font-size: 20px;">mark_email_unread</v-icon>
                          Resend Verification Email
                        </v-btn>
                      </div>
                    </div>
                  </v-col>
                </v-row>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import Loader from '@/components/cards/Loader'
export default {
  name: 'VerifyEmail',
  components: { Loader },
  props: {
    token: {
      type: String,
      required: false
    }
  },
  data () {
    return {
      isWorking: true,
      isVerified: null,
    }
  },
  created () {
    this.$store
      .dispatch('auth/verifyEmail', {
        token: this.token,
      })
      .then(() => {
        this.isVerified = true
      })
      .catch(() => {
        this.isVerified = false
        /* show snackbar */
        this.snackBar = true
        this.snackBarText = `Error: login failed`
      })
      .finally(() => {
        this.isWorking = false
      })
  }
}
</script>
<style lang="scss" scoped>
.container {
  max-width: none;
  width: 100%;
  
  .check-icon {
    background: #f0f0f0;
    pointer-events: none;
  }
}
</style>
