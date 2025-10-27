import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import { firebaseConfigured, onAuthStateChanged } from '../firebase'

const routes = [
  // explicit login route
  { path: '/login', name: 'Login', component: Login },
  // protected home
  { path: '/home', name: 'Home', component: Home, meta: { requiresAuth: true } },
  // redirect root to login
  { path: '/', redirect: '/login' },
  // catch-all -> login
  { path: '/:pathMatch(.*)*', redirect: '/login' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// helper to wait for current auth state once
function getCurrentUser() {
  return new Promise((resolve) => {
    if (!firebaseConfigured) return resolve(null)
    const unsubscribe = onAuthStateChanged((user) => {
      unsubscribe()
      resolve(user)
    })
  })
}

router.beforeEach(async (to, from, next) => {
  // If firebase is not configured, allow navigation (you can implement a mock auth if desired)
  if (!firebaseConfigured) {
    return next()
  }

  const user = await getCurrentUser()

  // If route requires auth and there's no user -> redirect to Login
  if (to.meta.requiresAuth && !user) return next({ name: 'Login' })

  // If trying to access Login but already authenticated -> go to Home
  if (to.name === 'Login' && user) return next({ name: 'Home' })

  return next()
})

export default router
