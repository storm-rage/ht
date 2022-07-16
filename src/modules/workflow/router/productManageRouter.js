const productManageRouter = [
  {
    path: '/productApplyAudit',
    name: 'productApplyAudit',
    component: () => import('../views/productManage/audit.vue'),
    meta: {
      isMock: true,
      title: '产品开通申请审核',
      root: '我的代办',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    }
  }
]
export default productManageRouter
