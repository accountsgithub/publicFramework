export const constantRouterMap = [
  {
    path: '/',
    component: resolve => require(['@/views/layout/Layout'], resolve),
    redirect: '/demo/list',
    name: 'home',
    hidden: true
  },
  // 404
  {
    path: '/404',
    component: resolve => require(['@/views/404'], resolve),
    hidden: true
  },
  // demo
  {
    path: '/demo',
    redirect: '/list',
    component: resolve => require(['@/views/layout/Layout'], resolve),
    meta: { title: 'demo', icon: 'project' },
    children: [
      {
        path: 'list',
        name: 'listPage',
        component: resolve => require(['@/views/demo/list/index'], resolve),
        meta: {
          title: 'list',
          menuIndex: '/demo'
        }
      },
      {
        path: 'dag',
        name: 'dag',
        component: resolve => require(['@/views/demo/dag/index'], resolve),
        meta: {
          title: 'dag',
          menuIndex: '/demo'
        }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default constantRouterMap
