const monthlyReportRouter = [
  {
    path: '/monthlyReport',
    name: 'monthlyReport',
    component: () => import('../views/queryStatistics/monthlyReport'),
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
export default monthlyReportRouter
