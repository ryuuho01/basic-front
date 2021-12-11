import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _1dc0d292 = () => interopDefault(import('../pages/done.vue' /* webpackChunkName: "pages/done" */))
const _6ce3a784 = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _359794a0 = () => interopDefault(import('../pages/mypage.vue' /* webpackChunkName: "pages/mypage" */))
const _4eb412d8 = () => interopDefault(import('../pages/register.vue' /* webpackChunkName: "pages/register" */))
const _5bc2fb3e = () => interopDefault(import('../pages/thanks.vue' /* webpackChunkName: "pages/thanks" */))
const _34b21371 = () => interopDefault(import('../pages/detail/_id.vue' /* webpackChunkName: "pages/detail/_id" */))
const _b987f726 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

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
    component: _1dc0d292,
    name: "done"
  }, {
    path: "/login",
    component: _6ce3a784,
    name: "login"
  }, {
    path: "/mypage",
    component: _359794a0,
    name: "mypage"
  }, {
    path: "/register",
    component: _4eb412d8,
    name: "register"
  }, {
    path: "/thanks",
    component: _5bc2fb3e,
    name: "thanks"
  }, {
    path: "/detail/:id?",
    component: _34b21371,
    name: "detail-id"
  }, {
    path: "/",
    component: _b987f726,
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
