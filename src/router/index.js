import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

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
  if (to.redirectedFrom === '/') {
    next('/demo/index')
  }
  next()
})

export default router
