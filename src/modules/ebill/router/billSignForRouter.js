const billSignForRouter = [
  {
    path: '/billSignFor',
    name: 'billSignFor',
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
      isMock: true,
      title: '电子债权凭证签收',
      root: '凭证管理',
      keepAlive: true,
      refreshIndex: 0,
      parent:'voucherSignFor',
      notRequireAuth: true
    }
  },
]
export default billSignForRouter
