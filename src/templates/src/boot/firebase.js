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
}
