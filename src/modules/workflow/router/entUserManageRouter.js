const entUserManageRouter = [
  {
    path: '/entApplyAudit',
    name: 'entApplyAudit',
    component: () => import('../views/entUserManage/entManage/entApplyAudit'),
    meta: {
      title: '复核企业信息申请',
      parent: 'myTodo',
      root: '我的代办',
      keepAlive: true,
      refreshIndex: 0,
      pageType: 'audit',
    }
  },
  {
    path: '/entApplyReject',
    name: 'entApplyReject',
    component: () => import('../views/entUserManage/entManage/entApplyAudit'),
    meta: {
      title: '复核企业信息申请',
      parent: 'myTodo',
      root: '我的代办',
      keepAlive: true,
      refreshIndex: 0,
      pageType: 'edit',
    }
  },
  {
    path: '/entApplyAuditDetail',
    name: 'entApplyAuditDetail',
    component: () => import('../views/entUserManage/entManage/entApplyAudit'),
    meta: {
      title: '企业信息申请交易详情',
      parent: 'myTodo',
      root: '我的代办',
      keepAlive: true,
      refreshIndex: 0,
      pageType: 'detail',
    }
  },
  {
    path: '/maintainUserAudit',
    name: 'maintainUserAudit',
    component: () => import('../views/entUserManage/userManage/maintainUserAudit'),
    meta: {
      title: '维护用户信息审核',
      parent: 'myTodo',
      root: '我的代办',
      keepAlive: true,
      refreshIndex: 0,
      pageType: 'audit',
    }
  },
  {
    path: '/maintainUserReject',
    name: 'maintainUserReject',
    component: () => import('../views/entUserManage/userManage/maintainUserAudit'),
    meta: {
      title: '维护用户信息审核',
      parent: 'myTodo',
      root: '我的代办',
      keepAlive: true,
      refreshIndex: 0,
      pageType: 'edit',
    }
  },
  {
    path: '/maintainUserDetail',
    name: 'maintainUserDetail',
    component: () => import('../views/entUserManage/userManage/maintainUserAudit'),
    meta: {
      title: '维护用户交易详情',
      parent: 'myTodo',
      root: '我的代办',
      keepAlive: true,
      refreshIndex: 0,
      pageType: 'agendaDetail',
    }
  }
]
export default entUserManageRouter
