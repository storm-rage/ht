const billLssueMyBillRouter = [
  {
    path: '/myEbBill',
    name: 'myEbBill',
    component: () => import('../views/billLssue/myBill'),
    meta: {
      isMock: true,
      title: '我的{0}',
      root: '电子债权凭证',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    }
  },
  {
    path: '/billLssueMyBillDetail',
    name: 'billLssueMyBillDetail',
    component: () => import('../views/billLssue/myBill/detail'),
    meta: {
      title: '{0}详情',
      root: '电子债权凭证',
      keepAlive: true,
      refreshIndex: 0,
      parent:'myEbBill',
      notRequireAuth: true
    }
  },
]
export default billLssueMyBillRouter
