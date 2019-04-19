import firebaseService from '../services/FirebaseService.js'

export default ({ app, router, Vue }) => {
  router.beforeEach((to, from, next) => {
    firebaseService.auth().onAuthStateChanged(() => {
      const currentUser = firebaseService.auth().currentUser
      const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

      if (requiresAuth && !currentUser) next('login')
      else if (to.path === '/login' && (!requiresAuth && currentUser)) next('/')
      else next()
    })
  })

  Vue.prototype.$fb = firebaseService
  // Initialize app
  // const currentConfig = process.env.firebaseConfig

  // // console.log('PROCESS ENV OBJECT', process.env)
  // // Make sure the firebase keys have been set accordingly
  // if (currentConfig) {
  //   firebase.initializeApp(currentConfig)
  //   // Initialize Cloud Firestore through Firebase

  //   // Add props to our Vue instance for easy access
  //   // in our app
  //   Vue.prototype.$fb = firebase
  // }

  // // Add auth methods to our Vue instance
  // Vue.prototype.$login = (email, password) => {
  //   return new Promise((resolve, reject) => {
  //     firebase.auth().signInWithEmailAndPassword(email, password)
  //       .then((user) => {
  //         Vue.prototype.$currentUser = user
  //         resolve(user)
  //       })
  //       .catch(error => {
  //         reject(error)
  //       })
  //   })
  // }

  // Vue.prototype.$registerUser = (email, password) => {
  //   return new Promise((resolve, reject) => {
  //     firebase.auth().createUserWithEmailAndPassword(email, password)
  //       .then((user) => {
  //         Vue.prototype.$currentUser = user
  //         resolve(user)
  //       })
  //       .catch(error => {
  //         reject(error)
  //       })
  //   })
  // }
}
