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
}
