import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _41274706 = () => interopDefault(import('../pages/done.vue' /* webpackChunkName: "pages/done" */))
const _1dd20115 = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _52110e3f = () => interopDefault(import('../pages/mypage.vue' /* webpackChunkName: "pages/mypage" */))
const _1085f8b2 = () => interopDefault(import('../pages/register.vue' /* webpackChunkName: "pages/register" */))
const _6ec05866 = () => interopDefault(import('../pages/thanks.vue' /* webpackChunkName: "pages/thanks" */))
const _817be700 = () => interopDefault(import('../pages/detail/_id.vue' /* webpackChunkName: "pages/detail/_id" */))
const _542a5dfe = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/done",
    component: _41274706,
    name: "done"
  }, {
    path: "/login",
    component: _1dd20115,
    name: "login"
  }, {
    path: "/mypage",
    component: _52110e3f,
    name: "mypage"
  }, {
    path: "/register",
    component: _1085f8b2,
    name: "register"
  }, {
    path: "/thanks",
    component: _6ec05866,
    name: "thanks"
  }, {
    path: "/detail/:id?",
    component: _817be700,
    name: "detail-id"
  }, {
    path: "/",
    component: _542a5dfe,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
