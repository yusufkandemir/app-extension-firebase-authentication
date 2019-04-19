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

  registerUser (email, password) {
    return new Promise((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((user) => {
          Vue.prototype.$currentUser = user
          resolve(user)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  login (email, password) {
    return new Promise((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then((user) => {
          Vue.prototype.$currentUser = user
          resolve(user)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}

export default new FirebaseService()
