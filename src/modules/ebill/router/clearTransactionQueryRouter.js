
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
]
export default clearTransactionQueryRouter
