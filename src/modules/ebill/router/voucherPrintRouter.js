// 凭证打印  路由
const voucherPrint = [
  {
    path: '/singleVoucherPrint',
    name: 'singleVoucherPrint',
    component: () => import('../views/voucherPrint/single.vue'),
    meta:{
      title:'单笔凭证打印',
      keepAlive: true,
      root:'凭证打印',
      refreshIndex:0,
      notRequireAuth: true,
    }
  },
  {
    path: '/moreVoucherPrint',
    name: 'moreVoucherPrint',
    component: () => import('../views/voucherPrint/collect.vue'),
    meta:{
      title:'汇总凭证打印',
      keepAlive: true,
      root:'凭证打印',
      refreshIndex:0,
      notRequireAuth: true,
    }
  }
]

export default voucherPrint
