/**
 * 企业信息管理 路由
 */

const registerAudit = [
  //主页面
  {
    path: '/platformAudit',
    name: 'platformAudit',
    component: () => import('../views/sysModules/register/registerAudit/index.vue'),
    meta: {
      title: '企业注册审核',
      root: '企业与用户管理',
      keepAlive: true,
      refreshIndex: 0,
      // notRequireAuth: true
    }
  },
  //申请信息审核页面
  {
    path: '/registerAuditApplyAudit',
    name: 'registerAuditApplyAudit',
    component: () => import('../views/sysModules/register/registerAudit/registerAudit.vue'),
    meta: {
      title: '申请信息审核-审核',
      parent: 'platformAudit',
      root: '企业与用户管理',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true,
      pageType: 'audit'
    }
  },
  // 详情
  {
    path: '/registerAuditApplyDetail',
    name: 'registerAuditApplyDetail',
    component: () => import('../views/sysModules/register/registerAudit/registerAudit.vue'),
    meta: {
      title: '申请信息审核-详情',
      parent: 'platformAudit',
      root: '企业与用户管理',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true,
      pageType: 'detail'
    }
  },
]

export default registerAudit
