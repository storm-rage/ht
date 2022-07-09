/**
 * 企业信息管理 路由
 */

const registerAudit = [
  //主页面
  {
    path:'/registerAudit',
    name:'registerAudit',
    component: () => import('../views/sysModules/register/registerAudit/index.vue'),
    meta: {
      title:'企业注册审核',
      root:'企业与用户管理',
      keepAlive:true,
      refreshIndex:0,
      notRequireAuth: true
    }
  },
  //申请信息审核页面
  // {
  //   path:'/registerAuditApplyAudit',
  //   name:'registerAuditApplyAudit',
  //   component: () => import('../views/sysModules/register/registerAudit/registerAudit.vue'),
  //   meta: {
  //     title:'申请信息审核',
  //     parent:'registerAudit',
  //     root:'企业与用户管理',
  //     keepAlive:true,
  //     refreshIndex:0,
  //     notRequireAuth: true
  //   }
  // },
  // 注册协议审核页面
  {
    path:'/registerAuditProtocolAudit',
    name:'registerAuditProtocolAudit',
    component: () => import('../views/sysModules/register/registerAudit/registerAudit.vue'),
    meta: {
      title:'注册协议审核',
      parent:'registerAudit',
      root:'企业与用户管理',
      keepAlive:true,
      refreshIndex:0,
      notRequireAuth: true
    }
  }
]

export default registerAudit
