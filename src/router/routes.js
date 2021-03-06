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
    meta: { title: 'common', icon: 'icon-ic-project' },
    children: [
      {
        path: 'list',
        name: 'listPage',
        component: resolve => require(['@/views/demo/common/list/index'], resolve),
        meta: {
          title: 'list',
          breadLevel: 0
        }
      },
      {
        path: 'advancedList',
        name: 'advancedList',
        component: resolve => require(['@/views/demo/common/list/advancedList'], resolve),
        meta: {
          title: 'advancedList',
          breadLevel: 0
        }
      },
      {
        path: 'regularOne',
        name: 'regularOne',
        component: resolve => require(['@/views/demo/common/form/regularOne'], resolve),
        meta: {
          title: 'regularOne',
          breadLevel: 0
        }
      },
      {
        path: 'regularTwo',
        name: 'regularTwo',
        component: resolve => require(['@/views/demo/common/form/regularTwo'], resolve),
        meta: {
          title: 'regularTwo',
          breadLevel: 0
        }
      },
      {
        path: 'regularThree',
        name: 'regularThree',
        component: resolve => require(['@/views/demo/common/form/regularThree'], resolve),
        meta: {
          title: 'regularThree',
          breadLevel: 0
        }
      },
      {
        path: 'formByAPI',
        name: 'formByAPI',
        component: resolve => require(['@/views/demo/common/form/regularFour'], resolve),
        meta: {
          title: 'formByAPI',
          breadLevel: 0
        }
      },
      {
        path: 'detailMenuLeft',
        name: 'detailMenuLeft',
        component: resolve => require(['@/views/demo/common/detail/menuLeft'], resolve),
        meta: {
          title: 'detailMenuLeft',
          breadLevel: 0
        }
      },
      {
        path: 'detailMenuRight',
        name: 'detailMenuRight',
        component: resolve => require(['@/views/demo/common/detail/menuRight'], resolve),
        meta: {
          title: 'detailMenuRight',
          breadLevel: 0
        }
      }
    ]
  },
  // demo
  {
    path: '/demo/component',
    redirect: '/demo/component/dag',
    component: resolve => require(['@/views/layout/Layout'], resolve),
    meta: { title: 'component', icon: 'icon-ic-resources' },
    children: [
      {
        path: 'dag',
        name: 'dag',
        component: resolve => require(['@/views/demo/component/dag/index'], resolve),
        meta: {
          title: 'dag',
          breadLevel: 0
        }
      },
      {
        path: 'code-mirror',
        name: 'codeMirror',
        component: resolve => require(['@/views/demo/component/code-mirror/index'], resolve),
        meta: {
          title: 'codeMirror',
          breadLevel: 0
        }
      },
      {
        path: 'deptTree',
        name: 'deptTree',
        component: resolve => require(['@/views/demo/component/deptTree/index'], resolve),
        meta: {
          title: 'deptTree',
          breadLevel: 0
        }
      },
      {
        path: 'timeSelect',
        name: 'timeSelect',
        component: resolve => require(['@/views/demo/component/TimeSelect/index'], resolve),
        meta: {
          title: 'timeSelect',
          breadLevel: 0
        }
      },
      {
        path: 'formcheck',
        name: 'formcheck',
        component: resolve => require(['@/views/demo/component/formcheck/index'], resolve),
        meta: {
          title: 'formcheck',
          breadLevel: 0
        }
      },
      {
        path: 'slider',
        name: 'slider',
        component: resolve => require(['@/views/demo/component/slider/index'], resolve),
        meta: {
          title: 'slider',
          breadLevel: 0
        }
      }
    ]
  },
  {
    path: '/demo/component',
    hidden: false,
    component: resolve => require(['@/views/layout/Layout'], resolve),
    children: [
      {
        path: 'index',
        name: 'dag',
        component: resolve => require(['@/views/demo/component/dag/index'], resolve),
        meta: {
          title: 'dag',
          icon: 'icon-ic-resources'
        }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default constantRouterMap
