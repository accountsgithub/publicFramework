import Vue from 'vue'
// import axios  from 'axios'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import routes from './routes'
// import store from '../store'

Vue.use(VueRouter)
NProgress.configure({ showSpinner: false })
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
    // const redirectToLogin = () => {
    //     window.location.href = `${axios.defaults.baseURL}/oauth2/authorize`
    // }
    NProgress.start()
    // const hasPermissions =
    // store.getters.permission && !_.isEmpty(store.getters.permission)

    // 是否已经分配到权限
    // if (!to.matched.some(r => r.meta.requiresAuth) || hasPermissions) {
    //     redirectToLogin(to.path)
    // }
    if (to.redirectedFrom === '/') {
        next('/demo/index')
    }
    //查看权限
    // if (!hasPermissions) {
    //     store.dispatch('getPermissions').then(() => {
    //         next()
    //     })
    // }
    next()
})

router.afterEach(() => {
    NProgress.done()
})

export default router
