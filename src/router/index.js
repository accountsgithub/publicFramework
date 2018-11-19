import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
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
    const redirectToLogin = (path) => {
        if (path === '/login') {
            next();  //如果是登录页面路径，就直接next()
        } else {
            next('/login');//不然就跳转到登录；
            NProgress.done();
        }
    }
    NProgress.start()
    const token = localStorage.getItem('token')
    // const hasPermissions = store.getters.permission && !_.isEmpty(store.getters.permission)
    // 验证当前路由所有的匹配中是否需要有登陆验证的
    // 是滞已经登录的
    // 是否已经分配到权限
    if (!to.matched.some(r => r.meta.requiresAuth)
        || _.isEmpty(token)|| !token ) {
        redirectToLogin(to.path)
    }

    //查看权限
    if (token) {
        next();
    }

    if (to.redirectedFrom === '/') {
        next('/projectMgt/index');
    }
})

router.afterEach(() => {NProgress.done();});

export default router
