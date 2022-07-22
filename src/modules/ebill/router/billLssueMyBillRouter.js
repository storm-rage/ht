const billLssueMyBillRouter = [
  {
    path: '/billLssueMyBill',
    name: 'billLssueMyBill',
    component: () => import('../views/billLssue/myBill'),
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
    path: '/billLssueMyBillDetail',
    name: 'billLssueMyBillDetail',
    component: () => import('../views/billLssue/myBill/detail'),
    meta: {
      isMock: true,
      title: '电子债权凭证详情',
      root: '凭证管理',
      keepAlive: true,
      refreshIndex: 0,
      parent:'billLssueMyBill',
      notRequireAuth: true
    }
  },
]
export default billLssueMyBillRouter
