// 路由配置
const router = [
  {
    path: '/home',
    component: resolve => require(['../page/home.vue'], resolve),
    children: [
      {
        path: '/first',
        name: 'first',
        meta: {
          requireAuth: true,
          permission: []
        },
        component: resolve => require(['../view/first/first.vue'], resolve)
      },
      {
        path: '/user_manage',
        name: 'user_manage',
        meta: {
          requireAuth: true,
          permission: []
        },
        component: resolve => require(['../view/system/userManage/index.vue'], resolve)
      },
      {
        path: '/user_create',
        name: 'user_create',
        meta: {
          requireAuth: true,
          permission: []
        },
        component: resolve => require(['../view/system/userManage/create.vue'], resolve)
      },
      {
        path: '/user_edit',
        name: 'user_edit',
        meta: {
          requireAuth: true,
          permission: []
        },
        component: resolve => require(['../view/system/userManage/edit.vue'], resolve)
      },
      {
        path: '/user_check',
        name: 'user_check',
        meta: {
          requireAuth: true,
          permission: []
        },
        component: resolve => require(['../view/system/userManage/check.vue'], resolve)
      },
      // {
      //   path: '/tobaccoGroup_manage',
      //   name: 'tobaccoGroup_manage',
      //   meta: {
      //     requireAuth: true,
      //     permission: []
      //   },
      //   component: resolve => require(['../view/system/tobaccoGroup/index.vue'], resolve)
      // },
      // {
      //   path: '/tobaccoGroup_create',
      //   name: 'tobaccoGroup_create',
      //   meta: {
      //     requireAuth: true,
      //     permission: []
      //   },
      //   component: resolve => require(['../view/system/tobaccoGroup/create.vue'], resolve)
      // },
      // {
      //   path: '/tobaccoGroup_edit',
      //   name: 'tobaccoGroup_edit',
      //   meta: {
      //     requireAuth: true,
      //     permission: []
      //   },
      //   component: resolve => require(['../view/system/tobaccoGroup/edit.vue'], resolve)
      // },
      // {
      //   path: '/tobaccoGroup_check',
      //   name: 'tobaccoGroup_check',
      //   meta: {
      //     requireAuth: true,
      //     permission: []
      //   },
      //   component: resolve => require(['../view/system/tobaccoGroup/checkGroup.vue'], resolve)
      // },
      // {
      //   path: '/tobaccoGroup_manageHouse',
      //   name: 'tobaccoGroup_manageHouse',
      //   meta: {
      //     requireAuth: true,
      //     permission: []
      //   },
      //   component: resolve => require(['../view/system/tobaccoGroup/manageHouse.vue'], resolve)
      // },
      // {
      //   path: '/tobacco_manage',
      //   name: 'tobacco_manage',
      //   meta: {
      //     requireAuth: true,
      //     permission: []
      //   },
      //   component: resolve => require(['../view/system/tobacco/index.vue'], resolve)
      // },
      {
        path: '/tem_contorl',
        name: 'tem_contorl',
        meta: {
          requireAuth: true,
          permission: []
        },
        component: resolve => require(['../view/monitor/temperature/index.vue'], resolve)
      },
      {
        path: '/status_contorl',
        name: 'status_contorl',
        meta: {
          requireAuth: true,
          permission: []
        },
        component: resolve => require(['../view/monitor/status/index.vue'], resolve)
      },
      {
        path: '/alarm',
        name: 'alarm',
        meta: {
          requireAuth: true,
          permission: []
        },
        component: resolve => require(['../view/system/alarm/index.vue'], resolve)
      },
      {
        path: '/alarm_create',
        name: 'alarm_create',
        meta: {
          requireAuth: true,
          permission: []
        },
        component: resolve => require(['../view/system/alarm/create.vue'], resolve)
      },
      {
        path: '/alarm_edit',
        name: 'alarm_edit',
        meta: {
          requireAuth: true,
          permission: []
        },
        component: resolve => require(['../view/system/alarm/edit.vue'], resolve)
      },
      {
        path: '/notice',
        name: 'notice',
        meta: {
          requireAuth: true,
          permission: []
        },
        component: resolve => require(['../view/system/notice/index.vue'], resolve)
      },
      {
        path: '/notice_create',
        name: 'notice_create',
        meta: {
          requireAuth: true,
          permission: []
        },
        component: resolve => require(['../view/system/notice/create.vue'], resolve)
      },
      {
        path: '/notice_edit',
        name: 'notice_edit',
        meta: {
          requireAuth: true,
          permission: []
        },
        component: resolve => require(['../view/system/notice/edit.vue'], resolve)
      },
      {
        path: '/news',
        name: 'news',
        meta: {
          requireAuth: true,
          permission: []
        },
        component: resolve => require(['../view/system/news/index.vue'], resolve)
      },
      {
        path: '/news_create',
        name: 'news_create',
        meta: {
          requireAuth: true,
          permission: []
        },
        component: resolve => require(['../view/system/news/create.vue'], resolve)
      },
      {
        path: '/news_edit',
        name: 'news_edit',
        meta: {
          requireAuth: true,
          permission: []
        },
        component: resolve => require(['../view/system/news/edit.vue'], resolve)
      },
      {
        path: '/news_check',
        name: 'news_check',
        meta: {
          requireAuth: true,
          permission: []
        },
        component: resolve => require(['../view/system/news/check.vue'], resolve)
      },
      {
        path: '/companys_manage',
        name: 'companys_manage',
        meta: {
          requireAuth: true,
          permission: []
        },
        component: resolve => require(['../view/system/companys/index.vue'], resolve)
      },
      {
        path: '/company_create',
        name: 'company_create',
        meta: {
          requireAuth: true,
          permission: []
        },
        component: resolve => require(['../view/system/companys/create.vue'], resolve)
      },
      {
        path: '/company_edit',
        name: 'company_edit',
        meta: {
          requireAuth: true,
          permission: []
        },
        component: resolve => require(['../view/system/companys/edit.vue'], resolve)
      },
      {
        path: '/cooperative_manage',
        name: 'cooperative_manage',
        meta: {
          requireAuth: true,
          permission: []
        },
        component: resolve => require(['../view/system/cooperative/index.vue'], resolve)
      },
      {
        path: '/cooperative_create',
        name: 'cooperative_create',
        meta: {
          requireAuth: true,
          permission: []
        },
        component: resolve => require(['../view/system/cooperative/create.vue'], resolve)
      },
      {
        path: '/cooperative_edit',
        name: 'cooperative_edit',
        meta: {
          requireAuth: true,
          permission: []
        },
        component: resolve => require(['../view/system/cooperative/edit.vue'], resolve)
      },
      {
        path: '/tobacco_manage',
        name: 'tobacco_manage',
        meta: {
          requireAuth: true,
          permission: []
        },
        component: resolve => require(['../view/system/tobaccoNew/index.vue'], resolve)
      },
      {
        path: '/tobacco_carmera',
        name: 'tobacco_carmera',
        meta: {
          requireAuth: true,
          permission: []
        },
        component: resolve => require(['../view/system/tobaccoNew/carmera.vue'], resolve)
      },
      {
        path: '/tobacco_create',
        name: 'tobacco_create',
        meta: {
          requireAuth: true,
          permission: []
        },
        component: resolve => require(['../view/system/tobaccoNew/create.vue'], resolve)
      },
      {
        path: '/tobacco_edit',
        name: 'tobacco_edit',
        meta: {
          requireAuth: true,
          permission: []
        },
        component: resolve => require(['../view/system/tobaccoNew/edit.vue'], resolve)
      },
      {
        path: '/tobacco_show',
        name: 'tobacco_show',
        meta: {
          requireAuth: true,
          permission: []
        },
        component: resolve => require(['../view/system/tobaccoShow/index.vue'], resolve)
      },
      {
        path: '/tobacco_history',
        name: 'tobacco_history',
        meta: {
          requireAuth: true,
          permission: []
        },
        component: resolve => require(['../view/system/tobaccoShow/historyIndex.vue'], resolve)
      },
      {
        path: '/tobacco_video',
        name: 'tobacco_video',
        meta: {
          requireAuth: true,
          permission: []
        },
        component: resolve => require(['../view/system/tobaccoShow/video.vue'], resolve)
      }
    ]
  },
  {
    path: '/monitor_old',
    name: 'monitor_old',
    component: resolve => require(['../page/monitor.vue'], resolve)
  },
  {
    path: '/monitor',
    name: 'monitor',
    component: resolve => require(['../page/monitor_index.vue'], resolve)
  },
  {
    path: '/monitor_video',
    name: 'monitor_video',
    component: resolve => require(['../page/video.vue'], resolve)
  },
  {
    path: '/',
    name: 'login',
    component: resolve => require(['../page/login.vue'], resolve)
  },
  {
    path: '*',
    name: 'Page404',
    component: resolve => require(['../page/404.vue'], resolve)
  }
]

export default router
