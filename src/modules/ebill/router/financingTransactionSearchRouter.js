//融资交易查询-企业端
const financingTransactionSearchRouter = [
  {
    path: '/financingTranQuery',
    name: 'financingTranQuery',
    component: () => import('../views/financingManage/financingTransactionSearch'),
    meta: {
      title: '融资交易查询',
      root: '融资管理',
      keepAlive: true,
      refreshIndex: 0,
    }
  },
  {
    path: '/financingTransactionSearchDetail',
    name: 'financingTransactionSearchDetail',
    component: () => import('../views/financingManage/financingTransactionSearch/detail'),
    meta: {
      isMock: true,
      title: '融资交易查询详情',
      root: '融资管理',
      keepAlive: true,
      refreshIndex: 0,
      parent:'financingTranQuery',
      notRequireAuth: true,
    }
  },
]
export default financingTransactionSearchRouter
