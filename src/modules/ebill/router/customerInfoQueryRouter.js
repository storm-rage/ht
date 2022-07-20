
const customerInfoQueryRouter = [
  {
    path: '/customerInfoQuery',
    name: 'customerInfoQuery',
    component: () => import('../views/queryStatistics/customerInfoQuery'),
    meta: {
      isMock: true,
      title: `客户信息查询`,
      root: '查询统计',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    }
  },
  // {
  //   path: '/queryAccountBillDetail',
  //   name: 'queryAccountBillDetail',
  //   component: () => import('../views/queryStatistics/billSearch/detail'),
  //   meta:{
  //     isMock:false,
  //     title:`企业信息明细`,
  //     keepAlive:true,
  //     parent:'billSearch',
  //     refreshIndex:0,
  //     notRequireAuth: true
  //   }
  // },
]
export default customerInfoQueryRouter
