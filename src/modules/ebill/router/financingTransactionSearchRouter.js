//融资交易查询-企业端
const financingTransactionSearchRouter = [
  {
    path: '/financingTransactionSearch',
    name: 'financingTransactionSearch',
    component: () => import('../views/financingManage/financingTransactionSearch'),
    meta: {
      isMock: true,
      title: '融资交易查询',
      root: '融资管理',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
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
      parent:'financingTransactionSearch',
      notRequireAuth: true
    }
  },
]
export default financingTransactionSearchRouter
