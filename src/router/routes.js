const meta = { requiresAuth: true }

export const constantRouterMap = [
    {
        path: '/',
        component: resolve => require(['@/views/layout/Layout'], resolve),
        redirect: '/demo/index',
        name: 'home',
        hidden: true
    },
    // projectManagement
    {
        path: '/demo',
        component: resolve => require(['@/views/layout/Layout'], resolve),
        children: [
            {
                path: 'index',
                name: 'demo',
                component: resolve => require(['@/views/demo/index'], resolve),
                meta: { ...meta, title: 'demo', icon: 'project' }
            }
        ]
    },
    // 404
    {
        path: '/404',
        component: resolve => require(['@/views/404'], resolve),
        hidden: true
    },

    { path: '*', redirect: '/404', hidden: true }
]

export default constantRouterMap
