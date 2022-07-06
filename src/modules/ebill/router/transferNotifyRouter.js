const transferNotifyRouter = [
  {
    path: '/transferNoticeList',
    name: 'transferNoticeList',
    component: () => import('../views/accountsReceivableManage/transferNotify/query/index'),
    meta: {
      isMock: true,
      title: `应收账款转让通知查询`,
      root: '应收账款转让通知',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    }
  },
  {
    path: '/transferReceiptList',
    name: 'transferReceiptList',
    component: () => import('../views/accountsReceivableManage/transferNotify/receipt/index'),
    meta: {
      isMock: true,
      title: `应收账款转让通知回执`,
      root: '应收账款转让通知',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    }
  },
  {
    path: '/transferNotifyDetail',
    name: 'transferNotifyDetail',
    component: () => import('../views/accountsReceivableManage/transferNotify/detail/index.vue'),
    meta:{
      isMock:false,
      title:`应收账款转让通知详情`,
      keepAlive:true,
      refreshIndex:0,
      notRequireAuth: true
    }
  },
  {
    path: '/transferNotifyReceipt',
    name: 'transferNotifyReceipt',
    component: () => import('../views/accountsReceivableManage/transferNotify/detail/receipt.vue'),
    meta:{
      isMock:false,
      title:`应收账款转让通知回执`,
      keepAlive:true,
      refreshIndex:0,
      notRequireAuth: true
    }
  },
]
export default transferNotifyRouter
