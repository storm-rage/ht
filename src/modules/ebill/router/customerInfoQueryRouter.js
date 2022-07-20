
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
  {
    path: '/customerInfoQueryDetail',
    name: 'customerInfoQueryDetail',
    component: () => import('../views/queryStatistics/customerInfoQuery/detail'),
    meta:{
      isMock:false,
      title:`企业信息明细`,
      keepAlive:true,
      parent:'customerInfoQuery',
      refreshIndex:0,
      notRequireAuth: true
    }
  },
]
export default customerInfoQueryRouter
