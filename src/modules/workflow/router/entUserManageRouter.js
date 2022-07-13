const entUserManageRouter = [
  {
    path: '/entApplyAudit',
    name: 'entApplyAudit',
    component: () => import('../views/entUserManage/entManage/entApplyAudit'),
    meta: {
      isMock: true,
      title: '复核企业信息申请',
      root: '我的代办',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    }
  },
  {
    path: '/maintainUserAudit',
    name: 'maintainUserAudit',
    component: () => import('../views/entUserManage/userManage/maintainUserAudit'),
    meta: {
      isMock: true,
      title: '维护用户信息审核',
      root: '我的代办',
      keepAlive: true,
      refreshIndex: 0,
      pageType: 'audit',
      notRequireAuth: true
    }
  },
  {
    path: '/maintainUserDetail',
    name: 'maintainUserDetail',
    component: () => import('../views/entUserManage/userManage/maintainUserAudit'),
    meta: {
      isMock: true,
      title: '维护用户信息审核',
      root: '我的代办',
      keepAlive: true,
      refreshIndex: 0,
      pageType: 'detail',
      notRequireAuth: true
    }
  }
]
export default entUserManageRouter
