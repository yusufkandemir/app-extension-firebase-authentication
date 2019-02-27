<template>
  <form class="authentication">
    <h4>{{ $route.name }}</h4>
    <q-input
      data-cy="email"
      label="EMAIL"
      hint=""
      v-model="email"
      type="email"
      @input="delayTouch($v.email, $options.touchMap)"
      :error="$v.email.$error"
      error-message="Please provide a valid email"
    />
    <q-input
      data-cy="password"
      label="PASSWORD"
      hint=""
      ref="passwordField"
      v-model="password"
      :type="isPwd ? 'password' : 'text'"
      @input="delayTouch($v.password, $options.touchMap)"
      @keyup.enter="authenticate(); $event.target.blur()"
      :error="$v.password.$error"
      error-message="Please provide a password"
    >
      <template v-slot:append>
        <q-icon
          :name="isPwd ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="isPwd = !isPwd"
        ></q-icon>
      </template>
    </q-input>
    <q-input
      v-if="isRegisterUser"
      data-cy="verifyPassword"
      label="VERIFY PASSWORD"
      hint=""
      v-model="passwordMatch"
      :type="isPwd ? 'password' : 'text'"
      :error="$v.passwordMatch.$error"
      error-message="Please provide matching password"
      @input="delayTouch($v.passwordMatch, $options.touchMap)"
      @keyup.enter="authenticate(); $event.target.blur()"
    >
      <template v-slot:append>
        <q-icon
          :name="isPwd ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="isPwd = !isPwd"
        ></q-icon>
      </template>
    </q-input>
    <div class="flex justify-end">
      <q-btn
        data-cy="submit"
        class="q-mt-lg"
        color="primary"
        :label="getAuthType"
        :loading="loading"
        @click="authenticate"
      >
        <template v-slot:loading>
          <q-spinner-gears></q-spinner-gears>
        </template>
      </q-btn>
    </div>
    <p v-if="!isRegisterUser" class="text-body1" data-cy="userRegLink">
      Create a <router-link to='/register'>new user</router-link>.
    </p>
    <p v-else class="text-body1" data-cy="loginLink">
      <router-link to="/login">Log In</router-link>
    </p>
  </form>
</template>

<script>
import { required, email, sameAs } from 'vuelidate/lib/validators'
import { delayTouch } from '../utils/utilFunctions.js'

export default {
  name: 'Auth',
  // Top level prop in our options object to set and hold our
  // timer for our validations
  touchMap: new WeakMap(),
  created () {
    console.log(this.$v)
  },
  computed: {
    isRegisterUser () {
      return this.$route.name === 'Register'
    },
    getAuthType () {
      return this.isRegisterUser ? 'Register' : 'Login'
    }
  },
  data () {
    return {
      email: null,
      isPwd: true,
      loading: false,
      password: null,
      passwordMatch: null
    }
  },
  validations: {
    email: { required, email },
    password: { required },
    passwordMatch: {
      // eslint-disable-next-line func-names
      sameAsPassword: sameAs(function () {
        return this.password
      })
    }
  },
  methods: {
    authenticate () {
      this.loading = true
      this.checkCredentials()
      this.performAuthentication()
        .then((user) => {
          this.loading = false
          // If you want to push the user further
          // into your app uncomment the line below and add your route
          // this.$router.push('/SOME_AUTHENTICATION_GUARDED_ROUTE')
          console.log('SUCCESS YOUR CURRENT USER OBJECT FROM FIREBASE IS:', this.$currentUser)
          this.$q.notify({
            classes: 'text-weight-bold text-center',
            color: 'positive',
            message: `Success. Check your console for your current user object.`
          })
          this.resetFormFields()
        })
        .catch((error) => {
          console.error('FAILURE:', error)
          this.$q.notify({
            classes: 'text-weight-bold text-center',
            color: 'negative',
            message: `Looks like there is an issue: ${error.message}`
          })
          this.loading = false
        })
    },
    checkCredentials () {
      if (this.$v.email.$invalid || this.$v.password.$invalid) {
        this.$v.email.$touch()
        this.$v.password.$touch()
        this.$q.notify({
          classes: 'text-weight-bold text-center',
          color: 'negative',
          message: 'Your credentials are invalid.'
        })
        setTimeout(() => {
          this.loading = false
        }, 1000)
        throw new Error('Credentials are invalid.')
      }
      if (this.isRegisterUser && this.$v.passwordMatch.$invalid) {
        this.$v.password.$touch()
        this.$v.passwordMatch.$touch()
        this.$q.notify({
          classes: 'text-weight-bold text-center',
          color: 'negative',
          message: 'Your passwords don\'t match'
        })
        setTimeout(() => {
          this.loading = false
        }, 1000)
        throw new Error('Password Mismatch')
      }
    },
    performAuthentication () {
      return this.isRegisterUser
        ? this.$registerUser(this.email, this.password)
        : this.$login(this.email, this.password)
    },
    resetFormFields () {
      this.email = null
      this.password = null
      this.passwordMatch = null
      this.$v.$reset()
    },
    delayTouch
  }
}
</script>

<style lang='stylus'>
  .authentication
    min-height 20vh
    max-width 30em
    margin auto
    position relative
</style>
