

const billReceiptRouter = [
  {
    path: '/billReceipt',
    name: 'billReceipt',
    component: () => import('../views/billReceipt/index.vue'),
    meta: {
      isMock: true,
      title: `凭证签收`,
      root: '电子债权凭证',
      keepAlive: true,
      refreshIndex: 0
    }
  },
  {
    path: '/signFor',
    name: 'signFor',
    component: () => import('../views/billReceipt/signFor/index.vue'),
    meta:{
      isMock:false,
      title:`确认签收`,
      keepAlive:true,
      refreshIndex:0,
      notRequireAuth: true
    }
  },
]
export default billReceiptRouter
