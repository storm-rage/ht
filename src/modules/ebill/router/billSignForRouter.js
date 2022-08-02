const billSignForRouter = [
  {
    path: '/ebBillSign',
    name: 'ebBillSign',
    component: () => import('../views/billLssue/billSignFor'),
    meta: {
      isMock: true,
      title: '凭证签收',
      root: '凭证管理',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    }
  },
  {
    path: '/billSignForDetail',
    name: 'billSignForDetail',
    component: () => import('../views/billLssue/billSignFor/billSignForDetail'),
    meta: {
      title: '电子债权凭证签收',
      root: '凭证管理',
      keepAlive: true,
      refreshIndex: 0,
      parent:'ebBillSign',
      notRequireAuth: true,
    }
  },
]
export default billSignForRouter
