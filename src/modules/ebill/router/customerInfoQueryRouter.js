
const customerInfoQueryRouter = [
  {
    path: '/entInfoQuery',
    name: 'entInfoQuery',
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
    path: '/entInfoQueryDetail',
    name: 'entInfoQueryDetail',
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
