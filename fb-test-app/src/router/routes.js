
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
      // ,
      // { path: '/login', name: 'Login', component: () => import('components/Q-AE-Auth.vue') },
      // { path: '/register', name: 'Register', component: () => import('components/Q-AE-Auth.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
