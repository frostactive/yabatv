<template>
  <div class="login">
    <v-form
      ref="form"
      @submit.prevent="initResetPassword"
      novalidate>
      <v-container>
        <div class="text-center pt-6">
          <h1>Yaba TV</h1>
        </div>
        <v-row class="justify-center">
          <v-col class="col-4">
            <v-card class="mx-auto pa-4" outlined>
              <v-list-item three-line>
                <v-list-item-content>
                  <v-list-item-title class="headline">
                    <v-btn
                      class="back-btn pl-4"
                      rounded
                      light
                      x-small
                      elevation="0"
                      :to="{ name: 'login' }">
                      <v-icon>keyboard_backspace</v-icon>Back to login
                    </v-btn>
                  </v-list-item-title>
                  <div class="headline mt-4">Resend Verification Email</div>
                  <v-row
                    class="text-center"
                    v-if="status">
                    <v-col>
                      <div
                        class="pa-10">
                        <v-btn icon large class="mb-4 check-icon">
                          <v-icon large class="success--text">check</v-icon>
                        </v-btn>
                        <h3>Email sent successfully!</h3>
                        <p class="mt-3">We've sent you a shiny ✨ new verification email.</p>
                      </div>
                    </v-col>
                  </v-row>
                  <v-row
                    v-else>
                    <v-col cols="12">
                      <v-text-field
                        label="Email"
                        name="email"
                        outlined
                        dense
                        required
                        clear-icon="edit"
                        v-model="value.email"
                        @blur="$v.value.email.$touch()"
                        :error-messages="emailErrors"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-btn
                        type="submit"
                        color="primary"
                        elevation="0"
                        :disabled="isSaveDisabled"
                        :loading="isWorking"
                        block
                        large
                      >
                        Submit
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-col>
        </v-row>
        <v-snackbar color="error" v-model="snackBar">
          {{ snackBarText }}
          <v-btn text @click="snackBar = false">
            Close
          </v-btn>
        </v-snackbar>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'
export default {
  name: 'ResendVerificationEmail',
  mixins: [validationMixin],
  computed: {
    emailErrors() {
      if (this.$v.value.email.$dirty && !this.$v.value.email.required) {
        return ['Email is required']
      }
      if (this.$v.value.email.$dirty && !this.$v.value.email.email) {
        return ['Invalid email']
      }
      return []
    },
    isSaveDisabled() {
      return this.$v.$invalid
    }
  },
  data() {
    return {
      isWorking: false,
      snackBar: false,
      snackBarText: null,
      status: false,
      value: {
        email: '',
      },
    }
  },
  methods: {
    initResetPassword() {
      if (this.isWorking) return
      this.isWorking = true
      this.$store
        .dispatch(`auth/resendVerificationEmail`, this.value)
        .then(() => {
          this.status = true
        })
        .catch(() => {
          /* show snackbar */
          this.snackBar = true
          this.snackBarText = `Error: email resend failed`
        })
        .finally(() => {
          this.isWorking = false
        })
    }
  },
  validations: {
    value: {
      email: {
        required,
        email
      },
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  max-width: none;
  width: 100%;
  .sign-up-btn {
    padding-left: 10px !important;
    padding-right: 10px !important;
    background: #1867c010 !important;
    * {
      margin-right: 5px;
      font-size: 20px;
    }
  }
  .back-btn {
    padding-left: 10px !important;
    padding-right: 10px !important;
    background: #333 !important;
    color: #fff;
    * {
      margin-right: 5px;
      font-size: 16px;
    }
  }

  .check-icon {
    background: #f0f0f0;
    pointer-events: none;
  }
}
</style>
