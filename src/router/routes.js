export const constantRouterMap = [
  {
    path: '/',
    component: resolve => require(['@/views/layout/Layout'], resolve),
    redirect: '/demo/common/list',
    name: 'home',
    hidden: true
  },
  // 404
  {
    path: '/404',
    component: resolve => require(['@/views/404'], resolve),
    hidden: true
  },
  // common
  {
    path: '/demo/common',
    redirect: '/demo/common/list',
    component: resolve => require(['@/views/layout/Layout'], resolve),
    meta: { title: 'common', icon: 'project' },
    children: [
      {
        path: 'list',
        name: 'listPage',
        component: resolve =>
          require(['@/views/demo/common/list/index'], resolve),
        meta: {
          title: 'list',
          menuIndex: '/demo/common'
        }
      }
    ]
  },
  // demo
  {
    path: '/demo/component',
    redirect: '/demo/component/dag',
    component: resolve => require(['@/views/layout/Layout'], resolve),
    meta: { title: 'component', icon: 'resources' },
    children: [
      {
        path: 'dag',
        name: 'dag',
        component: resolve =>
          require(['@/views/demo/component/dag/index'], resolve),
        meta: {
          title: 'dag',
          menuIndex: '/demo/component'
        }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default constantRouterMap
