const myItemsRouter = [
  {
    path:'/registerAuditApplyAudit',
    name:'registerAuditApplyAudit',
    component: () => import('../views/entManage/registerAudit'),
    meta: {
      title:'申请信息审核',
      parent:'registerAudit',
      root:'企业与用户管理',
      keepAlive:true,
      refreshIndex:0,
      notRequireAuth: true
    }
  },
]
export default myItemsRouter
