
const clearTransactionQueryRouter = [
  {
    path: '/queryExpireClear',
    name: 'queryExpireClear',
    component: () => import('../views/queryStatistics/clearTransactionQuery'),
    meta: {
      isMock: true,
      title: `清算交易查询`,
      root: '查询统计',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    }
  },
  {
    path: '/queryExpireClearDetail',
    name: 'queryExpireClearDetail',
    component: () => import('../views/queryStatistics/clearTransactionQuery/detail'),
    meta: {
      isMock: true,
      title: `凭证尾款清算交易详情`,
      root: '查询统计',
      keepAlive: true,
      parent:'queryExpireClear',
      refreshIndex: 0,
      notRequireAuth: true
    }
  },
]
export default clearTransactionQueryRouter
