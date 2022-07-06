const businessManageRouter = [
  {
    path: '/businessAudit',
    name: 'businessAudit',
    component: () => import('../views/businessManage/audit.vue'),
    meta: {
      isMock: true,
      title: '供应商业务申请审核',
      root: '我的代办',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    }
  },
  {
    path: '/businessDetail',
    name: 'businessDetail',
    component: () => import('../views/businessManage/detail.vue'),
    meta: {
      isMock: true,
      title: '供应商业务申请交易详情',
      root: '我的代办',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    }
  }
]
export default businessManageRouter
