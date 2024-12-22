import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import Dashboard from '@/views/Dashboard.vue'
import { getCookie } from 'typescript-cookie'

const isAuthenticated = () => {
  const token = getCookie('accessToken')
  console.log({ token })
  return !!token
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView,
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => Dashboard,
      meta: { requiresAuth: true },
    },
  ],
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    alert('Not authenticated')
    next('/')
  } else {
    next()
  }
})

export default router
