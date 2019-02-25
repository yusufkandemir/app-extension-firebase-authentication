import firebase from 'firebase/app'
require('firebase/auth')

export default ({ app, router, Vue }) => {
  const currentConfig = process.env.firebaseConfig

  // Make sure the firebase API keys have been set accordingly
  if (currentConfig) {
    router.beforeEach((to, from, next) => {
      firebase.auth().onAuthStateChanged(() => {
        const currentUser = firebase.auth().currentUser
        const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
        if (requiresAuth && !currentUser) next('login')

        // // Add these paths to your route guard if you would like to forward the
        // // User to a dashboard, or some other page if they are already authenticated
        // else if (to.path === '/login' && (!requiresAuth && currentUser)) next('/SOME_AUTHENTICATION_GUARDED_ROUTE')
        // else if (to.path === '/register' && (!requiresAuth && currentUser)) next('/SOME_AUTHENTICATION_GUARDED_ROUTE')

        else next()
      })
    })
  }
}
