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
                  <div class="headline mt-4">Reset Password</div>
                  <v-row
                    class="text-center"
                    v-if="status">
                    <v-col>
                      <div
                        class="pa-10">
                        <v-btn icon large class="mb-4 check-icon">
                          <v-icon large class="success--text">check</v-icon>
                        </v-btn>
                        <h3>Password reset successful</h3>
                        <p class="mt-3">You can now sign-in with your shiny ✨ new password</p>
                      </div>
                    </v-col>
                  </v-row>
                  <v-row
                    v-else>
                    <v-col cols="12">
                      <v-text-field
                        :label="!init ? 'Email' : ''"
                        name="email"
                        outlined
                        dense
                        required
                        clear-icon="edit"
                        v-model="value.email"
                        :filled="init"
                        :clearable="init"
                        :readonly="init"
                        @click:clear="reInit"
                        @blur="$v.value.email.$touch()"
                        :error-messages="emailErrors"
                      ></v-text-field>
                      <div
                        v-if="init">
                        <p class="mt-2 text--secondary">We sent you an email, use the secure token to complete password recovery</p>
                        <v-text-field
                          label="Token"
                          name="token"
                          outlined
                          dense
                          v-model="value.token"
                          @blur="$v.value.token.$touch()"
                          :error-messages="tokenErrors"
                        ></v-text-field>
                        <v-text-field
                          label="New Password"
                          name="password"
                          outlined
                          dense
                          hint="At least 8 characters"
                          :append-icon="
                            showPasswordText ? 'mdi-eye' : 'mdi-eye-off'
                          "
                          :type="showPasswordText ? 'text' : 'password'"
                          @click:append="showPasswordText = !showPasswordText"
                          v-model="value.password"
                          @blur="$v.value.password.$touch()"
                          :error-messages="passwordErrors"
                        ></v-text-field>
                      </div>
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
import { required, requiredIf, email, minLength } from 'vuelidate/lib/validators'
export default {
  name: 'InitResetPassword',
  mixins: [validationMixin],
  computed: {
    tokenErrors() {
      return this.generateRequiredError('token', 'Code')
    },
    passwordErrors() {
      if (this.$v.value.password.$dirty && !this.$v.value.password.required) {
        return ['Password is required']
      }
      if (this.$v.value.password.$dirty && !this.$v.value.password.minLength) {
        return ['Min 8 characters']
      }
      return []
    },
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
      init: false,
      status: false,
      value: {
        token: '',
        password: '',
        email: '',
      },
      showPasswordText: false
    }
  },
  methods: {
    reInit () {
      this.$v.$reset()
      this.value.token = ''
      this.value.password = ''
      this.init = false
    },
    generateRequiredError(key, suffix) {
      if (this.$v.value[key].$dirty && !this.$v.value[key].required) {
        return [`${suffix} is required`]
      }
      return []
    },
    initResetPassword() {
      if (this.isWorking) return
      this.isWorking = true
      let action
      let payload
      if (!this.init) {
        action = 'initResetPassword'
        payload = { email: this.value.email }
      } else {
        action = 'resetPassword'
        payload = this.value
      }
      this.$store
        .dispatch(`auth/${action}`, payload)
        .then(() => {
          if (!this.init) { 
            this.init = true
            return
          }
          this.status = true
        })
        .catch(() => {
          /* show snackbar */
          this.snackBar = true
          this.snackBarText = `Error: password reset failed`
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
      token: {
        required: requiredIf(function () {
          return this.init
        }),
      },
      password: {
        minLength: minLength(8),
        required: requiredIf(function () {
          return this.init
        }),
      },
    }
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
