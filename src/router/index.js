import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Chatroom from '../views/Chatroom.vue'
import Welcome from '../views/Welcome.vue'
import Profile from '../views/Profile.vue'
import { auth } from '../firebase'

//auth guard
const requiresAuth = (to, from, next) => {
  let user = auth.currentUser
  if (!user) {
    next({ name: 'Welcome' })
  } else {
    next()
  }
}

//require no auth
const requireNoAuth = (to, from, next) => {
  let user = auth.currentUser
  if (user) {
    next({ name: 'Home' })
  } else {
    next()
  }
}
const routes = [
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    beforeEnter: requiresAuth
  },
  {
    path: '/chatroom',
    name: 'Chatroom',
    component: Chatroom,
    beforeEnter: requiresAuth
  },
  {
    path: '/',
    name: 'Welcome',
    component: Welcome,
    beforeEnter: requireNoAuth
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    beforeEnter: requiresAuth
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
  // {
  //   path: '/login',
  //   name: 'Login',
  //   component: Login
  // }
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
