import Vue from 'vue'
import Router from 'vue-router'
import routes from './router.config'
import store from '../store/store'

Vue.use(Router)
const router = new Router({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requireAuth)) {
    if (sessionStorage.getItem('token')) {
      next()
    } else {
      next({
        path: '/'
      })
    }
  } else {
    next()
  }
})
export default router
