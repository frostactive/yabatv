<template>
  <div class="login">
    <v-form ref="form" @submit.prevent="login" novalidate>
      <v-container>
        <div class="text-center pt-6">
          <h1>Yaba TV</h1>
        </div>
        <v-row class="justify-center">
          <v-col class="col-4">
            <v-card class="mx-auto pa-4" outlined>
              <v-list-item three-line>
                <v-list-item-content>
                  <div class="overline mb-4">Welcome</div>
                  <v-list-item-title class="display-1 mb-1">
                    Sign in
                  </v-list-item-title>
                  <v-row>
                    <v-col>
                      <v-text-field
                        label="Email"
                        name="email"
                        outlined
                        dense
                        required
                        v-model="value.email"
                        @blur="$v.value.email.$touch()"
                        :error-messages="emailErrors"
                      ></v-text-field>
                      <v-text-field
                        label="Password"
                        name="password"
                        outlined
                        dense
                        required
                        hint="At least 8 characters"
                        :append-icon="
                          showPasswordText ? 'mdi-eye' : 'mdi-eye-off'
                        "
                        :type="showPasswordText ? 'text' : 'password'"
                        v-model="value.password"
                        @click:append="showPasswordText = !showPasswordText"
                        @blur="$v.value.password.$touch()"
                        :error-messages="passwordErrors"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
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
            <div class="pa-8 pt-6">
              <v-btn
                class="sign-up-btn"
                rounded
                light
                small
                elevation="0"
                :to="{ name: 'register' }"
              >
                <v-icon>lock_open</v-icon>Create an account
              </v-btn>
              <router-link
                class="float-right text--secondary body-2 pt-1"
                :to="{ name: 'resetpassword' }"
                >Forgot Password?</router-link
              >
            </div>
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
import { required, minLength, email } from 'vuelidate/lib/validators'
export default {
  name: 'Login',
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
    passwordErrors() {
      if (this.$v.value.password.$dirty && !this.$v.value.password.required) {
        return ['Password is required']
      }
      if (this.$v.value.password.$dirty && !this.$v.value.password.minLength) {
        return ['Min 8 characters']
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
      value: {
        email: '',
        password: ''
      },
      showPasswordText: false
    }
  },
  methods: {
    login() {
      if (this.isWorking) return
      this.isWorking = true
      this.$store
        .dispatch('auth/login', {
          email: this.value.email,
          password: this.value.password
        })
        .then(() => {
          this.$router.push({ name: 'home' })
        })
        .catch(() => {
          /* show snackbar */
          this.snackBar = true
          this.snackBarText = `Error: login failed`
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
      password: {
        required,
        minLength: minLength(8)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  .logo {
    width: 220px;
  }
  max-width: none;
  width: 100%;
  .sign-up-btn {
    padding-left: 10px !important;
    padding-right: 10px !important;
    background: #333 !important;
    color: #fff;
    * {
      margin-right: 5px;
      font-size: 16px;
    }
  }
}
</style>
