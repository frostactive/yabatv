<template>
  <div class="login">
    <v-form ref="form" @submit.prevent="register" novalidate>
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
                  <v-list-item-title class="headline mt-4">
                    Create an account
                  </v-list-item-title>
                  <v-row>
                    <v-col>
                      <v-text-field
                        label="First name"
                        name="fname"
                        outlined
                        dense
                        required
                        v-model="value.fname"
                        @blur="$v.value.fname.$touch()"
                        :error-messages="firstNameErrors"
                      ></v-text-field>
                      <v-text-field
                        label="Last name"
                        name="lname"
                        outlined
                        dense
                        required
                        v-model="value.lname"
                        @blur="$v.value.lname.$touch()"
                        :error-messages="lastNameErrors"
                      ></v-text-field>
                      <v-text-field
                        label="Mobile number"
                        name="mobile"
                        type="tel"
                        v-mask="'234 (###) ### ####'"
                        outlined
                        dense
                        required
                        v-model="value.mobile"
                        @blur="$v.value.mobile.$touch()"
                        :error-messages="mobileErrors"
                      ></v-text-field>
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
                        :append-icon="showPasswordText ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="showPasswordText ? 'text' : 'password'"
                        @click:append="showPasswordText = !showPasswordText"
                        v-model="value.password"
                        @blur="$v.value.password.$touch()"
                        :error-messages="passwordErrors"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-list-item-content>
              </v-list-item>
              <v-card-actions class="pl-4 pb-4 pt-0">
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
              </v-card-actions>
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
import { required, minLength, email } from 'vuelidate/lib/validators'
export default {
  name: 'Login',
  mixins: [validationMixin],
  data() {
    return {
      isWorking: false,
      snackBar: false,
      snackBarText: null,
      menu1: false,
      value: {
        fname: '',
        lname: '',
        mobile: '',
        email: '',
        password: ''
      },
      showPasswordText: false
    }
  },
  computed: {
    firstNameErrors() {
      return this.generateRequiredError('fname', 'First name')
    },
    lastNameErrors() {
      return this.generateRequiredError('lname', 'Last name')
    },
    mobileErrors() {
      if (this.$v.value.mobile.$dirty && !this.$v.value.mobile.required) {
        return ['Mobile is required']
      }
      if (this.$v.value.mobile.$dirty && !this.$v.value.mobile.minLength) {
        return ['Required format 234 (###) ### ####']
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
  methods: {
    generateRequiredError(key, suffix) {
      if (this.$v.value[key].$dirty && !this.$v.value[key].required) {
        return [`${suffix} is required`]
      }
      return []
    },
    register() {
      if (this.isWorking) return
      this.isWorking = true
      this.$store
        .dispatch('auth/register', {
          ...this.value,
          mobile: this.value.mobile.replace(/[ ()]/gi, '')
        })
        .then(() => {
          /* go to dashboard */
          this.$router.push({ name: 'home' })
        })
        .catch(() => {
          this.snackBar = true
          this.snackBarText = 'Error: Unable to create account'
        })
        .finally(() => {
          this.isWorking = false
        })
    }
  },
  validations: {
    value: {
      fname: {
        required
      },
      lname: {
        required
      },
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(8)
      },
      mobile: {
        required,
        minLength: minLength(18)
      }
    }
  },
}
</script>
<style lang="scss" scoped>
.container {
  max-width: none;
  width: 100%;
  margin-bottom: 100px;
  .logo {
    width: 220px;
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
}
</style>
