const voucherSignForRouter = [
  {
    path: '/voucherSignFor',
    name: 'voucherSignFor',
    component: () => import('../views/billLssue/voucherSignFor'),
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
    path: '/voucherSignForDetail',
    name: 'voucherSignForDetail',
    component: () => import('../views/billLssue/voucherSignFor/components/voucherSignForDetail'),
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
export default voucherSignForRouter
