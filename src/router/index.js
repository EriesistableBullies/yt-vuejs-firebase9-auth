import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import { auth } from '../firebase'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/frenchies',
    name: 'Frenchies',
    component: () => import('../views/Frenchies.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/micro',
    name: 'Micro',
    component: () => import('../views/Micro.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/abg-dapp',
    name: 'Abg',
    component: () => import('../views/Abg.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login' && auth.currentUser) {
    next('/')
    return;
  }

  if (to.matched.some(record => record.meta.requiresAuth) && !auth.currentUser) {
    next('/login')
    return;
  }

  next();
})

export default router
