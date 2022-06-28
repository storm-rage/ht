const accountsTransferRouter = [
  {
    path: '/accountsTransferList',
    name: 'accountsTransferList',
    component: () => import('../views/accountsTransfer/accountsTransferList'),
    meta: {
      isMock: true,
      title: `应收账款转让通知查询`,
      root: '应收账款转让通知',
      keepAlive: true,
      refreshIndex: 0
    }
  },
  {
    path: '/accountsTransferReceipt',
    name: 'accountsTransferReceipt',
    component: () => import('../views/accountsTransfer/accountsTransferReceipt'),
    meta: {
      isMock: true,
      title: `应收账款转让通知回执`,
      root: '应收账款转让通知',
      keepAlive: true,
      refreshIndex: 0
    }
  },
  {
    path: '/accountsTransferDetails',
    name: 'accountsTransferDetails',
    component: () => import('../views/accountsTransfer/details/index.vue'),
    meta:{
      isMock:false,
      title:`应收账款转让通知详情`,
      keepAlive:true,
      refreshIndex:0,
      notRequireAuth: true
    }
  },
]
export default accountsTransferRouter
