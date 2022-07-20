const yearlyReportRouter = [
  {
    path: '/yearlyReport',
    name: 'yearlyReport',
    component: () => import('../views/queryStatistics/yearlyReport'),
    meta: {
      isMock: true,
      title: '月度报表',
      root: '查询统计',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    }
  },
]
export default yearlyReportRouter
