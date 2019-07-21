import firebase from 'firebase/app'
import 'firebase/auth'

let authInitialized = false
let authPromise

class FirebaseService {
  currentUser

  constructor () {
    firebase.initializeApp(this.getCurrentConfig())

    // Start the auth initialization process
    this.ensureAuthIsInitialized()
  }

  async ensureAuthIsInitialized () {
    // If auth is currently initializing, return that promise
    if (authPromise) {
      return authPromise
    }

    // Create the initialization promise
    authPromise = new Promise((resolve, reject) => {
      if (authInitialized) {
        resolve()
      } else {
        // Create the observer only once on init
        firebase.auth().onAuthStateChanged(async user => {
          this.currentUser = user
          authInitialized = true

          resolve()
        }, error => reject(error))
      }
    })

    return authPromise
  }

  getCurrentConfig () {
    return process.env.firebaseConfig
  }

  auth () {
    return firebase.auth()
  }

  async registerUser (email, password) {
    const user = await firebase.auth().createUserWithEmailAndPassword(email, password)

    return user
  }

  async login (email, password) {
    const user = await firebase.auth().signInWithEmailAndPassword(email, password)

    return user
  }
}

export default new FirebaseService()
