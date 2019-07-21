import firebase from 'firebase/app'
import Vue from 'vue'
require('firebase/auth')

class FirebaseService {
  constructor () {
    firebase.initializeApp(this.getCurrentConfig())
  }

  getCurrentConfig () {
    return process.env.firebaseConfig
  }

  auth () {
    return firebase.auth()
  }

  async registerUser (email, password) {
    const user = await firebase.auth().createUserWithEmailAndPassword(email, password)

    Vue.prototype.$currentUser = user

    return user
  }

  async login (email, password) {
    const user = await firebase.auth().signInWithEmailAndPassword(email, password)

    Vue.prototype.$currentUser = user

    return user
  }
}

export default new FirebaseService()
