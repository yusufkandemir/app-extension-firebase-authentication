import firebase from 'firebase/app'
require('firebase/auth')

class FirebaseService {
  constructor () {
    firebase.initializeApp(this.getCurrentConfig())
  }

  getCurrentConfig () {
    return process.env.firebaseConfig
  }

  test () {
    return 'test'
  }

  auth () {
    return firebase.auth()
  }

  authenticate () {
    return {
      createUser: (email, password) => {},
      login: (email, password) => {}
    }
  }
}

export default new FirebaseService()
