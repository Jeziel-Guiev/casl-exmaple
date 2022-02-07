import Vue from 'vue'
import VueRouter from 'vue-router'
import dashboard from './routes/dashboard'
import pages from './routes/pages'
import { canNavigate } from '@/libs/acl/routeProtection'
import { isUserLoggedIn, getUserData, getHomeRouteForLoggedInUser } from '@/auth/utils'

Vue.use(VueRouter)

const routes = [
  
  { 
    path: '/', redirect: '/login' 
  },
  ...dashboard,
  ...pages,
  {
    path: '*',
    redirect: 'error-404',
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 }
  }, // empezar desde las posiciones iniciales de cada pagina
  routes
})

router.beforeEach((to, _, next) => {
  console.log(to);
  const isLoggedIn = isUserLoggedIn(); // verifica si el usuario existe
  console.log("isLogin :"+" "+isLoggedIn);
  const navigator=canNavigate(to);
  console.log("navigator :"+" "+navigator);
  if (!canNavigate(to)) {
    console.log(" entro a if  ");
    if (!isLoggedIn) return next({ name: 'auth-login' })
    return next({ name: 'misc-not-authorized' })
    
  }
 // if (!isLoggedIn) return next({ name: 'auth-login' })

 if (to.meta.redirectIfLoggedIn && isLoggedIn) {
  const userData = getUserData()
  console.log("deberia ir a tu dashboard")
  next(getHomeRouteForLoggedInUser(userData ? userData.role : null))
}


  return next()
})

export default router
