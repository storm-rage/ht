const myVouchersRouter = [
  {
    path: '/myVouchers',
    name: 'myVouchers',
    component: () => import('../views/billLssue/myVouchers'),
    meta: {
      isMock: true,
      title: '我的凭证',
      root: '凭证管理',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    }
  },
  {
    path: '/myVouchersDetail',
    name: 'myVouchersDetail',
    component: () => import('../views/billLssue/myVouchers/detail'),
    meta: {
      isMock: true,
      title: '电子债权凭证详情',
      root: '凭证管理',
      keepAlive: true,
      refreshIndex: 0,
      parent:'myVouchers',
      notRequireAuth: true
    }
  },
]
export default myVouchersRouter
