import firebaseService from '../services/FirebaseService.js'

export default ({ app, router, Vue }) => {
  router.beforeEach(async (to, from, next) => {
    await firebaseService.ensureAuthIsInitialized()

    const currentUser = firebaseService.currentUser
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

    if (requiresAuth && !currentUser) next('login')
    else if (to.path === '/login' && currentUser) next('/')
    else next()
  })

  Vue.prototype.$fb = firebaseService
}
