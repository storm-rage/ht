
const billSearchRouter = [
  {
    path: '/queryAccountBill',
    name: 'queryAccountBill',
    component: () => import('../views/queryStatistics/billSearch/index.vue'),
    meta: {
      isMock: true,
      title: `对账单查询`,
      root: '查询统计',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    }
  },
  {
    path: '/queryAccountBillDetail',
    name: 'queryAccountBillDetail',
    component: () => import('../views/queryStatistics/billSearch/detail.vue'),
    meta:{
      isMock:false,
      title:`对账单详情`,
      keepAlive:true,
      parent:'billSearch',
      refreshIndex:0,
      notRequireAuth: true
    }
  },
]
export default billSearchRouter
