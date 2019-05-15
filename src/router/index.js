import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '@/store'

Vue.use(VueRouter)

// 导出路由 在 main.js 里使用
const router = new VueRouter({
  scrollBehavior: () => ({ y: 0 }),
  routes
})
/**
 * 路由拦截
 * 权限验证
 */
router.beforeEach((to, from, next) => {
  next()
})

router.afterEach((to, from) => {
  store.dispatch('setPageTip', '')
})

export default router
