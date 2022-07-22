const transferNotifyRouter = [
  {
    path: '/assignmentNotice',
    name: 'assignmentNotice',
    component: () => import('../views/accountsReceivableManage/transferNotify/query/index'),
    meta: {
      title: '应收账款转让通知查询',
      root: '应收账款转让通知',
      keepAlive: true,
      refreshIndex: 0
    }
  },
  {
    path: '/assignmentNoticeReceipt',
    name: 'assignmentNoticeReceipt',
    component: () => import('../views/accountsReceivableManage/transferNotify/receipt/index'),
    meta: {
      title: '应收账款转让通知回执',
      root: '应收账款转让通知',
      keepAlive: true,
      refreshIndex: 0
    }
  },
  {
    path: '/transferNotifyQueryDetail',
    name: 'transferNotifyQueryDetail',
    component: () => import('../views/accountsReceivableManage/transferNotify/detail/index.vue'),
    meta:{
      title:'应收账款转让通知详情',
      routeType: 'query',
      parent: 'assignmentNotice',
      keepAlive:true,
      refreshIndex:0
    }
  },
  {
    path: '/transferNotifyReceiptDetail',
    name: 'transferNotifyReceiptDetail',
    component: () => import('../views/accountsReceivableManage/transferNotify/detail/index.vue'),
    meta:{
      title:'应收账款转让通知详情',
      routeType: 'receipt',
      parent: 'assignmentNoticeReceipt',
      keepAlive:true,
      refreshIndex:0
    }
  },
  {
    path: '/transferNotifyReceipt',
    name: 'transferNotifyReceipt',
    component: () => import('../views/accountsReceivableManage/transferNotify/detail/receipt.vue'),
    meta:{
      title:'应收账款转让通知回执',
      parent: 'assignmentNoticeReceipt',
      keepAlive:true,
      refreshIndex:0
    }
  },
]
export default transferNotifyRouter
