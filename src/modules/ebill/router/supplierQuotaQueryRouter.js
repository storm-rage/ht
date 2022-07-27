
const supplierQuotaRouter = [
  {
    path: '/queryFactoringCredit',
    name: 'queryFactoringCredit',
    component: () => import('../views/queryStatistics/supplierQuotaQuery'),
    meta: {
      isMock: true,
      title: `供应商额度查询`,
      root: '查询统计',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    }
  },
]
export default supplierQuotaRouter
