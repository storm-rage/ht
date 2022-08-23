const registerManageRouter = [
  {
    path: '/zhongdengManage',
    name: 'zhongdengManage',
    component: () => import('../views/registerManage/index.vue'),
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
    path: '/zhongdengManageDetail',
    name: 'zhongdengManageDetail',
    component: () => import('../views/productManage/productInfoManage/detail.vue'),
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
