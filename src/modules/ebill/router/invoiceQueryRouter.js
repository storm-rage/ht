/**
 * 发票查询
 */
const invoiceQueryRouter = [
  {
    path: '/queryInvoice',
    name: 'queryInvoice',
    component: () => import('../views/queryStatistics/invoiceQuery'),
    meta: {
      isMock: true,
      title: `发票查询`,
      root: '查询统计',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    }
  }
]
export default invoiceQueryRouter
