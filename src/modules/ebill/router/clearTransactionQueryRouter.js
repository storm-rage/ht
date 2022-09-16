
const clearTransactionQueryRouter = [
  {
    path: '/queryExpireClear',
    name: 'queryExpireClear',
    component: () => import('../views/queryStatistics/clearTransactionQuery'),
    meta: {
      title: `清算交易查询`,
      root: '查询统计',
      keepAlive: true,
      refreshIndex: 0,
    }
  },
  {
    path: '/queryExpireClearDetail',
    name: 'queryExpireClearDetail',
    component: () => import('../views/queryStatistics/clearTransactionQuery/detail'),
    meta: {
      title: `清算交易详情`,
      keepAlive: true,
      parent:'queryExpireClear',
      refreshIndex: 0,
    }
  },
]
export default clearTransactionQueryRouter
