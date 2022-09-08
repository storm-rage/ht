const entUserManageRouter = [
  {
    path: '/entApplyAuditAdd',
    name: 'entApplyAuditAdd',
    component: () => import('../views/entUserManage/entManage/entApplyAudit'),
    meta: {
      title: '复核企业信息申请',
      parent: 'myTodo',
      root: '我的代办',
      keepAlive: true,
      refreshIndex: 0,
      pageType: 'audit',
      workflowState: 'addDetail'
    }
  },
  {
    path: '/entApplyAuditEdit',
    name: 'entApplyAuditEdit',
    component: () => import('../views/entUserManage/entManage/entApplyAudit'),
    meta: {
      title: '复核企业信息申请',
      parent: 'myTodo',
      root: '我的代办',
      keepAlive: true,
      refreshIndex: 0,
      pageType: 'audit',
      workflowState: 'editDetail'
    }
  },
  {
    path: '/entApplyRejectAdd',
    name: 'entApplyRejectAdd',
    component: () => import('../views/entUserManage/entManage/entApplyAudit'),
    meta: {
      title: '复核企业信息申请',
      parent: 'myTodo',
      root: '我的代办',
      keepAlive: true,
      refreshIndex: 0,
      pageType: 'add',
    }
  },
  {
    path: '/entApplyRejectEdit',
    name: 'entApplyRejectEdit',
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
    path: '/entApplyAuditAddDetail',
    name: 'entApplyAuditAddDetail',
    component: () => import('../views/entUserManage/entManage/entApplyAudit'),
    meta: {
      title: '企业信息申请交易详情',
      parent: 'myTodo',
      root: '我的代办',
      keepAlive: true,
      refreshIndex: 0,
      pageType: 'detail',
      workflowState: 'addDetail'
    }
  },
  {
    path: '/entApplyAuditEditDetail',
    name: 'entApplyAuditEditDetail',
    component: () => import('../views/entUserManage/entManage/entApplyAudit'),
    meta: {
      title: '企业信息申请交易详情',
      parent: 'myTodo',
      root: '我的代办',
      keepAlive: true,
      refreshIndex: 0,
      pageType: 'detail',
      workflowState: 'editDetail'
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
