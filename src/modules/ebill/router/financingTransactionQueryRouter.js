//融资交易查询-运营端
const financingTransactionQueryRouter = [
  {
    path: '/financingTransQuery',
    name: 'financingTransQuery',
    component: () => import('../views/queryStatistics/financingTransactionQuery'),
    meta: {
      isMock: true,
      title: '融资交易查询',
      root: '查询统计',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    }
  },
  {
    path: '/financingTransactionQueryDetail',
    name: 'financingTransactionQueryDetail',
    component: () => import('../views/queryStatistics/financingTransactionQuery/detail'),
    meta: {
      isMock: true,
      title: '融资交易查询详情',
      root: '查询统计',
      keepAlive: true,
      refreshIndex: 0,
      parent:'financingTransQuery',
      notRequireAuth: true
    }
  },
]
export default financingTransactionQueryRouter
