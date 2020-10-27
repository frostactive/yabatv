import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/auth/Login'
import Register from '@/components/auth/Register'
import VerifyRegistration from '@/components/auth/VerifyRegistration'
import InitResetPassword from '@/components/auth/InitResetPassword'
import ResendVerificationEmail from '@/components/auth/ResendVerificationEmail'

import App from '@/components/app/Dashboard'
import Films from '@/components/app/film/Films'
import FilmDetails from '@/components/app/film/FilmDetails'
import Concessions from '@/components/app/concession/Concessions'
import Checkout from '@/components/app/checkout/Checkout'

Vue.use(VueRouter)

const guardAuthRoutes = (_, __, next) => {
  let path
  if (localStorage.getItem('jwt')) {
    /* go to app */
    path = { path: '/app' }
  }
  next(path)
}

const guardProtectedRoutes = (_, __, next) => {
  let path
  if (!localStorage.getItem('jwt')) {
    /* go to login */
    path = { path: '/login' }
  }
  next(path)
}

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    beforeEnter: guardAuthRoutes
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    beforeEnter: guardAuthRoutes
  },
  {
    path: '/reset-password',
    name: 'resetpassword',
    component: InitResetPassword,
    beforeEnter: guardAuthRoutes
  },
  {
    path: '/resend-verification',
    name: 'resendverification',
    component: ResendVerificationEmail,
    beforeEnter: guardAuthRoutes
  },
  {
    path: '/verify-email',
    name: 'verifyemail',
    component: VerifyRegistration,
    props: route => ({
      token: route.query.token,
    })
  },
  {
    path: '/app',
    name: 'App',
    component: App,
    children: [
      {
        path: 'home',
        name: 'home',
        component: Films
      },
      {
        path: 'film/:id',
        name: 'film',
        component: FilmDetails,
        props: route => ({
          id: route.params.id
        })
      },
      {
        path: 'concessions',
        name: 'concessions',
        component: Concessions
      },
      {
        path: 'checkout',
        name: 'checkout',
        component: Checkout
      },
      {
        path: '/*',
        component: Films
      },
    ],
    beforeEnter: guardProtectedRoutes
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
