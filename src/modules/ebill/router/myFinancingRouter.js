const myFinancingRouter = [
  {
    path: '/myFinancing',
    name: 'myFinancing',
    component: () => import('../views/financingManage/myFinancing'),
    meta: {
      isMock: true,
      title: '我的融资',
      root: '融资管理',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    }
  },
  {
    path: '/myFinancingDetail',
    name: 'myFinancingDetail',
    component: () => import('../views/financingManage/myFinancing/detail'),
    meta: {
      isMock: true,
      title: '融资详情',
      root: '融资管理',
      keepAlive: true,
      refreshIndex: 0,
      parent:'myFinancing',
      notRequireAuth: true
    }
  },
]
export default myFinancingRouter
