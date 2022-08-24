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
    path: '/zhongdengManageDetaildd',
    name: 'zhongdengManageDetaildd',
    component: () => import('../views/registerManage/orderFinancing/detail.vue'),
    meta: {
      isMock: true,
      title: '订单保理合同详情',
      root: '中登登记管理',
      keepAlive: true,
      refreshIndex: 0,
      parent:'zhongdengManage',
      notRequireAuth: true
    }
  },
  {
    path: '/zhongdengManageDetailpz',
    name: 'zhongdengManageDetailpz',
    component: () => import('../views/registerManage/voucherFinancing/details.vue'),
    meta: {
      isMock: true,
      title: '凭证融资详情',
      root: '中登登记管理',
      keepAlive: true,
      refreshIndex: 0,
      parent:'zhongdengManage',
      notRequireAuth: true
    }
  },
]
export default registerManageRouter
