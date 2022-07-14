const registerManageRouter = [
  {
    path: '/registerManage',
    name: 'registerManage',
    component: () => import('../views/registerManage/index'),
    meta: {
      isMock: true,
      title: '中登登记管理',
      root: '中登登记管理',
      keepAlive: true,
      refreshIndex: 0,
      notRequireAuth: true
    }
  },
  {
    path: '/registerManageDetail',
    name: 'registerManageDetail',
    component: () => import('../views/productManage/productInfoManage/detail'),
    meta: {
      isMock: true,
      title: '产品详情',
      root: '中登登记管理',
      keepAlive: true,
      refreshIndex: 0,
      parent:'registerManage',
      notRequireAuth: true
    }
  },

]
export default registerManageRouter
